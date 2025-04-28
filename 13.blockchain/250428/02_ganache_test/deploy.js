const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:8545")

const abiPath = path.join(__dirname, '../01_contracts_Counter_sol_Counter.abi');
// console.log("경로확인", abiPath);

const bytecodePath = path.join(__dirname, "../01_contracts_Counter_sol_Counter.bin");

const deploy = async () => {
    try {

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; // env.로 관리
        // console.log("난 주소", account);
        const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();


        if (!bytecode.startsWith('0x')) {
            bytecode = '0x' + bytecode;
        }
        // console.log(bytecode);

        const contract = new web3.eth.Contract(abi)
        const deployTx = contract.deploy({ data: bytecode, arguments: [account] });

        const result = await deployTx.send({
            from: account,
            gas: (await deployTx.estimateGas()).toString(),
            gasPrice: (await web3.eth.getGasPrice()).toString()
        })

        console.log("배포 완료", result.options.address);


    } catch (error) {
        console.log(error);

    }
}
deploy()