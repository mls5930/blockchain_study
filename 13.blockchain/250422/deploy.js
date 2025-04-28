// 경로: 250421/deploy.js
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
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        const contract = new web3.eth.Contract(JSON.parse(fs.readFileSync(abipath, "utf8")));
        const deployTx = contract.deploy({
            data: '0x' + fs.readFileSync(bytecodePath, 'utf8'),
            arguments: [],
        });

        const gas = await deployTx.estimateGas();
        const result = await deployTx.send({
            from: account,
            gas: gas,
            gasPrice: await web3.eth.getGasPrice()
        })

        console.log("배포완료", result.options.address);

    } catch (error) {
        console.log(error);
    }
}

deploy();