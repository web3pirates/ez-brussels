import ApolloClient from '@/utils/ApolloClient';
import { gql } from '@apollo/client';
import { zeroAddress } from 'viem';

export function useGraph() {
  async function fetchLeaderboard(): Promise<{ id: string; gained: number }[]> {
    let res;
    try {
      res = await ApolloClient.query<{
        users: Array<{ id: string; gained: string }>;
      }>({
        query: gql`
          query {
            users(first: 100, orderBy: "gained", orderDirection: "desc", where: {id_not: "${zeroAddress}"}) {
              id
              gained
            }
          }
        `,
      });
    } catch (e) {
      console.error(e);
    }

    return (
      res?.data.users.map((u) => ({
        ...u,
        gained: Number(
          u.gained.slice(0, u.gained.length - 18) +
            '.' +
            u.gained.slice(u.gained.length - 18, u.gained.length - 16),
        ),
      })) || []
    );
  }

  async function fetchParty(
    tokenId: string,
  ): Promise<{ id: string; tokenURI: string } | undefined> {
    let res;
    try {
      res = await ApolloClient.query<{
        nft: { id: string; tokenURI: string };
      }>({
        query: gql`query {
            nft(id: "${tokenId}") {
              id
              tokenURI
            }
        }`,
      });
    } catch (e) {
      console.error(e);
    }

    return res?.data.nft;
  }

  return {
    fetchLeaderboard,
    fetchParty,
  };
}
