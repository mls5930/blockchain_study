import fs from "fs";
import path from "path";
import { Web3 } from "web3";

describe("Counter Coutract Test", () => {
    let contractAddress: string;
    let abi;
    let bytecode: string;
    let web3: Web3;
    let accounts: string[];
    let account: string;

    const abiPath = path.join(__dirname, "../contracts_Counter_sol_Counter.abi");
    const bytecodePath = path.join(__dirname, "../contracts_Counter_sol_Counter.bin");

    beforeEach(async () => {
        web3 = new Web3("http://127.0.0.1:8545");
        accounts = await web3.eth.getAccounts();
        account = accounts[0];
    })

    it("Coumpile 잘됩니까??", () => {
        abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

        expect(abi).toBeDefined();
        expect(bytecode.length).toBeGreaterThan(10);
    })

    it("Ganache에 배포 됩니까?", async () => {
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
            /*
                gasPrice: 커스텀으로 가격설정 할수도있음
                
                    단점 너무 낮게 설정: 트랜잭션이 처리되지않거나 매우느림
                        너무 높게 설정: 불필요한 비용 초래                   
            */
        })
        contractAddress = result.options.address;
    })
    it("getAcount()호출해서 초기값이 0이 맞아요??", async () => {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const count: string = await contract.methods.getCount().call();

        expect(Number(count)).toEqual(0)
    })
    it("getCount() 상태가1로 변경됐어요?", async () => {
        const contract = new web3.eth.Contract(abi, contractAddress);

        const gas = (await contract.methods.increment().estimateGas({ from: account })).toString();

        await contract.methods.increment().send({
            from: account,
            gas
        });
        const count: number = Number(await contract.methods.getCount().call());
        expect(count).toEqual(1);
    })
    it("예외발생!! 그럼에도 동작이 될까??", async () => {
        /*
            예외를 발생시킬수 있는 요인 너무 많음
            
            ex)
            작은 가스비,
            함수에 주소넣지않음 or 다른주소
            abi주소 잘못됨
            함수명 오타 등등등...
        */
        const contract = new web3.eth.Contract(abi, contractAddress);

        const fakeAcount = "0xfejunf8albg983sbaskgkjgj"

        const gas = (await contract.methods.increment().estimateGas({ from: account })).toString();

        try {
             expect(
                await contract.methods.increment().send({
                    from: fakeAcount,
                    // from: account,
                    gas
                })
            )
        } catch (error) {
            throw new error("값이 맞지 않습니다");
        }
    })
    it("접근 제어 나말고 다른사람도 실행가능??", async () => {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const notOwner = account[1] // 나말고 다른 사용자

        await contract.methods.increment().send({ from: notOwner })
    })
})

// 추가 TDD 해보고 싶은거
// 프록시 패턴을 추가 했을 때 작동이되는지 않는지 해보고 싶음