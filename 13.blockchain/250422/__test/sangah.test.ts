import fs from "fs";
import path from "path";
import Web3 from "web3";

describe("", () => {
  let abi;
  let bytecode: string;
  let web3;
  let accounts: string[];
  let account: string;
  let contract;
  let contractAddress: string;

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

    abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

    web3 = new Web3("http://127.0.0.1:8545");
    accounts = await web3.eth.getAccounts();
    account = accounts[0];

    contract = new web3.eth.Contract(abi);
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
      const deployTx = contract.deploy({ data: bytecode, arguments: [] });
      const result = await deployTx.send({
        from: account,
        gas: (await deployTx.estimateGas()).toString(),
        gasPrice: (await web3.eth.getGasPrice()).toString(),
      });
      contractAddress = result.options.address;

      // CA 길이 42
      expect(contractAddress.length).toBe(42);
    });
  });

  describe("상태 변경 확인", () => {
    it("getCount()", () => {
      console.log(contractAddress);
      //       0x5D38AAE3AC455d2D4420d83C98758531bbdBfd97
      const contract = new web3.eth.Contract()

      // 초기값 0 확인
    });

    it("increment()", () => {
      // 값 1
    });

    it("increment() 여러 번 시행 시", () => {
      // 값
    });
    it("gas 사용량 확인", () => {});
  });
});
