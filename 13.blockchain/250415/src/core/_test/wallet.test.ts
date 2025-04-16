<<<<<<< HEAD
// // npm install elliptic @types/elliptic
// import Wallet from "@core/wallet";
// import { randomBytes } from "crypto";
// import { SHA256 } from "crypto-js";
// import elliptic from "elliptic";

// describe("전자 서명 테스트",() => {
//     let privateKey: string;
//     let publicKey: string;
//     let signature: elliptic.ec.Signature

//     const ec = new elliptic.ec('secp256k1');
//     // 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936
//     // d4fcb00d990f4443d349472a946bd042d4f0db17b1306e8fcc545f94a13c6fcb
//     it("1. 개인키 생성", () => {
//         const random = randomBytes(32);
//         privateKey = random.toString("hex");

//         console.log(`개인키 : ${privateKey}`);
        
//         expect(privateKey.length).toBe(64);
//     })

//     // 공개키는 = 개인키 X G
//     it("2. 개인키를 활용하여 공개키 생성", () => {
//         // 키쌍 페어 => 비밀키로 공개키를 파생(생성)
//         const keypair = ec.keyFromPrivate(privateKey);
//         publicKey = keypair.getPublic().encode("hex", true);

//         console.log(`2. 공개키 : ${publicKey}`);
//         expect(publicKey.length).toBe(66);
//     })

//     it("3. 서명 만들기", () => {
//         // 1. 트랜잭션에 포함될 값을 만듦. 그리고 SHA256으로 해시함
//         const txData = "나 엄준식인데 1비트코인 보냈다."
//         const hash = SHA256(txData).toString();

//         // 2. 아까와 똑같이 키쌍 페어(비대칭키) => 공개키를 만듦
//         const keyPair = ec.keyFromPrivate(privateKey);

//         // 3. 서명함. => 개인키 + 트랜잭션 해시
//         signature = keyPair.sign(hash, "hex");
//         console.log(signature);
//     })

//     it("4. 검증 (이 사람이 만든게 맞음?)", () => {
//         const keyPair = ec.keyFromPublic(publicKey, "hex");
//         const txData = "나 엄준식인데 1비트코인 보냈다."
//         const hash = SHA256(txData).toString();

//         const isValid = keyPair.verify(hash, signature);
//         console.log(`서명 유효성 여부:`, isValid);

//         expect(isValid).toBe(true);
//     })

//     // it("파일이 저장되어야 한다.", () => {
//     //     const wallet = new Wallet();
//     //     const filePath = path.join(__dirname, "../data", `0x${wallet.account}`);
//     //     const fileContent = wallet.privateKey;
//     //     fs.writeFileSync(filePath, fileContent);
//     // })
//     it("지갑 생성시 파일이 저장되어야 한다.", () => {
//         const wallet = new Wallet();
//     })

//     it("지갑 목록 불러오기", () => {
//         // 지갑 목록? 어디? => data 폴더에 있는 파일들
//         // 그럼, 해당 기능을 하는 메서드를 구현해야 
//         const list = Wallet.getWalletList();

//         // 1. 얘가 배열인가?
//         expect(Array.isArray(list)).toBe(true);

//         // 2. 하나 이상의 지갑이 포함되어 있어야 함.
//         expect(list.length).toBeGreaterThan(0) // 0보다 큰가?

//         // 3. 실제 파일 존재 여부 확인 => 콘솔로그 찍어보지 뭐
//         console.log(list);
//     })
//     // 오해하지 말 것. 해당 코드를 작성했다고 해서 공개키로 비밀키는 절때 찾을 수 없음
//     it("파일 이름(공개키)로 내용(비밀키) 가져오기", () => {
//         const walletList = Wallet.getWalletList();
//         const walletPrivateKey = Wallet.getWalletPrivateKey(walletList[0]);
//         console.log(walletPrivateKey);
//     })
// })
=======
// npm install elliptic @types/elliptic
import Wallet from "@core/wallet";
import { randomBytes } from "crypto";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

describe("전자 서명 테스트",() => {
    let privateKey: string;
    let publicKey: string;
    let signature: elliptic.ec.Signature

    const ec = new elliptic.ec('secp256k1');
    // 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936
    // d4fcb00d990f4443d349472a946bd042d4f0db17b1306e8fcc545f94a13c6fcb
    it("1. 개인키 생성", () => {
        const random = randomBytes(32);
        privateKey = random.toString("hex");

        console.log(`개인키 : ${privateKey}`);
        
        expect(privateKey.length).toBe(64);
    })

    // 공개키는 = 개인키 X G
    it("2. 개인키를 활용하여 공개키 생성", () => {
        // 키쌍 페어 => 비밀키로 공개키를 파생(생성)
        const keypair = ec.keyFromPrivate(privateKey);
        publicKey = keypair.getPublic().encode("hex", true);

        console.log(`2. 공개키 : ${publicKey}`);
        expect(publicKey.length).toBe(66);
    })

    it("3. 서명 만들기", () => {
        // 1. 트랜잭션에 포함될 값을 만듦. 그리고 SHA256으로 해시함
        const txData = "나 엄준식인데 1비트코인 보냈다."
        const hash = SHA256(txData).toString();

        // 2. 아까와 똑같이 키쌍 페어(비대칭키) => 공개키를 만듦
        const keyPair = ec.keyFromPrivate(privateKey);

        // 3. 서명함. => 개인키 + 트랜잭션 해시
        signature = keyPair.sign(hash, "hex");
        console.log(signature);
    })

    it("4. 검증 (이 사람이 만든게 맞음?)", () => {
        const keyPair = ec.keyFromPublic(publicKey, "hex");
        const txData = "나 엄준식인데 1비트코인 보냈다."
        const hash = SHA256(txData).toString();

        const isValid = keyPair.verify(hash, signature);
        console.log(`서명 유효성 여부:`, isValid);

        expect(isValid).toBe(true);
    })

    // it("파일이 저장되어야 한다.", () => {
    //     const wallet = new Wallet();
    //     const filePath = path.join(__dirname, "../data", `0x${wallet.account}`);
    //     const fileContent = wallet.privateKey;
    //     fs.writeFileSync(filePath, fileContent);
    // })
    it("지갑 생성시 파일이 저장되어야 한다.", () => {
        const wallet = new Wallet();
    })

    it("지갑 목록 불러오기", () => {
        // 지갑 목록? 어디? => data 폴더에 있는 파일들
        // 그럼, 해당 기능을 하는 메서드를 구현해야 
        const list = Wallet.getWalletList();

        // 1. 얘가 배열인가?
        expect(Array.isArray(list)).toBe(true);

        // 2. 하나 이상의 지갑이 포함되어 있어야 함.
        expect(list.length).toBeGreaterThan(0) // 0보다 큰가?

        // 3. 실제 파일 존재 여부 확인 => 콘솔로그 찍어보지 뭐
        console.log(list);
    })
    // 오해하지 말 것. 해당 코드를 작성했다고 해서 공개키로 비밀키는 절때 찾을 수 없음
    it("파일 이름(공개키)로 내용(비밀키) 가져오기", () => {
        const walletList = Wallet.getWalletList();
        const walletPrivateKey = Wallet.getWalletPrivateKey(walletList[0]);
        console.log(walletPrivateKey);
    })
})
>>>>>>> 2ff47a4202a47279629cc64f841cb122d721d9bc
