import { useEffect, useState } from 'react';
import getContract from './getContract';
import Web3 from 'web3';
import axios from 'axios';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Baseball = () => {
  const [account, setAccount] = useState('0x...');
  const [tokenId, setTokenId] = useState('');
  const [web3, setWeb3] = useState<Web3>();
  const [myNfts, setMyNfts] = useState<{ tokenId: string; image: string }[]>(
    []
  );
  const [allNfts, setAllNfts] = useState<{ tokenId: string; image: string; owner: string }[]>([]);

  const {
    baseballNftTokenAddress,
    baseballNftTokenContract
  } = getContract();

  useEffect(() => {
    if (window.ethereum) {
      const instance = new Web3(window.ethereum);
      setWeb3(instance);
    } else {
      alert('Metamask가 설치되어 있지 않습니다.');
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const selectedAddress = accounts[0];
    setAccount(selectedAddress);
  };

  const minting = async () => {
    if (!web3) return;
    try {
      await baseballNftTokenContract.methods.minting(tokenId).send({
        from: account
      });
      alert("NFT 발급 완료");
    } catch (error) {
      console.log(error);
    }
  }

  const loadMyNFTsWithoutEnumerable = async () => {
    if (!web3 || !account) return;
    try {
      // 일단 총 발행량 확인
      // for문을 여기다가 돌리겠습니다.
      const maxTokenId = await baseballNftTokenContract.methods.getTotalSupply().call();
      const found: { tokenId: string, image: string }[] = [];
      // 지금 컨트랙트에 있는 NFT는 2개 발행했으니 총 발행량이 2
      for (let id = 0; id < maxTokenId; id++) {
        try {
          // 내 NFT니까 ownerOf로 id 전달하여 address를 가져오고 내 상태와 비교
          const owner = await baseballNftTokenContract.methods.ownerOf(id).call();
          if (owner.toLowerCase() === account.toLowerCase()) {
            // ipfs://bafybeif4zdkotbumzuh6pxv5fjcvn3f4ajsqn74kiggelsskk6t5iqjsse/0.json
            const uri = await baseballNftTokenContract.methods.tokenURI(id).call();
            // https://ipfs.io/ipfs/로 변환 
            const metadataUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
            // https://ipfs.io/ipfs/bafybeif4zdkotbumzuh6pxv5fjcvn3f4ajsqn74kiggelsskk6t5iqjsse/0.json
            const { data } = await axios.get(metadataUri);
            const image = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
            // https://ipfs.io/ipfs/bafybeif4zdkotbumzuh6pxv5fjcvn3f4ajsqn74kiggelsskk6t5iqjsse/0.png
            found.push({ tokenId: id.toString(), image });
          }
        } catch (error) {
          // 해당 맥락은, 해당하는 내 토큰을 못찾았을 때, 다음 토큰을 찾을 수 있게끔 하는 코드
          console.log(error);
          continue;
        }
      }
      setMyNfts(found);
    } catch (error) {
      console.log(`내 NFT 조회 오류 : ${error}`);
    }
  }


  const loadAllNFTs = async () => {
    if (!web3 || !account) return;

    try {
      const total = await baseballNftTokenContract.methods.getAllTokenIds().call();
      const found: { tokenId: string; image: string; owner: string }[] = [];

      for (let i = 0; i < total.length; i++) {
        const tokenId = total[i];
        try {
          const owner = await baseballNftTokenContract.methods.ownerOf(tokenId).call();
          const uri = await baseballNftTokenContract.methods.tokenURI(tokenId).call();

          const metadataUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
          const { data } = await axios.get(metadataUrl);
          const image = data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
          found.push({ tokenId: tokenId.toString(), image, owner, });
        } catch (err) {
          continue;
        }
      }
      setAllNfts(found);
    } catch (err) {
      console.error('전체 NFT 조회 실패:', err);
    }
  };

  const approveToken = async (tokenId: string) => {
    if (!web3 || !account) return;
    try {
      await baseballNftTokenContract.methods.approve(baseballNftTokenAddress, tokenId)
        .send({ from: account });
      alert("판매 등록 완료(권한 위임 완료)")
    } catch (error) {
      console.log("판매 등록 실패", error);
    }
  }

  const purchaseNFT = async (tokenId: string) => {
    if (!web3 || !account) return;
    const price = web3.utils.toWei("1", "ether");
    try {
      await baseballNftTokenContract.methods.purchase(tokenId).send({
        from: account,
        value: price
      })
      alert("구매 완료!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h2>⚾ Baseball NFT Game</h2>

      <div>
        <h4>사용자 주소</h4>
        <p>{account !== '0x...' ? account : '지갑이 연결되지 않았습니다.'}</p>
        <button onClick={connectWallet}>🦊 메타마스크 지갑 연결</button>
      </div>

      <hr />

      <div>
        <h3>🛒 NFT 민팅</h3>
        <input
          type="text"
          placeholder="발급할 NFT Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
        <br />
        <button onClick={minting} style={{ marginTop: '10px' }}>
          🎁 NFT 민팅하기
        </button>
      </div>

      <hr />

      {/* NFT 이미지 표시 */}
      <div>
        <h3>내가 가진 NFT들</h3>
        <button
          onClick={loadMyNFTsWithoutEnumerable}
          style={{ marginTop: '10px' }}
        >
          이미지 가져오기
        </button>
        {myNfts.length === 0 ? (
          <p>보유한 NFT가 없습니다.</p>
        ) : (
          myNfts.map((nft) => (
            <div key={nft.tokenId}>
              <p>Token ID: {nft.tokenId}</p>
              <img src={nft.image} alt={`NFT ${nft.tokenId}`} width={200} />
              <button onClick={() => approveToken(nft.tokenId)}>
                판매하려고 내놓기
              </button>
            </div>
          ))
        )}
      </div>

      <hr />

      <div>
        <h3>NFT 목록들</h3>
        <button
          onClick={loadAllNFTs}
          style={{ marginTop: '10px' }}
        >
          이미지 가져오기
        </button>
        {allNfts.length === 0 ? (
          <p>NFT 없음</p>
        ) : (
          allNfts.map((nft) => (
            <div key={nft.tokenId}>
              <img src={nft.image} alt={`NFT ${nft.tokenId}`} width={200} />
              <p>Token ID: {nft.tokenId}</p>
              <p>소유자: {nft.owner}</p>
              {nft.owner.toLowerCase() !== account.toLowerCase() && (
                <button onClick={() => purchaseNFT(nft.tokenId)}>🛒 구매하기</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Baseball;
