import { JSX, useState } from "react";
import getContract from "./getContract";
import Web3 from "web3";

declare global {
    interface Window {
        // 일단 any 밖는다.
        // 지금은 흐름이 중요하니, any를 밖는거지
        // 함부로 any쓰면 안됩니다^^
        ethereum?: any
    }
}

const Baseball = ():JSX.Element => {
    const [account, setAccount] = useState('0x...');
    const [balance, setBalance] = useState('0');
    const [progress, setProgress] = useState("0");
    const [reword, setReword] = useState('0'); 
    const [gameState, setGameState] = useState("0"); 
    const [allow, setAllow] = useState('0'); 
    const [random, setRandom] = useState(""); 
    const [input, setInput] = useState(''); 
    const web3 = new Web3(window.ethereum);

    const {
        baseBallContract,
        baseballAddress,
        myTokenContract
    } = getContract()

    const connectWallet = async() => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })
        setAccount(accounts[0]);
    }

    const getState = async () => {
        const selectedAddress = window.ethereum.selectedAddress;
        const bal: string = await myTokenContract.methods.balanceOf(selectedAddress).call();
        const reword: string = await baseBallContract.methods.getReword().call();
        const progress: string = await baseBallContract.methods.getProgress().call();
        const gameState: number = await baseBallContract.methods.gameState().call();
        const allow: string = await myTokenContract.methods
          .allowance(selectedAddress, baseballAddress)
          .call();
        
        setBalance(web3.utils.fromWei(bal, 'ether'));
        setReword(web3.utils.fromWei(reword, "ether"));
        setProgress(progress);
        setGameState(gameState.toString());
        setAllow(web3.utils.fromWei(allow, 'ether'));
    };

    const approve = async() => {
        try {
            const ticket = web3.utils.toWei("1000", "ether"); // 1000MTK => ticket 가격
            await myTokenContract.methods.approve(baseballAddress, ticket).send({ from: account });
            alert("권한 위임 완료!");
        } catch (error) {
            console.log(error);
        }
    }
    
    const gameStart = async() => {
        try {
            await baseBallContract.methods.gameStart(parseInt(input)).send({
                from: account
            })
            alert("게임 실행 완료");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2>Baseball Game</h2>

            <div>
                <h3>사용자 정보</h3>
                <p>사용자 주소: {account}</p>
                <p>보유 토큰: {balance} MTK</p>
                <p>베이스볼 CA에게 권한 위임을 얼마나 줬는가?: {allow} MTK</p>
            </div>

            <div>
                <h3>게임 정보</h3>
                <p>리워드: {reword} MTK</p>
                <p>시도 횟수: {progress}</p>
                <p>게임 상태: {gameState === "0" ? "게임 중" : "게임 종료"}</p>
            </div>

            <button onClick={connectWallet}>지갑연결</button>
            <button onClick={getState}>현재 상태</button>
            <button onClick={approve}>게임에 참가하시겠습니까?(권한 위임 할거임? 1000MTK임!)</button>

            <div>
                <input 
                    type="text"
                    placeholder="100 ~ 999 숫자 입력하라"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={gameStart}>게임 시작!</button>
            </div>
        </>
    )
}

export default Baseball;