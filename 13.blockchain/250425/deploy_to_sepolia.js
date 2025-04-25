// 경로 : 250424/deploy_to_sepolia.js

require('dotenv').config();
const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Web3 인스턴스 생성 (Sepolia 연결)
const web3 = new Web3("https://public-en-kairos.node.kaia.io");

// 경로 설정
const abiPath = path.join(__dirname, 'contracts_Counter_sol_Counter.abi');
const bytecodePath = path.join(__dirname, 'contracts_Counter_sol_Counter.bin');
const outputPath = path.join(__dirname, 'etherscan_links.txt');

// 배포 함수
async function deployToSepolia() {
  try {
    // 1. ABI / Bytecode 불러오기
    if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
      throw new Error(
        'ABI.json 또는 Bytecode.json이 없습니다. 먼저 컴파일을 실행하세요.'
      );
    }

    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();

    // 2. bytecode는 반드시 0x로 시작해야 함
    if (!bytecode.startsWith('0x')) {
      bytecode = '0x' + bytecode;
    }

    // 3. 계정 설정
    const account = web3.eth.accounts.privateKeyToAccount(
      process.env.PRIVATE_KEY
    );
    const contract = new web3.eth.Contract(abi);

    // 4. 배포 트랜잭션 데이터 준비
    const deployTx = contract.deploy({ data: bytecode, arguments: [
      account.address
    ] });
    const gas = await deployTx.estimateGas();
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: account.address,
      data: deployTx.encodeABI(),
      gas,
      gasPrice, 
    };

    // 5. 트랜잭션 서명 및 전송
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.PRIVATE_KEY
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // 6. 결과 출력
    console.log('✅ 배포 성공!');
    console.log('Contract address:', receipt.contractAddress);
    console.log('Transaction hash:', receipt.transactionHash);

    // 7. etherscan_links.txt 저장
    const links = `# Contract Address
      https://sepolia.etherscan.io/address/${receipt.contractAddress}

      # Deployment Transaction
      https://sepolia.etherscan.io/tx/${receipt.transactionHash}
    `;

    fs.writeFileSync(outputPath, links, 'utf8');
    console.log(`🔗 Etherscan 링크가 ${outputPath}에 저장되었습니다.`);
  } catch (err) {
    console.error('🚨 배포 중 오류 발생:', err.message);
    if (err.message.includes('funds')) {
      console.error('💡 Sepolia 지갑에 충분한 ETH가 있는지 확인하세요.');
    }
  }
}

deployToSepolia();
