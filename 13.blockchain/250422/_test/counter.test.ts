import fs from "fs"
import path from "path"
import { Web3 } from "web3"
import { resourceLimits } from "worker_threads"

/*
    순서
    0. 사전 작업 => 필요한 종속성 설치 npm install
    1. 컴파일 => abi, bytecode가 잘 생성되었는가?
    2. 배포 => CA(Couteact Address)가 잘 생성되었는가?
    3. getCount() -> 초기값이 0이 맞는가?
    4. increment() -> 증가 후 값이 1이 되었는가?

*/

// npx solc --abi --bin contracts/Counter.sol 

// JSON.parse가 필요하다.

// JSON.parse(fs.readFileSync(path.join(__dirname, "../coutracts_Counter_sol_Counter.abi"), "utf-8"))

// 너무 길기 때문에 , path를 따로 잡아두겠음





describe("카운터 컨트랙트 테스트", () => {
    let contractAddress: string;
    let abi;
    let bytecode: string;
    it("1단계 : 컴파일이 되는가?", () => {
        const abiPath = path.join(__dirname, "../contracts_Counter_sol_Counter.abi")
        const bytecodePath = path.join(__dirname, "../contracts_Counter_sol_Counter.bin")

        // JSON.parse가 필요하다

        abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))
        bytecode = "0x" + (fs.readFileSync(bytecodePath, "utf-8"))
        // console.log(JSON.stringify(abi, null, 2));
        // console.log(JSON.stringify(bytcode, null, 2));

        // 1. abi가 정상적으로 로딩이 되었는가?
        expect(abi).toBeDefined();
        // 2. bytecode가 10자리보다 큰가?
        expect(bytecode.length).toBeGreaterThan(10)
    })

    it("2단계: rkWk dlejfldna spxmdnjzm => Ganache에 우리의 코드가 배포되었는가?", async () => {
        /*
            필요한거

            1. 주소
            2. abi파일 필요
            3. bytecode 필요
        */

        // const abiPath = path.join(__dirname, "../contracts_Counter_sol_Counter.abi")
        // const bytecodePath = path.join(__dirname, "../contracts_Counter_sol_Counter.bin")
        // abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))
        // bytecode = "0x" + (fs.readFileSync(bytecodePath, "utf-8"))

        // ganache => 환경 세팅부터 해보자 => npx ganache
        // web3 => RPC

        const web3 = new Web3("http://127.0.0.1:8545")
        const accounts = await web3.eth.getAccounts(); //주소를 가져옴
        const account = accounts[0];
        // 계정을 잘가져왔는가?
        expect(account.length).toEqual(42)

        const contract = new web3.eth.Contract(abi);
        // 배포를 하려면 abi, bytecode가 필요하다.
        const deployTx = contract.deploy({
            data: bytecode,
            arguments: []

        })
        const result = await deployTx.send({
            from: account,
            gas: (await deployTx.estimateGas()).toString(), //실행에 필요한 가스 값을 먼저 측정해서 보냄
            gasPrice: (await web3.eth.getGasPrice()).toString() // 가스 한 단위당 얼마를 낼 거냐
        })

        // result.aptions.address => CA 주소
        expect(result.options.address.length).toEqual(42)

        contractAddress = result.options.address;
    })

    it("3단계: getAccount()호출하여 카운트의 초기값이 확인되는가?", async () => {
        const web3 = new Web3("http://127.0.0.1:8545")
        /*
            최초 컨트랙트를 호출하기 위한 조건

            1. abi
            2. CA 주소
        */

        const contract = new web3.eth.Contract(abi, contractAddress)
        const count: string = await contract.methods.getCount().call();
        console.log(count);
        expect(Number(count)).toEqual(0)
    })


    it("4단계: 카운터를 올려보자 그리고 getCount로 올라갔는지 확인해보자!", async () => {
        const web3 = new Web3("http://127.0.0.1:8545")
        const contract = new web3.eth.Contract(abi, contractAddress)
        const accounts = await web3.eth.getAccounts(); //주소를 가져옴
        const account = accounts[0];

        const gas = (await contract.methods.increment().estimateGas({ from: account })).toString() //이걸 실핼할건데 가스값이 얼마나 나와? 트렌젝션 이 아니라서 send가 아님 
        /*
            increment()함수를 실행할거임 => 누가 실행시킬건데?
            일단 주소가 필요하겠죠? => 트랜잭션을 날리는 오너 => 주소 
        */


        await contract.methods.increment().send({
            from: account,
            gas
        })

        // 위의 트랜잭션 날림으로서 카운트가 올라갔나?
        const count: number = Number(await contract.methods.getCount().call())
        expect(count).toEqual(1)
    })
})
