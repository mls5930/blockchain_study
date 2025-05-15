const myFactory = global.artifacts.require("Factory");

module.exports = function (deployer) {
    deployer.deploy(myFactory);
}