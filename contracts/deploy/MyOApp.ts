import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

// TODO declare your contract name here
const contractName = 'MyOApp'

const addresses: Record<string, { stargate: string; aave: string }> = {
    sepolia: {
        stargate: '0xa4e97dFd56E0E30A2542d666Ef04ACC102310083',
        aave: '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951',
    },
    arbitrum_sepolia: {
        stargate: '0x0d7aB83370b492f2AB096c80111381674456e8d8',
        aave: '0xBfC91D59fdAA134A4ED45f7B584cAf96D7792Eff',
    },
}

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${network.name}`)
    console.log(`Deployer: ${deployer}`)

    // This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
    //
    // @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
    // from @layerzerolabs packages based on the configuration in your hardhat config
    //
    // For this to work correctly, your network config must define an eid property
    // set to `EndpointId` as defined in @layerzerolabs/lz-definitions
    //
    // For example:
    //
    // networks: {
    //   fuji: {
    //     ...
    //     eid: EndpointId.AVALANCHE_V2_TESTNET
    //   }
    // }
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner
            addresses[network.name].stargate,
            addresses[network.name].aave,
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
