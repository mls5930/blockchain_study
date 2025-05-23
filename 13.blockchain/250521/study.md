6번 

블록탐색기에서 확인 
내가발행한 토큰 이름 PXA 
블록 넘버 186222606
https://kairos.kaiascope.com/nft/0x5dc28adcf7fed865bcc7965d944ef142c8b54604?tabId=nftTransfer

openseatest 넷에서 토큰발행확인 

https://testnets.opensea.io/account


9번 
NFT의 정체성을 표현하는 tokenId의 역할과 의미를 설명하세요.


NFT는 복제 불가능한 고유한 디지털 자산으로 각 토큰마다 tokenId가 부여됩니다. 이는 토큰의 고유성을 나타내는 핵심이며 같은 이미지나 같은 내용의 NFT를 10개를 발행한다고 했을때  tokenId 다르기 떄문에 10개는 서로 다른 토큰임을 입증 할 수 있게 됩니다.( 완전하게 동일한 NFT는 존재할수가 없다) tokenID를 통해 누가 언제 발행했는지를 조회 할 수 있기에 가 발행한적없는 NFT 내용이라도 발행자가 tokednId를 확인하여 변조,위조 된 토큰입증임을 알려줍니다. 이렇게 토큰을 발급한 발행자는 사용자의 토큰이 자신만이 가지는 고유하고 변조가 불가능함을 알려줍니다.


10번
현재 구현한 NFT 마켓플레이스의 전체적인 흐름과 로직을 서술하시오


1. 특정 주소를 가진 유저가 입장합니다. 
 1.1 지갑을 연결하지 않은 사용자는 현제 발행된 토큰만 확인가능합니다.
 1.2 지갑은 메타마스크를 기반으로 연결을 합니다. 
2. 지갑 연결부터 합니다. (connectWallet 함수)
3. 민팅 버튼이 존재하면 (mint, safeMint), 누릅니다.
    3.1 사용자가 owner 여야만 민팅이 가능합니다. 
    owner가 아닐경우 owner 만이 민팅이 가능합니다. alert 
    3.2 owner가 민팅을 할경우 입력란 없이 발행된 tokenId 순서대로 민팅이 됩니다. 

    
4. 메타마스크 서명 컨펌 팝업창이 뜹니다.

5. 컨펌 버튼 누릅니다.

6. 판매하기 버튼을 누릅니다. 원하는 NFT tokenId를 인자로 보냄 (approve)
    6.1 권한을 가지고 있는건 아직 owner 이므로 권한을 넘기는 approveToken 함수를 호출합니다.
    6.2 approveToken 함수는 배포된 스마트컨트렉트 내부 메서드인 approved 호출하여 CA에게 권한을 위임합니다. 
    6.3 권한을 넘겼지만 여전히 가지고 있는건 owner이기 떄문에 내가가진 토큰 조회로 확인가능합니다.
7. 전부 판매하려고 내놓기 approveAllTokens 
    7.1 연결된 사용자의 개정으로 스마트 컨트렉트 내부메서드를 실행합니다. 
    7.2 판매자가 NFT에 대해 모든권한을 가지고 있는지부터 확인합니다. isApprovedForAll
    7.3 권한이 없으면 모든 nft에 대해 CA에게 권한을 위임합니다. setApprovalForAll
8. 마켓 플레이스에게 권한을 넘기고
9. 내껀지 확인하는 버튼을 누른다.
10. 내 NFT에 대한 정보가 나온다.
11. 메타마스크에서 주소를 변경한다. 
    11.1 메타마스크 2번째 계정 
    
12. 지갑 연결한다. (connectWallet 함수)
13. NFT 목록 버튼을 누른다.
    13.1 전체 발행된 NFT 목록이 나옵니다. 
14. 특정 NFT를 구매하기 버튼을 누른다.
    14.1 토큰의 owner는 구매하기 버튼이 뜨지않음
    14.2 구매하기를 누를 수 있는 사용자가 구매하기를 누를경우 purchaseNFT 함수실행
    14.3 purchaseNFT 함수는 먼저 구매하려는 NFT의 권한을 확인합니다. 
    배포된 CA 주소와 구매하려고 하는 권한자가 같은지 를 검증 
    14.4 내부 브라우저에서 먼저 판매가 등록된 NFT임을 검증 
    권한이 없는 NFT면 alert 권한이 없습니다. 

    14.5 권한이 있는 nft면 토큰을 구매하는 트랜잭션을 실행합니다.
    내부 스마트 컨트렉트 메서드 Tokensale (payable) 을 실행.

    14.6 Tokensale 내부에서 한번더 권한이 위임된 사용자인지를 검증합니다. 
    isApprovedForAll,getApproved 
    
    14-7. 내 잔액을 확인한다.
    잔액이 충분하지 않으면 require 

    14.8 인증을 통과하면 CA 가 토큰 owner에게 1이더를 보내고 권한을 구매자에게 위임 

15. 내 NFT 확인 버튼을 눌러서 내 지갑으로 들어와있는 것을 확인  



스마트 컨트렉트 네트워크 배포 흐름


1. 트러플을 다운받습니다. 
fruffle init 

2. 트러플을 실행하면 기본적으로 contracts 와 migrations 파일이 생깁니다.

3. sol 파일을 작성합니다. 
contracts 안에서 sol 파일을 작성

4. sol 파일작성후 배포 
fruffle migrate 
truffle migrate 는 기본적으로 gnache 기반으로 연결을 합니다.
따라서 truffle comfig.js를 작성해야합니다.

5. comfig.js 는 
배포를 도와주는 hdwallet- provider 을 설치
**@truffle/hdwallet-provider** 이건 
**truffle이 스마트 컨트랙트를 외부 네트워크 등에 배포할 수 있도록 도와주는 지갑 연결 도구입니다.**
그후 네트워크를 지정해줍니다
networks: {
    사용할 네트워크 ex) kairos: {
        
    }
}

6. 사용할 네트워크에는 
provider()(provider은 함수형태여야함) 를 명시해줍니다. 
배포를 하려는 내지갑의 비밀키와 , 사용할 네트워크를 따르는 url을 명시해야합니다.
또 체인아이디 또한 명시해주면 좋습니다.

7. 컴파일 또한 명시해줄수 있습니다.
우리가 truffle을 설치하면 solc를 안깔아도 되는 이유입니다. 


require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    kairos: {
      provider: () =>
        new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          process.env.RPC_URL
        ),
      network_id: 1001,
    },
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
}
// npx fruffle migrate

