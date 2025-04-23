import dotenv from "dotenv";
dotenv.config();
import Web3 from "web3"
import fs from "fs"
import path from "path"

describe("배포하고 increment 호출 후 이더스캔에서 트랜잭션 추적하기", () => {
    it("increment 호출되었는가?", () => {
        // npm install
        // npm install dotenv

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
                // npx solc --abi --bin contracts/Counter.sol
        
                const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
                const bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");
        
                if (!bytecode.startsWith("0x")){
                    throw new Error("올바른 주소값이 아닙니다.")
                }
        
                const contract = new web3.eth.Contract(abi, "0xa2606e0822e8164bcd3097adb88b0dfe5e7ce767");
                const gasPrice = await web3.eth.getGasPrice()
                
                const tx = {
                    from: "0xD7B89A4F52DFc7D8964590CEc49670B2225f33A0",  // 서명자 주소
                    to: "0xa2606e0822e8164bcd3097adb88b0dfe5e7ce767",   // 컨트랙트 주소
                    data: contract.methods.increment().encodeABI(),     // 호출 함수 인코딩
                    gas: 100000,                                         // 충분히 크게 설정
                    gasPrice
                  };
        
                const signedTx = await web3.eth.accounts.signTransaction(
                    tx,
                    process.env.PRIVATE_KEY
                )
        
                const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

                console.log("트랜잭션 전송 성공:", receipt.transactionHash);

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
    })
})