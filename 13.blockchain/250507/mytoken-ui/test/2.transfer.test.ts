// 경로: 250507/mytoken-ui/test/transfer.test.ts

import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const web3 = new Web3("http://127.0.0.1:8545");
<<<<<<< HEAD
const account = web3.eth.accounts.privateKeyToAccount("0xed0806321c63f78441f1b0c3bb3a39c32f220d00f025554280ef4d564ff31def");
=======
const account = web3.eth.accounts.privateKeyToAccount("0x4ab5635a7575c4beb964f00af5ad09c4c4458ae3269b71372267b0f3f0a6ad21");
>>>>>>> b0b2e3b66a2a9f74fe8d81be1e9ea661f67a8310
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const ERC20Compiled = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../build/contracts/ERC20.json'), 'utf8')
);

let contractInstance;
let user2;

beforeAll(async () => {
  const { abi, bytecode } = ERC20Compiled;
  const Contract = new web3.eth.Contract(abi);

  const deployTx = Contract.deploy({
    data: bytecode,
    arguments: ['MyToken', 'MTK', 1000000],
  });

  const receipt = await deployTx.send({
    from: account.address,
  });

  const contractAddress = receipt.options.address;
  contractInstance = new web3.eth.Contract(abi, contractAddress);
  user2 = web3.eth.accounts.create(); // 수신자 계정 생성
});

describe('user1과 user2의 주소를 만들어서 ERC20 transfer 기능을 테스트한다.', () => {
  it('1. transfer를 실행하면 잔액이 정확히 이동해야 한다', async () => {
    const amount = web3.utils.toWei('100', 'ether');

    // 전송 전 잔액
<<<<<<< HEAD
    const beforeSender = await contractInstance.methods.balances(account.address).call();
    console.log(beforeSender);

=======
    // const beforeSender = await contractInstance.methods.balanceOf(account.address).call();
    const beforeSender = await contractInstance.methods.balances(account.address).call();
    
>>>>>>> b0b2e3b66a2a9f74fe8d81be1e9ea661f67a8310
    const beforeReceiver = await contractInstance.methods
      .balances(user2.address)
      .call();

    const receipt = await contractInstance.methods.transfer(user2.address, amount).send({
      from: account.address,
    });

    const afterSender = await contractInstance.methods.balances(account.address).call();
    const afterReceiver = await contractInstance.methods.balances(user2.address).call();

    expect(BigInt(beforeSender) - BigInt(amount)).toBe(BigInt(afterSender));
    expect(BigInt(beforeReceiver) + BigInt(amount)).toBe(BigInt(afterReceiver));
  });

  it('2. 0x0 주소로 전송하면 실패해야 한다', async () => {
    const amount = web3.utils.toWei('10', 'ether');

    await expect(
      contractInstance.methods
        .transfer('0x0000000000000000000000000000000000000000', amount)
        .send({
          from: account.address,
        })
    ).rejects.toThrow(/Invalid recipient/);// 위의 내용을 실패했을경우 Invalid recipient 반환.

  });

  it('3. 잔액보다 큰 금액 전송 시 실패해야 한다', async () => {
    const tooMuch = web3.utils.toWei('99999999', 'ether');

    await expect(
      contractInstance.methods.transfer(user2.address, tooMuch).send({
        from: account.address,
      })
    ).rejects.toThrow(/Not enough balance/);
  });
});