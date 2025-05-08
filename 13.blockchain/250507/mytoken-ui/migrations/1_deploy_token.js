const ERC20 = artifacts.require('ERC20'); //알아서 ERC json 파일을 찾아서 가지고옴 파일명으로 npx truffle migrate

module.exports = async function (deployer) {
  await deployer.deploy(ERC20, 'MyToken', 'MTK', 1000000);
};
