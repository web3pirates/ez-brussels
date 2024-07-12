import styles from '../styles/styles.module.css';
import { wagmiConfig } from '@/providers';
import { useSharedState } from '@/utils/store';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getEnsName } from 'viem/actions';
import { mainnet } from 'viem/chains';
import { http, useAccount, useEnsAddress, useEnsName } from 'wagmi';

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
  'inline-block text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-40 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap';

export const infoButtonStyle =
  'inline-block whitespace-nowrap text-gray-900 bg-gradient-to-r from-red-400 via-red-300 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-lg text-sm min-w-32 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out';

export function Nav() {
  const { address } = useAccount();
  const ensName = useEnsName({ address, blockTag: 'latest', chainId: 1 });
  const router = useRouter();

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

      <div style={{ display: 'flex', gap: '10px' }}>
        {/* <button
          type="button"
          className={infoButtonStyle}
          onClick={() => {
            router.push('/leaderboard');
          }}
        >
          Leaderboard
        </button> */}
        <div className="ml-6"></div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className={connectButtonStyle}
                      >
                        Connect Wallet
                      </button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button" className={connectButtonStyle}>
                        Wrong network
                      </button>
                    );
                  }
                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={openChainModal} type="button" className={connectButtonStyle}>
                        <div className="flex w-fit mx-auto">
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </div>
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className={connectButtonStyle}
                      >
                        {ensName.data ?? account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </Wrapper>
  );
}
