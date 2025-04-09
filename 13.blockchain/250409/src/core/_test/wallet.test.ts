// npm install elliptic @types/elliptic
import { randomBytes } from "crypto"
import { SHA256 } from "crypto-js";
import elliptic, { ec } from "elliptic"
import path from "path";
import fs from "fs"
import Wallet from "@core/wallet";

describe("전자 서명 테스트", () => {
    let privateKey: string;
    let publicKey: string
    let signature: elliptic.ec.Signature
    const ec = new elliptic.ec('secp256k1')


    // 개인키 :d303057324e12d4714d78182d70244d1b3a161ecb88af078ee862593dacc6e7e
    it("1. 개인키 생성", () => {
        const random = randomBytes(32);
        privateKey = random.toString("hex");
        console.log(`개인키 :${privateKey}`);

        expect(privateKey.length).toBe(64);
    })



    it("2. 개인키를 활용하여 공캐키 생성", () => {
        const keypair = ec.keyFromPrivate(privateKey);
        publicKey = keypair.getPublic().encode("hex", true);

        console.log(`2. 공개키 : ${publicKey}`);
        expect(publicKey.length).toBe(66)

    })

    it("3. 서명 만들기", () => {
        // 1. 트랜잭션에 포함될 값을 만듦 SHA256으로 해시함
        const txData = "나 엄준식인데 1비트코인 보냈다."
        const hash = SHA256(txData).toString();
        // 2. 아까와 똑같이 키쌍 페어(비대칭키) => 공개키를 만듦
        const keypair = ec.keyFromPrivate(privateKey)
        // 3. 서명함 => 개인키 + 트랜잭션 해시
        signature = keypair.sign(hash, "hex")
        console.log(signature);

    })

    it("4. 검증 (이 사람이 만든게 맞음?)", () => {
        const keypair = ec.keyFromPublic(publicKey, "hex")
        const txData = "나 엄준식인데 1비트코인 보냈다."
        const hash = SHA256(txData).toString();

        const isValid = keypair.verify(hash, signature);
        console.log(`서명 유효성 여부`, isValid);

        expect(isValid).toBe(true);

    })

    // it("새 Wallte 생성 시 파일이 저장되어야 한다.", () => {
    //     const wallet = new Wallet();
    //     const filePath = path.join(__dirname, "../data", `0X${wallet.account}`);
    //     const fileContent = wallet.privateKey;
    //     fs.writeFileSync(filePath, fileContent)

    // })
    it("지갑 생성 시 파일이 저장되어야 한다.", () => {
        const wallet = new Wallet();
    })

    it("지갑 목록 불러 오기", () => {
        // 지갑 목록? 어디? => data 폴더에 있는 파일들
        // 그럼, 해당 기능을 하는 메서드를 구현해야 함
        const list = Wallet.getWalletList();
        // 1. 이녀석 배열인가?
        expect(Array.isArray(list)).toBe(true)

        // 2. 하나 이상의 지갑이 포함되어 있어야 함
        expect(list.length).toBeGreaterThan(0) //0보다 큰가?

        // 3. 실제 파일 존재 여부 확인 => 콘솔로그 찍어보지 뭐
        console.log(list);

    })
    // 오해하지 말 것. 해당 코드를 작성했다고 해서 공개키로 비밀키는 절때 찾을 수 없음
    it("파일 이름(공개키)로 내용(비밀키) 가져오기", () => {
        const walletList = Wallet.getWalletList();
        const walletPrivateKey = Wallet.getWalletPrivateKey(walletList[0])

        console.log(walletPrivateKey);

    })
})

// 공개키는 = 개인키 X G 
// 비밀키는 한번만 발행 다시 발행시 그건 내가아니라 다른사람으로 인식함