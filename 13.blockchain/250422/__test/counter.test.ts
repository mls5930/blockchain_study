import fs from "fs";
import path from "path";
import { Web3 } from "web3"

describe("카운터 컨트랙트 테스트", () => {
    let contractAddress: string;
    let abi;
    let bytecode: string;

    it("1단계: 컴파일이 되는가?", () => {
        // 너무 길기 때문에, path를 따로 잡아두겠음
        const abiPath = path.join(__dirname, "../contracts_Counter_sol_Counter.abi");
        const bytecodePath = path.join(__dirname, "../contracts_Counter_sol_Counter.bin");

        // JSON.parse가 필요하다.
        abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

        expect(abi).toBeDefined();
        expect(bytecode.length).toBeGreaterThan(10);
    })

    it("2단계: 가짜 이더리움 네트워크 => Ganache에 우리의 코드가 배포되었는가?", async() => {
        const web3 = new Web3("http://127.0.0.1:8545");
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        expect(account.length).toEqual(42);

        const contract = new web3.eth.Contract(abi);
        const deployTx = contract.deploy({
            data: bytecode,
            arguments: []
        })

        const result = await deployTx.send({
            from: account,
            gas: (await deployTx.estimateGas()).toString(),
            gasPrice: (await web3.eth.getGasPrice()).toString()
        })

        contractAddress = result.options.address;
    })

    it("3단계: getAccount()호출하여 카운트의 초기값이 확인되는가?", async() => {
        const web3 = new Web3("http://127.0.0.1:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        const count: string = await contract.methods.getCount().call();
        
        expect(Number(count)).toEqual(0)
    })

    it("4단계: increment() 실행하여 카운터를 올려보자 그리고 getCount()로 올라갔는지 확인해보자!", async() => {
        const web3 = new Web3("http://127.0.0.1:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const gas = (await contract.methods.increment().estimateGas({ from : account })).toString()

        await contract.methods.increment().send({
            from: account,
            gas
        });

        const count: number = Number(await contract.methods.getCount().call());
        expect(count).toEqual(1)
    })
})
