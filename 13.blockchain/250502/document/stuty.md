EIP, ERC 개념 및 하드햇 도구의 핵심 개념 시각적 정리

이더리움 개선 제안서(EIP)와 토큰 표준(ERC) 개요


EIP(Ethereum Improvement Proposal)는 이더리움 네트워크의 기능 개선 제안서로, 프로토콜·API·토큰 표준 등의 변경을 제안하는 기술 문서입니다
blockjoys.com
. 커뮤니티에서 누구나 EIP를 작성하여 이더리움 개선 방안을 논의하며, 중요한 제안은 합의 과정을 거쳐 채택됩니다. 예를 들어 EIP-20은 ERC-20 토큰 표준을 정의하여 대체가능한(Fungible) 토큰의 발행·전송 인터페이스를 규정하고
iq.wiki
, EIP-721은 ERC-721 비가역 토큰(NFT) 표준을 정의하여 고유한(Non-fungible) 디지털 자산의 인터페이스를 규정합니다
iq.wiki
.
정의: EIP는 Ethereum Improvement Proposal의 약자로, 이더리움 프로토콜이나 기능 향상을 위한 표준 제안서입니다
blockjoys.com
.
필요성: 이더리움의 발전을 위해 프로토콜 변경·기능 추가 제안을 공식화하고, 개발자들이 따라야 할 규칙·권장사항을 기술합니다
blockjoys.com
.
과정: EIP는 아이디어 단계→초안→검토→최종 승인 등의 절차를 거쳐 “Final” 상태가 되면 정식 표준(ERC)으로 번호가 부여됩니다
infomauntain.tistory.com
iq.wiki
.
대표적 예시: EIP-20(ERC-20, 이더리움 토큰 표준), EIP-721(ERC-721, NFT 표준) 등이 있으며, 이들은 각각 토큰 발행·전송 인터페이스를 정의합니다
iq.wiki
.
ERC란 무엇인가?
ERC(Ethereum Request for Comments)는 EIP 중 토큰 표준에 해당하는 분류로, 이더리움 커뮤니티의 제안 검토 프로세스 일환입니다. 즉, ERC 번호가 붙은 제안은 토큰 계약 인터페이스 등 표준 규격을 정의한 문서입니다
infomauntain.tistory.com
en.wikipedia.org
.
정의: ERC는 Ethereum Request for Comments의 약자로, 이더리움 커뮤니티가 토큰 표준 등 스마트컨트랙트 인터페이스를 제안하고 검토하는 형식을 의미합니다
infomauntain.tistory.com
en.wikipedia.org
.
EIP와 관계: 모든 ERC 표준은 EIP 저장소에 제안되어 번호가 부여된 뒤, 승인되면 ERC로 정식화됩니다
infomauntain.tistory.com
. 예를 들어 “ERC-20”에서 ‘20’은 EIP 저장소에서 20번째로 제안되어 채택되었음을 뜻합니다.
주요 ERC 종류: 대표적인 ERC 토큰 표준 3가지로는 ERC-20(대체가능 토큰), ERC-721(비가역 토큰 NFT), ERC-1155(멀티토큰, 대체/비가역 토큰 혼합 지원)가 있습니다
en.wikipedia.org
ethereum.org
.
ERC-20: 동일한 토큰 단위가 교환 가능한 펀지블(Fungible) 토큰 표준
docs.openzeppelin.com
. 예: 스테이블코인, 프로젝트 토큰 등.
ERC-721: 각 토큰이 고유 ID를 가지는 대체불가능(Non-fungible) 토큰 표준
en.wikipedia.org
. 예: CryptoKitties 등 디지털 수집품.
ERC-1155: 단일 계약으로 여러 종류의 펀지블/비가역 토큰을 함께 관리하는 멀티 토큰 표준
ethereum.org
.
Hardhat이란 무엇인가?
Hardhat은 이더리움 스마트컨트랙트 개발을 위한 통합 개발 환경입니다
hardhat.org
. 컴파일, 테스트, 디버깅, 배포 등 스마트컨트랙트 개발 과정의 반복 작업을 자동화해 주는 기능을 제공합니다. 특히 Hardhat은 내장된 Hardhat Network를 통해 로컬 PC에서 독립 실행 가능한 Ethereum 노드를 가동할 수 있어, 계약 배포와 테스트, 디버깅을 편리하게 수행할 수 있습니다
hardhat.org
. Hardhat의 주요 특징으로는 Solidity 디버깅 지원, 플러그인 시스템, 스크립트 기반 작업 등이 있습니다.
Hardhat: 이더리움 개발 환경으로, 스마트컨트랙트 편집·컴파일·배포·테스트·디버깅을 위한 도구를 제공합니다
hardhat.org
hardhat.org
.
Hardhat Network: Hardhat에 내장된 로컬 블록체인 노드로, 빠른 트랜잭션 실행과 디버깅을 지원합니다
hardhat.org
.
Ganache (비교): Ganache는 Truffle Suite에서 제공하는 개인용 로컬 블록체인 도구로, 한 번의 클릭으로 테스트용 체인을 구동하여 트랜잭션 실행·테스트를 할 수 있습니다
archive.trufflesuite.com
. Ganache는 GUI/CLI로 체인 상태를 시각화하고, 블록 생성 시기 등 설정을 세부 조정할 수 있다는 점이 특징입니다.
차이점: Hardhat은 스크립트·플러그인 중심으로 CLI/코드 방식 개발을 지원하며, Solidity 디버깅 기능이 강화되어 있습니다. 반면 Ganache는 GUI 기반 체인 관리 기능을 제공하고, 사용자가 쉽게 체인 상태를 관찰·조절할 수 있습니다
hardhat.org
archive.trufflesuite.com
.
ERC-20 토큰 표준 개요


