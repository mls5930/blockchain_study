require('dotenv').config();
const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');


const web3 = new Web3("https://aeneid.storyrpc.io") //RPC
const abiPath = path.join(__dirname, 'contracts_Counter_sol_Counter.abi');
const bytecodePath = path.join(__dirname, 'contracts_Counter_sol_Counter.bin');

async function deploystory() {
    try {
        const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();

        if (!bytecode.startsWith('0x')) {
            bytecode = '0x' + bytecode;
        }
        const account = web3.eth.accounts.privateKeyToAccount(
            process.env.PRIVATE_KEY
        )
        const contract = new web3.eth.Contract(abi)

        const daployTx = contract.deploy(
            {
                data: bytecode,
                arguments: [
                    account.address,
                ]
            }
        )
        const gas = await daployTx.estimateGas();
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: account.address,
            data: daployTx.encodeABI(),
            gas,
            gasPrice
        };

        const signedTx = await web3.eth.accounts.signTransaction(
            tx,
            process.env.PRIVATE_KEY

        )
        // console.log(signedTx);

        const distribute = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        )
        console.log("배포완료", distribute);
        // const outputPath = path.join(__dirname, 'etherscan_links.txt');

        // const links = `# Contract Address
        // https://sepolia.etherscan.io/address/${distribute.contractAddress}

        // # Deployment Transaction
        // https://sepolia.etherscan.io/tx/${distribute.transactionHash}
        // `;
        // fs.writeFileSync(outputPath, links, 'utf8');

        // 0xd2f23f8d8f588470c59a12cc4a86530bc6d2ec61

    } catch (error) {
        console.log("배포 오류 발생", error);

    }

}
deploystory()