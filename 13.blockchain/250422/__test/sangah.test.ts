import fs from "fs";
import path from "path";
import Web3 from "web3";

describe("Counter Contract TEST", () => {
  let abi;
  let bytecode: string;
  let web3;
  let accounts: string[];
  let account: string;
  let contract;
  let contractAddress: string;
  let result;
  let gas: number;

  beforeEach(async () => {
    // 경로
    const abiPath = path.join(
      __dirname,
      "../contracts_Counter_sol_Counter.abi"
    );
    const bytecodePath = path.join(
      __dirname,
      "../contracts_Counter_sol_Counter.bin"
    );

    // ABI, bytecode 읽어옴
    abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

    // web3 연결, 계정 불러옴
    web3 = new Web3("http://127.0.0.1:8545");
    accounts = await web3.eth.getAccounts();
    account = accounts[0];

    // 컨트랙트 인스턴스 생성
    contract = new web3.eth.Contract(abi);

    // 배포
    const deployTx = contract.deploy({ data: bytecode, arguments: [] });
    result = await deployTx.send({
      from: account,
      gas: (await deployTx.estimateGas()).toString(),
      gasPrice: (await web3.eth.getGasPrice()).toString(),
    });

    // gas 계산
    gas = (
      await result.methods.increment().estimateGas({ from: account })
    ).toString();
  });

  describe("compile", () => {
    it("ABI, bytecode 생성 확인", () => {
      // ABI
      expect(abi).toBeDefined();
      // Bytecode
      expect(bytecode.length).toBeGreaterThan(10);
    });

    it("EOA 확인", () => {
      //   EOA 길이 42
      expect(account.length).toBe(42);
    });
  });

  describe("deploy", () => {
    it("CA 생성 확인", async () => {
      contractAddress = result.options.address;

      // CA 길이 42
      expect(contractAddress.length).toBe(42);
    });

    it("CA로 EVM 내 bytecode 추적", async () => {
      const code = await web3.eth.getCode(contractAddress); // CA로 bytecode 확인

      // 0x => 주소가 없다는 뜻
      expect(code).not.toBe("0x");
      // code 길이 확인
      expect(code.length).toBeGreaterThan(10);
    });
  });

  describe("Counter Logic", () => {
    it("getCount()", async () => {
      const contract = new web3.eth.Contract(abi, contractAddress);
      const count: string = await contract.methods.getCount().call();

      // 초기값 0 확인
      expect(Number(count)).toEqual(0);
    });

    it("increment()", async () => {
      //   increment() +1
      await result.methods.increment().send({ from: account, gas });

      // 값 1
      const count: number = Number(await result.methods.getCount().call());
      expect(count).toEqual(1);
    });

    it("increment() 여러 번 시행 시", async () => {
      //   increment() +5
      await result.methods.increment().send({ from: account, gas });
      await result.methods.increment().send({ from: account, gas });
      await result.methods.increment().send({ from: account, gas });
      await result.methods.increment().send({ from: account, gas });
      await result.methods.increment().send({ from: account, gas });

      // 값 5
      const count: number = Number(await result.methods.getCount().call());
      expect(count).toEqual(5);
    });

    it("increment() 후 블록 생성 확인", async () => {
      const tx = await result.methods.increment().send({ from: account, gas });

      // 블록 번호(height) 있음 => 블록 생성됨
      expect(tx.blockNumber).toBeDefined();
    });
  });

  describe("gas", () => {
    it("gas 사용량 확인", async () => {
      //   gas는 0보다 큼
      expect(Number(gas)).toBeGreaterThan(0);
    });

    it("gas 부족 시 실패", async () => {
      try {
        await result.methods.increment().send({ from: account, gas: 1 });
        const count: number = Number(await result.methods.getCount().call());
      } catch (error) {
        // error message 확인
        expect(error.message).toMatch("intrinsic gas too low");
      }
    });
  });

  describe("다른 account로 배포 및 함수 호출", () => {
    it("다른 주소로 배포", async () => {
      // 새로운 주소
      const newAccount = accounts[1];
      contract = new web3.eth.Contract(abi);

      // 배포
      const deployTx = contract.deploy({ data: bytecode, arguments: [] });
      result = await deployTx.send({
        from: account,
        gas: (await deployTx.estimateGas()).toString(),
        gasPrice: (await web3.eth.getGasPrice()).toString(),
      });

      //   EOA 길이 42
      expect(newAccount.length).toBe(42);
    });

    it("다른 주소로 increment()", async () => {
      // 새로운 주소
      const newAccount = accounts[1];
      contract = new web3.eth.Contract(abi);

      // 배포
      const deployTx = contract.deploy({ data: bytecode, arguments: [] });
      result = await deployTx.send({
        from: account,
        gas: (await deployTx.estimateGas()).toString(),
        gasPrice: (await web3.eth.getGasPrice()).toString(),
      });
      //   increment() +1
      await result.methods.increment().send({ from: newAccount, gas });

      // 값 1
      const count: number = Number(await result.methods.getCount().call());
      expect(count).toEqual(1);
    });
  });
});
