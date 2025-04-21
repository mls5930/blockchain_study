// npm install web3
const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

// 블록체인 네트워크과 상호작용 할 수 있도록 만든 라이브러리
const web3 = new Web3("http://127.0.0.1:8545");

// abi와 bytecode를 가져와볼거임!
const abipath = path.join(__dirname, "/contracts/contracts_sol_Counter.abi");
const bytecodePath = path.join(__dirname, "/contracts/contracts_sol_Counter.bin");

const deploy = async() => {
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
        arguments: [],
    });

    const gas = await deployTx.estimateGas();
    // send? 이거는 보내다 아니야?
    // 블록체인 네트워크에 내 트랜잭션을 날린다.
    // 즉, 배포할 때, CA도 내뱉고, 해당 배포에 대한 트랜잭션 해시도 나온다.
    // Contract Address
    // => 배포 또한, 트랜잭션의 한 종류 => 거래일 수 있다.
    const result = await deployTx.send({
        from: account,
        gas: gas, // 얘는 나중에 설명!
        gasPrice: await web3.eth.getGasPrice() // 얘도 나중에 설명
    })

    console.log("배포완료", result.options.address);
    // 0x42904c26eFCF81B6327baBc689fe1d6EFA38CeC4

    } catch (error) {
        console.log(error);
    }
}

deploy();