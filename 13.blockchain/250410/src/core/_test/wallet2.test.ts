import crypro from "crypto"
import Wallet from "@core/wallet"
import { access } from "fs";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";
import fs from "fs"
import path from "path"

describe("지갑테스트", () => {
    let privateKey: string;
    let publicKey: string;
    let signature: elliptic.ec.Signature
    let account: string;
    let balance: number;

    const ec = new elliptic.ec("secp256k1")

    it("1. 개인 키 생성", () => {
        privateKey = crypro.randomBytes(32).toString("hex");
        console.log(privateKey);
        expect(privateKey.length).toBe(64)
    })

    it("2. publickey 생성 및 검증", () => {
        const keypair = ec.keyFromPrivate(privateKey)
        publicKey = keypair.getPublic().encode("hex", true)
        expect(publicKey.length).toBe(66)
    })

    it("3.서명키 작성 및 검증 ", () => {
        const data = "나 김두한 이다."
        const data2 = "나 시라소니다."
        const hash = SHA256(data).toString()
        const hash2 = SHA256(data2).toString()
        const keyPair = ec.keyFromPrivate(privateKey)
        signature = keyPair.sign(hash, "hex")
        // console.log(signature);

        // privatekey 로 가져온 publick Key값 
        const publicKeypair = ec.keyFromPublic(publicKey, "hex")

        const isValid = publicKeypair.verify(hash, signature)
        const falseisValid = publicKeypair.verify(hash2, signature)

        expect(isValid).toBe(true)
        // 다른 hash 값을 넣은 검증값 
        expect(falseisValid).toBe(false)
    })
    // it("4. 실행시 값이 잘나오는지 확인, " , () => {
    //     const wallet = new Wallet()

    //     expect(wallet.privateKey.length).toBe(64)
    //     expect(wallet.publicKey.length).toBe(66)
    //     expect(wallet.account.length).toBe(40)
    //     expect(wallet.balance).toBe(0)
    // })

    // it("5. 생성된 주소의 개인키 불러오기", () => {
    //     const wallet = new Wallet()
    //     console.log(wallet.privateKey);
    //     console.log(wallet.account);
    //     const filepath = path.join(__dirname, "../data", `0x${wallet.account}`);
    //     expect(wallet.privateKey).toEqual(fs.readFileSync(filepath, "utf-8"))
    // })
    it("6. privateKey를 넣으면 파일의 privatKey와 같은지 검증", () => {
        //8ab427151f09e3d0b118330e6b31b19ae3caeff4456c0d83517a62539745e2ad 기존에 만든 privateKey
        const wallet = new Wallet("8ab427151f09e3d0b118330e6b31b19ae3caeff4456c0d83517a62539745e2ad")
        const filepath = path.join(__dirname, "../data", `0x${wallet.account}`);
        console.log(wallet.privateKey);
        console.log(wallet.account);
        expect(wallet.privateKey).toEqual(fs.readFileSync(filepath, "utf-8"))

    })






})