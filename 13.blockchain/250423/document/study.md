# `tx_report.md` (예시)

---

## 1. 이 컨트랙트는 어떤 역할을 하나요?




---

## 2. 이 컨트랙트를 블록체인에 올리기 위해 어떤 준비를 했나요?

1. Solidity 코드 작성

2. 연결을 위한 인프라넷 가입후 내 주소를 가져옴 SEPOLIA_RPC_URL => CA

    수정(세폴리아 네트워크에 연결할 수 있는 노드 URL) 내주소 X

3. 만들어진 sol 코드 를 컴파일 하여 abi 와 bin 파일 생성

4. fs.로 컴파일한 파일들을 읽어옴 

5. 스마트 컨트랙트를 만들준비 설계도 작성 new web3.eth.Contract(abi);

6. deploy로 실제 실행파일(bytecode,arguments[])로 초기값을 넣어줍니다. deployTx

7. gas와 gasPrice 작성

8. 실제 배포서버 SepoliaETH 서버에 배포하는것이므로 PRIVATE_KEY가 필요
    => 배포할 주체가 누구인지 알기위해 EOA  

9. 지갑 생성 및 비밀키 생성
    1. MetaMask 다운 
        MetaMask는 브라우저 확장 프로그램 형태의 이더리움 지갑 블록체인과 직접 상호작용을 도와줌

    2. 지갑 계정 생성후 유저계정을 생성
    3. 비밀키발행 SH
        나임을 증명하는 key 이므로 트랜젝션 서명에 사용
    4. 유저계정의 비밀키로 공개키 발행 (secp256k1곡선) 
    5. 주소 발행 공개키를 keccak256으로 해시하고 마지막 20바이트 사용 

    수정
        address = '0x' + keccak256(publicKey)[-20:]

10. 트렌젝션 작성 및 구조

    from: 트랜잭션을 사용할 사용자의 공개 주소 (address)
    data: deployTx 
        기존에는 deployTx 만 넣으면 됬지만 deployTx는 객체상태 이기에 블록체인이 코드를 읽기위해서 encodeABI()로 변환해줘야함
    gas,
    gasPrice
    to: 트랜잭션을 실행시킬 컨트랙트  주소입니다. 
    발행시에는 트랜잭션을 실행시킬 주소가 없기에 null이 뜨므로  생략합니다. 

    수정:

    "to: 생략" → 정확히는 배포용 트랜잭션에는 to를 생략해야 합니다 ✅
    컨트랙트 호출일 때만 to를 지정합니다.

11. 트렌젝션 서명 signedTx
    만들어진 트랜잭션을 서명합니다. (tx , PRIVATE_KEY)
    타원곡선 알고리즘에 적용하여
    {
        messageHash: '0x...',            // 우리가 서명한 해시
        v: '0x1b', r: '0x...', s: '0x...', // 서명 정보
        rawTransaction: '0x...',         // 네트워크에 보낼 준비가 된 트랜잭션
        transactionHash: '0x...'         // 이 트랜잭션의 고유 ID
    }   

12. 발행 

    실제 발행을 하기위해서 검증 된 트랜잭선임을 위해 서명이된 트랜잭션임을 증명하는 값인 
    receipt.rawTransaction 메서드로 발행을 합니다.
 
---

## 3. 내가 보낸 트랜잭션의 구조를 설명해보세요


    from: 트랜잭션을 사용할 사용자의 공개 주소 (비밀키로 발행)
    data: deployTx 
        기존에는 deployTx 만 넣으면 됬지만 deployTx는 객체상태 이기에 블록체인이 코드를 읽기위해서 encodeABI()로 변환해줘야함
    gas,
    gasPrice
    to: 트랜잭션을 실행시킬 컨트랙트  주소입니다. 
    발행시에는 트랜잭션을 실행시킬 주소가 없기에 null이 뜨므로  생략합니다. 

---

## 4. 내가 보낸 트랜잭션을 Etherscan에서 분석해보세요

Transaction Hash: 트랜잭션을 식별하는 고유한 해시값 (Tx ID)

Status: 트랜잭션 성공 여부 (Success 또는 Fail)

Block: 이 트랜잭션이 포함된 블록 번호

Confirmations: 현재까지 블록체인에 몇 개의 블록이 더 쌓였는지

Timestamp: 트랜잭션이 블록에 포함된 시간

From: 트랜잭션을 보낸 계정 주소 (EOA)

To: 받는 계정 주소 or 호출된 스마트 컨트랙트 주소

Value: 보낸 이더(ETH)의 양

Transaction Fee: 이 트랜잭션을 위해 실제로 소모된 ETH 총액

Gas Price: 가스 1단위당 지불한 가격 (Gwei 단위)

    Gwei 는 ETH 단위의 10-^9승 
    1Gwei 는 0.0000000001 ETH

Gas Limit & Usage: 트랜잭션 실행을 위해 최대 허용치 vs 실제 소모량
    실제 소모량이 최대 허용치에 가까울수록 코드 효율이 좋다.

Burnt Fees: EIP-1559 이후 소각된 가스비 (베이스피)

    EIP-1559 이후 도입된 Base Fee 소각이란?
    EIP-1559는 이더리움이 2021년에 도입한 수수료 개혁 시스템입니다.

    핵심 개념: Base Fee Burn

    항목	설명
    Base Fee	트랜잭션을 블록에 포함시키기 위한 최소 수수료
    Priority Fee	채굴자(지금은 블록 프로듀서)에게 주는 팁 (tip)
    Total Fee	Base Fee + Tip
    Base Fee는 자동 소각됨	즉, 그만큼의 ETH는 없어짐 (→ 디플레이션 효과)

Nonce: 이 계정의 트랜잭션 순번 (중복 방지용)

Txn Type: 트랜잭션 유형 (0 = Legacy, 2 = EIP-1559)

Position In Block: 해당 트랜잭션이 블록 내에서 몇 번째 위치인지

Input Data: 컨트랙트 함수 호출에 쓰인 데이터 (인코딩된 ABI)
    실제로 호출된 함수의 데이터  
    contract.methods.increment().encodeABI()

---

## 5. 오늘 수업을 통해 내가 얻은 가장 중요한 감각은?

