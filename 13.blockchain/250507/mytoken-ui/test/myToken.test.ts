import Web3 from 'web3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const web3 = new Web3(process.env.RPC_URL);
const { PRIVATE_KEY } = process.env;
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
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
