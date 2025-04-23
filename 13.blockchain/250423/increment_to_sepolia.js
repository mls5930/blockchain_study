// npm install
// npm install dotenv
require("dotenv").config();
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
// Web3 인스턴스 생성 => 중요함 (Sepolia 연결)
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);
// 읭? 저희 저런 변수 .env에 저장 안했는데요? 맞음

const abiPath = path.join(__dirname, "contracts_Counter_sol_Counter.abi");
const bytecodePath = path.join(__dirname, "contracts_Counter_sol_Counter.bin");
const outputPath = path.join(__dirname, "increment_link.txt");

const incrementToSepolia = async() => {
    try {
        if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)){
            throw new Error("ABI.json 또는 Bytecode.json이 없습니다. 먼저 컴파일을 진행해주세요")
        }
        // PRIVATE_KEY 길이 확인
        if (!process.env.PRIVATE_KEY.startsWith("0x") || process.env.PRIVATE_KEY.length !== 66) {
            throw new Error("PRIVATE_KEY 형식이 잘못되었습니다. 0x로 시작하고 66자여야 합니다.");
        }
        // npx solc --abi --bin contracts/Counter.sol

        const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        const bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");
        if (!bytecode.startsWith("0x")){
            throw new Error("올바른 주소값이 아닙니다.")
        }

        const contract = new web3.eth.Contract(abi, "0x086fa0e52e8edbe3136b67406d5d07f0f30adab4");
        const gas = await contract.methods.increment().estimateGas();
        const gasPrice = await web3.eth.getGasPrice()
        const nonce = await web3.eth.getTransactionCount("0xD7B89A4F52DFc7D8964590CEc49670B2225f33A0", "pending");
        const tx = {
            from: "0xD7B89A4F52DFc7D8964590CEc49670B2225f33A0",  // 서명자 주소
            to: "0x086fa0e52e8edbe3136b67406d5d07f0f30adab4",   // 컨트랙트 주소
            data: contract.methods.increment().encodeABI(),
            gas,
            gasPrice: gasPrice,  // 수동 설정해보세요
            nonce
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

        if (!signedTx.rawTransaction) {
            console.error("❗ rawTransaction이 비어있습니다. 서명 실패.");
            console.log("signedTx 전체:", signedTx);
            return;
        }

        console.log("✔ 트랜잭션 서명 완료:", signedTx.rawTransaction);

        // 🔥 여기만 실행하면 충분함
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("✔ 트랜잭션 전송 완료:", receipt);

        const links = `
            # increment Transaction
            https://sepolia.etherscan.io/tx/${receipt.transactionHash}
        `;

        fs.writeFileSync(outputPath, links, "utf8");
        console.log(`Etherscan 링크가 ${outputPath}에 저장되었습니당`);
    } catch (error) {
        console.log("increment 함수 호출 실패", error.message);
        if(error.message.includes("funds")) {
            console.log("sepolia 지갑에 충분한 ETH가 있는지 확인하세요.");
        }
    }
}

incrementToSepolia();