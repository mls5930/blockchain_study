require('dotenv').config();
const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");



// 4) 번 항목 
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

async function getLatestBlock() {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("최신 블록 번호:", blockNumber);
}

getLatestBlock();


const abiPath = path.join(__dirname, '../01_contracts_Counter_sol_Counter.abi');
const bytecodePath = path.join(__dirname, "../01_contracts_Counter_sol_Counter.bin");

const deploy = async () => {
    try {

        const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();


        if (!bytecode.startsWith('0x')) {
            bytecode = '0x' + bytecode;
        }

        const account = web3.eth.accounts.privateKeyToAccount(
            process.env.PRIVATE_KEY
        )

        console.log("난 주소:", account);

        const contract = new web3.eth.Contract(abi)
        const deployTx = contract.deploy({ data: bytecode, arguments: [account.address] });
        // console.log("서명전 TX", deployTx);

        const gas = await deployTx.estimateGas()
        // console.log("가스 확인", gas);

        const gasPrice = await web3.eth.getGasPrice()
        // console.log(gasPrice);
        const nonce = await web3.eth.getTransactionCount(account.address);

        const sepoliaETH = await web3.eth.getBalance(account.address)
        console.log("세폴리아 확인 ", sepoliaETH);

        const result = {
            from: account.address,
            data: deployTx.encodeABI(), // 세폴리아 네트워크에는 서명을하고 보내야하므로 보내야할 속성을 정의
            gas,
            gasPrice,
            nonce
        }



        //서명 

        const Txsign = await web3.eth.accounts.signTransaction(
            result,
            process.env.PRIVATE_KEY
        )
        // console.log("서명한 TX", Txsign);

        const receipt = await web3.eth.sendSignedTransaction(
            Txsign.rawTransaction
        );
        console.log("배포 완료", receipt);

        // 문제 5 hash 확보 

        const outputPath = path.join(__dirname, 'etherscan_links.txt');
        const links = `# Contract Address
              https://sepolia.etherscan.io/address/${receipt.contractAddress}
        
              # Deployment Transaction
              https://sepolia.etherscan.io/tx/${receipt.transactionHash}
            `;

        fs.writeFileSync(outputPath, links, 'utf8');
        console.log(`🔗 Etherscan 링크가 ${outputPath}에 저장되었습니다.`);


    } catch (error) {
        console.log(error);

    }

}
deploy()
