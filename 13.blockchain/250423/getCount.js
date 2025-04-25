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
const outputPath = path.join(__dirname, "etherscan_links.txt");

const getCount = async () => {
    try {
        if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
            throw new Error("ABI.json 또는 Bytecode.json이 없습니다. 먼저 컴파일을 진행해주세요")
        }
        // npx solc --abi --bin contracts/Counter.sol

        const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        const bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

        if (!bytecode.startsWith("0x")) {
            throw new Error("올바른 주소값이 아닙니다.")
        }

        const contract = new web3.eth.Contract(abi, "0x94361e48351a024d29cd5d0ea4adf6032c29537e");
        const count = await contract.methods.getCount().call()
        console.log(count);


    } catch (error) {
        console.log("배포 중! 오류 발생", error.message);
        if (error.message.includes("funds")) {
            console.log("sepolia 지갑에 충분한 ETH가 있는지 확인하세요.");
        }
    }

}

getCount();