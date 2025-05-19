// metaTransaction.test.ts

import { ethers } from "ethers";
import contractJSON from "../build/contracts/MetaTransaction.json";
import tokenJSON from "../build/contracts/MyToken.json";
/*
    wallet = [
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        ""
    ]
*/
// 내일 사용자들을 10개로 가정하여서, 회사가 10개 주소에 대해서 만드는걸 할거임
// 오늘은 흐름을 체화하는게 목적이라 1개만 처리해보겠음.
describe("/sign 시나리오 사용자 요청 처리", () => {
    const wallets = [];
    const txpool = [];
    let signature;
    // 사용자 지갑 하나를 의미
    const count = 1;

    beforeAll(async () => {
        // 테스트용 메시지 하나를 생성
        for (let i = 0; i < count; i++) {
            const wallet = ethers.Wallet.createRandom();
            // wallet.privateKey, wallet.address;
            wallets.push(wallet);
        }
        // 메세지 정의 (contract 구조 맞춤)
        const message = {
            sender: wallets[0].address,
            data: 10
        }

        // JSON 문자열로 메세지를 서명
        signature = await wallets[0].signMessage(JSON.stringify(message));
    })

    it("사용자가 메시지에 서명했나?", async () => {
        console.log(signature);
        expect(signature).toMatch(/^0x[0-9a-fA-F]{130}$/);
    })

    it("서명 검증에 성공해야 한다", async () => {
        const message = {
            sender: wallets[0].address,
            data: 10
        }
        // 스마트 컨트랙트 내부의 ecrecover 처럼 공개키를 복원할 수 있는 메서드입니다. 
        const recovered = ethers.verifyMessage(JSON.stringify(message), signature);
        // ecrecover(sign, v, r, s); => 공개키
        expect(recovered).toEqual(wallets[0].address)
    })

    it("검증된 요청을 txpool 저장한다", async () => {
        const message = {
            sender: wallets[0].address,
            data: 10
        }
        const recovered = ethers.verifyMessage(JSON.stringify(message), signature);
        // 기존의 월렛 => 주소와 다시 복원하여 만든 주소가 동일하다면?
        if (recovered === wallets[0].address) {
            // "우리"가 자체적으로 만든 txpool에 저장한다.
            txpool.push({ message, signature });
        }
    })

    it("서명된 메시지를 읽어와서 mint를 실행한다.", async () => {
        // 지금은 트랜잭션 하나만 있다고 가정하지만,
        // 만약 동적으로 사용자가 존재한다면, 반복문을 돌려야 함.
        const { message, signature } = txpool[0];

        /*
            address[] memory _address,
            uint[] memory token,
            string[] memory message,
            bytes[] memory signature
        */

        const addresses = [message.sender];
        const tokens = [message.data];
        const messages = [JSON.stringify(message)];
        const signatures = [signature];
        const privateKey = "0x9ddc37acbbddde06588ce235a665b280170ed72bfd7b8bd527f2949e00f172eb";

        // RPC Provider
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        // 번들러: 배포한 owner => 회사에서 배포한 주소
        const bundler = new ethers.Wallet(privateKey, provider);

        // 컨트랙트 인스턴 연결
        const contractAddress = contractJSON.networks["1747628248916"].address;
        const tokenAddress = tokenJSON.networks["1747628248916"].address;

        const metaContract = new ethers.Contract(contractAddress, contractJSON.abi, bundler);
        const tokenContract = new ethers.Contract(tokenAddress, tokenJSON.abi, bundler);

        // 진짜 서명 검증 후 mint가 실행되는지 확인
        // 실행 전, 토큰 값 확인
        // tokenContract.methods.balanceOf(message.sender).call()
        const before = await tokenContract.balanceOf(message.sender);

        // mint 실행
        const tx = await metaContract.mint(addresses, tokens, messages, signatures);
        await tx.wait();

        const after = await tokenContract.balanceOf(message.sender);
        // 그래서, 너 진짜 서명 검증하고 주소 검증한 후에 진짜 토큰이 발급되었니?
        // 10000000000000000000000n => 10000000000000000000000
        expect(after - before).toBe(BigInt(message.data));
    })
})