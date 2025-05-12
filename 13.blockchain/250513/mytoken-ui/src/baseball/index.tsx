import { useEffect, useState } from 'react';
import getContract from './getContract';
import Web3 from 'web3';
import axios from 'axios';
import './baseball.css';

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
        <h3>🛒 NFT 프리민팅</h3>
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
        <h3>해당 컨트랙트에서의 NFT 소유자들</h3>
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
