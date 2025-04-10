// npm install elliptic @types/elliptic
import Wallet from "@core/wallet";
import { randomBytes } from "crypto";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

describe("전자 서명 테스트",() => {
    let privateKey: string;
    let publicKey: string;
    let signature: elliptic.ec.Signature
    const ec = new elliptic.ec("secp256k1");

    it("1단계 개인키 만들기", () => {
        privateKey = randomBytes(32).toString("hex");
    })

    it("2단계 공개키 만들기", () => {
        const keypair = ec.keyFromPrivate(privateKey);
        publicKey = keypair.getPublic().encode("hex", true);
    })
    
    it("3단계 서명 만들기", () => {
        const data = "나 김두한이다";
        const hash = SHA256(data).toString();
        // 왜 keypair라는 변수 그리고 타원곡선.keyFromPrivate를 만들어?
        // 그냥 서명할 때 비밀키만 넣으면 되는거 아님?
        const keypair = ec.keyFromPrivate(privateKey);
        // r, s, v + G 포인트 => 공개키
        signature = keypair.sign(hash, "hex");
    })

    it("4단계 검증하기", () => {
        const keypair = ec.keyFromPublic(publicKey, "hex");
        const data = "나 김두한이다";
        const hash = SHA256(data).toString();
        // r, s, v + G 포인트 => 다시 계산해서 공개키를 만듦
        const isValid = keypair.verify(hash, signature);
        console.log(`서명 유효성 여부`, isValid);
    })
})