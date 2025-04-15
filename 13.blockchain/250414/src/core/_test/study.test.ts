import elliptic, { SignatureInput } from "elliptic"
import { Signature } from "typescript";
import crypto from "crypto"
import { SHA256 } from "crypto-js";
import Transaction from "@core/transaction/transaction";
import Unspent from "@core/transaction/unspent";
import { TxOut } from "@core/interface/transaction.interface";



const ec = new elliptic.ec("secp256k1")
let unspent: Unspent;
let transaction: Transaction;
let privateKey: string;
let publicKey: string;
let signature: SignatureInput;

describe("스터디용 테스트", () => {

    unspent = new Unspent();
    transaction = new Transaction();

    const initHash = "init";
    const txOuts: TxOut[] = [
        { account: "Bob", amount: 5 },
        { account: "Bob", amount: 5 },
        // { account: "Bob", amount: 3 } 
        { account: "Charlie", amount: 10 }
    ]
    txOuts.forEach(unspent.create(initHash));


    privateKey = crypto.randomBytes(32).toString()
    const keyPair = ec.keyFromPrivate(privateKey)
    publicKey = keyPair.getPublic().encode("hex", true)

    const txData = "나 황금송아지 있다니께!";
    const hash = SHA256(txData).toString();
    signature = keyPair.sign(hash, "hex");


    it("createInput()메서드를 활용. 밥이 가지고 있는 5 + 5코인을 사용해서 7코인 입력값 작성", () => {
        const myTxIns = unspent.getUTXO("Bob");
        const [TxIns, usedAmount] = transaction.createInput(myTxIns, 7, signature);

        expect(TxIns.length).toBe(2)
        expect(usedAmount).toBe(10)
    })




    it("createOutInput()메서드를 활용. 7코인을 Alice에게, 나머지 3코인을 Bob에게 반환한다.", () => {

    })



    it("트랜잭션 풀에 넣어볼거임!! (transaction.ts의 create메서드 활용)", () => { })



    it("update()를 활용하여 기존 UTXO 제거 및 새 UTXO 등록이 된다", () => { })




    it("getPool: 현재 트랜잭션 풀 반환", () => { })


})