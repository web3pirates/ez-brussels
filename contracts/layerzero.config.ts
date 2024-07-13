import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOApp',
}
const arbSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'MyOApp',
}
const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'MyOApp',
}
const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'MyOApp',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: baseContract,
        },
        {
            contract: arbitrumContract,
        },
    ],
    connections: [
        {
            from: arbitrumContract,
            to: baseContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D',
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: baseContract,
            to: arbitrumContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4',
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

export default config
