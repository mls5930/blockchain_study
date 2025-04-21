// npm install web3
const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

// 블록체인 네트워크과 상호작용 할 수 있도록 만든 라이브러리
const web3 = new Web3("http://127.0.0.1:8545");

// abi와 bytecode를 가져와볼거임!
const abipath = path.join(__dirname, "/contracts/contracts_sol_Counter.abi");
const bytecodePath = path.join(__dirname, "/contracts/contracts_sol_Counter.bin");

const deploy = async () => {
    try {
        // 배포하기 전, 먼저, 가나쉬로 형성한 로컬 테스트 환경에서 0번째 주소를 가져와보자.
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // 컨트랙트를 가져옴 => abi파일
        const contract = new web3.eth.Contract(JSON.parse(fs.readFileSync(abipath, "utf8")));
        // bytecode => bin파일을 가져와서 가상 네트워크에 배포함
        // 배포를 위한 트랜잭션을 만든것 뿐
        const deployTx = contract.deploy({
            data: '0x' + fs.readFileSync(bytecodePath, 'utf8'),
        });

        const gas = await deployTx.estimateGas();
        // send? 이거는 보내다 아니야?
        // 블록체인 네트워크에 내 트랜잭션을 날린다.
        // 즉, 배포할 때, CA도 내뱉고, 해당 배포에 대한 트랜잭션 해시도 나온다.
        // Contract Address
        // => 배포 또한, 트랜잭션의 한 종류 => 거래일 수 있다.
        const result = await deployTx.send({
            from: account,
            gas,
            gasPrice: await web3.eth.getGasPrice()
        })

        console.log("배포완료", result.options.address);
        // 0x3D419fb825a83e2689c920D16C93FBf400bcC5Bf



    } catch (error) {
        console.log(error);
    }
}

deploy();

/*
 const contract2 = new web3.eth.Contract(JSON.parse(fs.readFileSync(abipath, "utf8")), "0xe859a845B4e38F0382b8C73a60D03bDf2A35BDa8");

        const receipt = contract2.methods.increment().send({
            from: accounts[1],
            gas: await web3.eth.estimateGas(),
            gasPrice: await web3.eth.getGasPrice()
        });

        console.log("트랜잭션 호출 성공!");
        console.log("트랜잭션 해시:", (await receipt).transactionHash);

        const value = await contract2.methods.getCount().call();
        console.log(value);

*/