import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const aaveAddresses: Record<string, `0x${string}`> = {
    arbitrum: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    base: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
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

    const tx1 = await deploy('MyOApp', {
        from: deployer,
        args: [
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner
            aaveAddresses[network.name],
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: MyOapp, network: ${hre.network.name}, address: ${tx1.address}`)

    const tx2 = await deploy('BridgeReceiver', {
        from: deployer,
        args: [aaveAddresses[network.name]],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: BridgeReceiver, network: ${hre.network.name}, address: ${tx2.address}`)
}

deploy.tags = ['Oapp', 'BridgeReceiver']

export default deploy
