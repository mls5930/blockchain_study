// 경로: 250421/contracts/compile.js

// npm install solc

const fs = require("fs")
const path = require("path");
const solc = require("solc");

const conteactPath = path.join(__dirname, "Counter.sol");
const source = fs.readFileSync(conteactPath, "utf8");

// 컴파일 입력 설정

const input = {
    language: "Solidity",
    sources: {
        "Counter.sol": {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
}
// 컴파일 실행 & 에러 확인
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    console.log("컴파일 에러", output.errors);
    process.exit(1);

}
console.log(JSON.stringify(output, null, 2));


// ABI.json와 Bytecode 추출

const contract = output.contracts["Counter.sol"]["Counter"];
const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

fs.writeFileSync(
    path.join(__dirname, "contracts_sol_Counter.abi"),
    JSON.stringify(abi, null, 2)
)

console.log("Bytecode 저장 중...");
fs.writeFileSync(path.join(__dirname, "contracts_sol_Counter.bin"), bytecode);
console.log("컴파일 완료!");
console.log("ABI와 Bytecode가 저장되었습니다.");



