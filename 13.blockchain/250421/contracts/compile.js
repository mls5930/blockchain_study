// npm install solc

const fs = require('fs');
const path = require("path");
const solc = require('solc');

// 컨트랙트 소스 코드 로드
const contractPath = path.join(__dirname, "Counter.sol");
const source = fs.readFileSync(contractPath, "utf8");

// 컴파일 옵션 만들기 => 입력 설정
// 어떤 언어임?
// 어떤 파일을 컴파일 할거임?
// 무슨 정보까지 뽑을거임?
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

if(output.errors) {
    console.log("컴파일 에러", output.errors);
    process.exit(1);
}

// ABI.json와 Bytecode 추출
const contract = output.contracts["Counter.sol"]["Counter"];
const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

console.log("ABI 저장 중....");
fs.writeFileSync(
    path.join(__dirname, "contracts_sol_Counter.abi"),
    JSON.stringify(abi, null, 2)
)

console.log("Bytecode 저장 중....");
fs.writeFileSync(path.join(__dirname, "contracts_sol_Counter.bin"), bytecode);

console.log("컴파일 완료!");
console.log("ABI와 Bytecode가 저장되었습니다.");