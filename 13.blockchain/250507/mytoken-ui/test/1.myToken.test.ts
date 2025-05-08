import Web3 from 'web3';
import path from 'path';
import fs from 'fs';

const web3 = new Web3("http://127.0.0.1:8545");
// 아래의 비밀키는 가나슈 가상 이더리움 네트워크에서 제공하는 첫 번째 주소의 비밀키를 가져옴.
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

beforeAll(async () => {
  const { abi, bytecode } = ERC20Compiled;
  const contract = new web3.eth.Contract(abi);

  const deployTx = contract.deploy({
    data: bytecode,
    arguments: ['MyToken', 'MTK', 1000000],
  });

  const receipt = await deployTx.send({
    from: account.address,
  });

  const contractAddress = receipt.options.address;
  contractInstance = new web3.eth.Contract(abi, contractAddress);
});

describe('ERC20 컨트랙트 TDD', () => {
  it('1. 토큰 이름은 MyToken이어야 한다', async () => {
    const name = await contractInstance.methods.name().call();
    expect(name).toBe('MyToken');
  });

  it('2. 토큰 심볼은 MTK이어야 한다', async () => {
    const symbol = await contractInstance.methods.symbol().call();
    expect(symbol).toBe('MTK');
  });

  it('3. 소수점 자리수는 18이어야 한다', async () => {
    const decimals = await contractInstance.methods.decimals().call();
    expect(Number(decimals)).toBe(18);
  });

  it('4. 총 발행량은 1000000 * 10^18 이어야 한다', async () => {
    const supply = await contractInstance.methods.totalSupply().call();
    const expected = web3.utils.toWei('1000000', 'ether'); // string
    expect(supply.toString()).toBe(expected); // or toEqual(expected)
  });
});
