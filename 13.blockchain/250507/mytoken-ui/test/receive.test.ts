import Web3 from "web3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const web3 = new Web3("http://127.0.0.1:8545");
const account = web3.eth.accounts.privateKeyToAccount("0x9de624ef1d373edaf24b6163e1b1c55bffa7e391e12f3e91d82ce859a3536576");
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const ERC20Compiled = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../build/contracts/ERC20.json"), "utf8")
);

let contractAddress;
let contractInstance;
let user;

beforeAll(async () => {
  const { abi, bytecode } = ERC20Compiled;
  const contract = new web3.eth.Contract(abi);

  const deployed = contract.deploy({
      data: bytecode,
      arguments: ["MyToken", "MTK", 1000000],
    })
    
    const receipt = await deployed.send({
        from: account.address,
        gas: "3000000",  
        gasPrice: (await web3.eth.getGasPrice()).toString()
    });

  contractAddress = receipt.options.address
  contractInstance = new web3.eth.Contract(abi, contractAddress);
  user = web3.eth.accounts.create(); // 일반 사용자
});

describe("receive() 함수 테스트", () => {
  it("1. owner가 이더를 보내면 mint()가 실행되어 토큰이 추가되어야 한다", async () => {
    
    const value = web3.utils.toWei("0.01", "ether");
    const expected = BigInt(value) * BigInt(20);

    const before = await contractInstance.methods
      .balanceOf(account.address)
      .call();
    
    await web3.eth.sendTransaction({
        from: account.address,
        to: contractAddress,
        value,
        gas: "3000000",
        gasPrice: (await web3.eth.getGasPrice()).toString()
    });
      
    const after = await contractInstance.methods
      .balanceOf(account.address)
      .call();

    expect(BigInt(after) - BigInt(before)).toBe(expected);
  });

  it('2. 일반 사용자가 이더를 보내면 owner의 토큰에서 차감되어 지급되어야 한다', async () => {
    const value = web3.utils.toWei("0.01", "ether");
    const expected = BigInt(value) * BigInt(20);

    const beforeUser = await contractInstance.methods.balanceOf("0xE462DE822bAbC8BC1609212377b581CF383971C1").call();
    const beforeOwner = await contractInstance.methods.balanceOf(account.address).call();

    await web3.eth.sendTransaction({
      from: "0xE462DE822bAbC8BC1609212377b581CF383971C1",
      to: contractAddress,
      value,
      gas: "3000000",
      gasPrice: (await web3.eth.getGasPrice()).toString()
    });

    const afterUser = await contractInstance.methods.balanceOf("0xE462DE822bAbC8BC1609212377b581CF383971C1").call();
    const afterOwner = await contractInstance.methods.balanceOf(account.address).call();

    expect(BigInt(afterUser) - BigInt(beforeUser)).toBe(expected);
    expect(BigInt(beforeOwner) - BigInt(afterOwner)).toBe(expected);
  });

  it('3. owner 잔고가 부족하면 일반 사용자의 이더 전송은 실패해야 한다', async () => {
    // owner의 모든 토큰을 다른 사람에게 전송 (고갈시키기)
    const ownerBalance = await contractInstance.methods.balanceOf(account.address).call();
    await contractInstance.methods
      .transfer("0xE462DE822bAbC8BC1609212377b581CF383971C1", ownerBalance)
      .send({ from: account.address });

    const value = web3.utils.toWei('1', 'ether'); // 20 토큰 요청될 예정

    await expect(
      web3.eth.sendTransaction({
        from: "0xE462DE822bAbC8BC1609212377b581CF383971C1",
        to: contractInstance.options.address,
        value,
        gas: 100000,
      })
    ).rejects.toThrow(); // require에서 revert 예상
  });

});