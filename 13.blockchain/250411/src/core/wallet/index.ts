import { Accounts } from "@core/interface/wallet.interface";
import { randomBytes } from "crypto";
import elliptic from "elliptic";
import fs from "fs";
import path from "path";

const ec = new elliptic.ec("secp256k1");

class Wallet implements Accounts {
    privateKey: string;
    publicKey: string;
    account: string;
    balance: number;
    constructor(privateKey: string = "") {        
        this.privateKey = privateKey || this.getPrivateKey();
        this.publicKey = this.getPublicKey();
        this.account = this.getAccount();
        this.balance = 0;

        if(privateKey === "") {
            Wallet.createWallet(this);
        }
    }

    getPrivateKey(): string {
        return randomBytes(32).toString("hex");
    }

    getPublicKey(): string {
        const keyPair = ec.keyFromPrivate(this.privateKey);
        return keyPair.getPublic().encode("hex", true);
    }
    
    getAccount():string {
        // 공개키에서 뒷 부분 40자리만 잘라 주소로 사용
        return `${this.publicKey.slice(26)}`;
    }
    
    static createWallet(myWallet: Wallet) : void {
        // 경로부터 한 번 미리 지정해보자
        // __dirname/data/0x12314124124124124124124124.txt
        // 제목: 주소, 내용: 비밀키
        const filePath = path.join(__dirname, "../data", `0x${myWallet.account}`);
        const fileContent = myWallet.privateKey;
        fs.writeFileSync(filePath, fileContent)
    }

    static getWalletList (): string[] {
        // 우리가 저장한 지갑 파일들을 읽어서 리스트를 가져오자
        const filepath = path.join(__dirname, "../data");
        return fs.readdirSync(filepath);
    }

    static getWalletPrivateKey(account: string): string {
        const filepath = path.join(__dirname, "../data", account);
        const fileContent = fs.readFileSync(filepath);
        return fileContent.toString();
    }
}

export default Wallet;