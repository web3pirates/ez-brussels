import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: white;
  top: 0;
  padding: 1rem;
  z-index: 400;
  margin-right: 0px;
  margin-left: 0px;
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border-bottom: 1px solid #dee2e6; */
  width: 100%;
`;

export const connectButtonStyle =
  'inline-block w-28 md:min-w-40 text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap';

export const infoButtonStyle =
  'inline-block whitespace-nowrap text-gray-900 bg-gradient-to-r from-red-400 via-red-300 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-lg text-sm min-w-32 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out';

export const dropdownButtonStyle =
  'block w-full text-gray-900 bg-gradient-to-r from-white via-gray-100 to-gray-200 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 rounded-lg text-sm py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out';

export const dropdownContainerStyle =
  'absolute top-16 right-28 md:right-36 mt-2 w-44 md:min-w-64 rounded-lg shadow-lg border border-gray-300 flex flex-col gap-0.5';

export function Nav() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const addressButtonRef = useRef<HTMLButtonElement>(null);

  const connectWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK',
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  const disconnectWallet = useCallback(() => {
    if (isConnected) disconnect();
  }, [disconnect]);

  const truncatedAddress = `${address?.slice(0, 5)}...${address?.slice(-5)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '');
  };

  const handleViewOnExplorer = () => {
    window.open(`https://zapper.xyz/account/${address}`, '_blank');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      addressButtonRef.current &&
      !addressButtonRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <Menu>
        <button
          type="button"
          onClick={() => {
            router.push('/');
          }}
          className="flex items-center gap-2 bg:white"
        >
          <div className="relative ml-4 gap-2 flex">
            <Image
              src="/images/brussels.jpg"
              alt="EEZY"
              width={50}
              height={50}
              className="rounded-full"
            ></Image>
            <h1 className="mx-auto w-fit bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-red-600">
              EEZY
            </h1>
          </div>
        </button>
      </Menu>

      <div className="flex items-center gap-3 ml-auto">
        {isConnected && (
          <>
            <button
              className={`${connectButtonStyle} relative`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={addressButtonRef}
            >
              {ensName ?? truncatedAddress}
            </button>
            {dropdownOpen && (
              <div className={dropdownContainerStyle} ref={dropdownRef}>
                <button onClick={handleCopyAddress} className={dropdownButtonStyle}>
                  Copy Address
                </button>
                <button onClick={handleViewOnExplorer} className={dropdownButtonStyle}>
                  View on Explorer
                </button>
              </div>
            )}
          </>
        )}
        {isConnected ? (
          <button onClick={disconnectWallet} className={connectButtonStyle}>
            Disconnect
          </button>
        ) : (
          <button onClick={connectWallet} className={connectButtonStyle}>
            Connect
          </button>
        )}
      </div>
    </Wrapper>
  );
}
