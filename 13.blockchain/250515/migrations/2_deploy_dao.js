const myfactory = global.artifacts.require("Factory");

module.exports = function (deployer) {
    deployer.deploy(myfactory)
}