ERC-20은 이더리움의 대체가능 토큰(Fungible Token) 표준으로, 스마트컨트랙트에서 토큰의 발행과 전송을 위한 공통 인터페이스를 정의합니다. ERC-20은 총공급량 확인(totalSupply()), 계정 잔액 조회(balanceOf()), 토큰 전송(transfer()), 토큰 위임 전송(transferFrom()), 위임 승인(approve()), 승인된 잔액 조회(allowance()) 등 6개의 필수 함수로 구성됩니다
info.etherscan.com
. 이들 함수는 각 토큰 계약이 이더리움 지갑이나 거래소와 호환되도록 표준화된 기능을 제공합니다.
필수 함수 (6개): totalSupply, balanceOf, transfer, transferFrom, approve, allowance
info.etherscan.com
. 예를 들어, totalSupply()는 토큰 총 발행량을 반환하고, balanceOf(owner)는 주소의 토큰 잔액을 반환합니다.
토큰 전송 (transfer): 소유자 계정이 transfer(to, value)를 호출하면, 스마트컨트랙트가 호출자 계정에서 value만큼 차감하여 수신자에게 토큰을 전송합니다
info.etherscan.com
. 전송 시 Transfer 이벤트가 발생합니다.
위임 전송 흐름 (approve → transferFrom): 토큰 소유자 A가 approve(spender, value)를 호출하여 B 주소에게 value만큼 토큰 사용을 허가하면, B는 이후 transferFrom(A, C, amount)를 호출하여 승인된 한도 내에서 A의 토큰을 C에게 전송할 수 있습니다. 이 과정에서 컨트랙트는 A의 잔액을 차감하고 C의 잔액을 증가시키며 Transfer 이벤트를 발생시킵니다
eips.ethereum.org
ethereum.stackexchange.com
. 예를 들어, A가 B에게 100 토큰 사용을 승인(approve(B,100)), B가 transferFrom(A, C, 50)을 실행하면 A→C로 50 토큰이 이동합니다
ethereum.stackexchange.com
. 이로써 지갑에 직접 없는 토큰도 안전하게 전송할 수 있습니다.
ERC-721 (NFT) 표준 개요
ERC-721은 비가역 토큰(Non-fungible Token, NFT) 표준으로, 각 토큰이 고유한 ID를 갖는 데이터 구조를 제공합니다
en.wikipedia.org
. 일반적인 ERC-20 토큰과 달리, ERC-721 토큰은 동일한 단위가 없고 서로 대체 불가능합니다. 즉, 서로 다른 NFT는 같은 가치를 보장하지 않으며 서로 완전히 다른 고유 식별자를 가집니다
investopedia.com
docs.openzeppelin.com
. 예를 들어 디지털 예술품이나 컬렉션 아이템 등이 ERC-721로 발행되며, 대표적인 사례로 CryptoKitties가 있습니다.
대체 가능 vs 불가능: ERC-20 토큰은 교환 가능한 동일 단위를 가지는 반면, ERC-721은 각 토큰에 고유 ID와 메타데이터(예: tokenURI)가 붙어 있어 유일무이합니다
investopedia.com
en.wikipedia.org
.
필수 함수: ERC-721 표준은 소유자 조회(ownerOf(tokenId)), 잔액 조회(balanceOf(owner)), 전송(transferFrom 및 안전 전송 safeTransferFrom), 단일 승인(approve, getApproved), 일괄 승인(setApprovalForAll, isApprovedForAll) 등 여러 함수를 정의합니다
docs.openzeppelin.com
. 예를 들어 ownerOf(1234)는 토큰 ID 1234의 소유자 주소를, approve(addr, 1234)는 해당 토큰을 addr에 양도할 권한을 줍니다.
이벤트: Transfer(from, to, tokenId), Approval(owner, approved, tokenId), ApprovalForAll(owner, operator, approved) 이벤트를 통해 전송과 승인 내역을 알립니다
docs.openzeppelin.com
.
NFT 구조: 각 ERC-721 계약은 tokenId를 기준으로 소유자와 메타데이터(예: tokenURI)를 저장합니다. 이는 한정판 디지털 아트나 게임 아이템 등의 유일한 자산을 표현하는 데 사용됩니다. 투자자들은 이러한 NFT를 거래소나 마켓플레이스에서 사고팔 수 있습니다.
주요 용어 비교표
용어	설명	예시/특징
EIP	Ethereum 개선 제안서(표준 문서)	프로토콜·토큰 표준 제안(EIP-20, 721 등)
ERC	EIP 중 토큰 표준 분류(Request for Comments)	토큰 인터페이스 규격(ERC-20, ERC-721, ERC-1155)
ERC-20	대체가능 토큰 표준 (Fungible Token)	균등 단위, 예: 스테이블코인
ERC-721	비가역 토큰 표준 (Non-Fungible Token)	고유 단위, 예: CryptoKitties NFT
ERC-1155	멀티토큰 표준 (Fungible/Non-fungible 병용)	하나의 계약으로 다수 토큰 지원
Hardhat	이더리움 개발 환경 도구	통합 개발환경(컴파일, 테스트, 배포, 디버깅)
Ganache	개인용 로컬 블록체인 도구	체인 시뮬레이터(GUI 지원, 블록생성 조정)