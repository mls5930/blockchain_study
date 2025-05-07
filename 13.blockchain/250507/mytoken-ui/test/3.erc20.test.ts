import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const web3 = new Web3("http://127.0.0.1:8545");
const { PRIVATE_KEY } = process.env;
const deployer = web3.eth.accounts.privateKeyToAccount("0x4ab5635a7575c4beb964f00af5ad09c4c4458ae3269b71372267b0f3f0a6ad21");
web3.eth.accounts.wallet.add(deployer);

const ERC20Compiled = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../build/contracts/ERC20.json'), 'utf8')
);

let contract;
let user1, user2;

beforeAll(async () => {
  const accounts = await web3.eth.getAccounts();
  /*
    1. 배포한 오너
    2. user1(주소1)
    3. user2(주소2)
  */
  user1 = accounts[1];
  user2 = accounts[2];

  const contractDeploy = new web3.eth.Contract(ERC20Compiled.abi);
  const deployed = await contractDeploy
    .deploy({
      data: ERC20Compiled.bytecode,
      arguments: ['MyToken', 'MTK', 1000000],
    })
    .send({ from: deployer.address, gas: '3000000' });

  contract = deployed;

  // transfer 100 tokens from deployer to user1
  await contract.methods
    .transfer(user1, web3.utils.toWei('100', 'ether'))
    .send({ from: deployer.address }); // Since allowances[deployer][deployer] is undefined, let's skip this and mint to user1 directly if needed
});

describe('ERC20 approve + transferFrom + allowance', () => {
  it('1. user1이 user2에게 50개 전송을 위해 권한 위임한다', async () => {
    await contract.methods
      .approve(user2, web3.utils.toWei('50', 'ether'))
      .send({ from: user1 });

    const allowance = await contract.methods.allowance(user1, user2).call();
    // user1 너가 권한 목록에 있으며, 50만큼 권한 위임했누?
    expect(allowance.toString()).toBe(web3.utils.toWei('50', 'ether'));
  });

  it('2. user2가 user1 대신 user2(자신)에게 30개 전송한다', async () => {
    await contract.methods.balances(user2).call();

    await contract.methods
      .transferFrom(user1, user2, web3.utils.toWei('30', 'ether'))
      .send({ from: user2 });

    await contract.methods.balances(user2).call();
    const allowanceLeft = await contract.methods.allowance(user1, user2).call();
    // user2가 user1너한테 50중 30개의 토큰 권한을 통해서 가져가버림!
    // 그래서, 너 현재 20개 토큰 권한 위임되어있는거 맞아?
    expect(allowanceLeft.toString()).toBe(web3.utils.toWei('20', 'ether'));
  });
});
