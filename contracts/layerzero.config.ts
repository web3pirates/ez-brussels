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

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: arbSepoliaContract,
        },
        {
            contract: sepoliaContract,
        },
    ],
    connections: [
        {
            from: arbSepoliaContract,
            to: sepoliaContract,
            config: {
                sendLibrary: '0x4f7cd4DA19ABB31b0eC98b9066B9e857B1bf9C0E',
                receiveLibraryConfig: {
                    receiveLibrary: '0x75Db67CDab2824970131D5aa9CECfC9F69c69636',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: '0x5Df3a1cEbBD9c8BA7F8dF51Fd632A9aef8308897',
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        confirmations: BigInt(1),
                        requiredDVNs: ['0x53f488E93b4f1b60E8E83aa374dBe1780A1EE8a8'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: ['0x53f488E93b4f1b60E8E83aa374dBe1780A1EE8a8'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: sepoliaContract,
            to: arbSepoliaContract,
            config: {
                sendLibrary: '0xcc1ae8Cf5D3904Cef3360A9532B477529b177cCE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xdAf00F5eE2158dD58E0d3857851c432E34A3A851',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: '0x718B92b5CB0a5552039B593faF724D182A881eDA',
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: ['0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(1),
                        requiredDVNs: ['0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

export default config
