const MetaTransaction = artifacts.require("MetaTransaction");
const MyToken = artifacts.require("MyToken");

module.exports = async function (deployer) {
    await deployer.deploy(MyToken);
    const tokenInstance = await MyToken.deployed();

    // tracactionHash, . address
    await deployer.deploy(MetaTransaction, tokenInstance.address);
}