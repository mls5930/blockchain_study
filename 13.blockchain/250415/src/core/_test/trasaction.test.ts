import Transaction from "@core/transaction/transaction";
import Unspent from "@core/transaction/unspent";
import elliptic, { SignatureInput } from "elliptic";
import crypto from "crypto";
import { SHA256 } from "crypto-js";
import { TxOut } from "@core/interface/transaction.interface";
import { resourceUsage } from "process";
// Bob이 Alice에게 7코인을 보낸다

/*
    등장인물

    Bob
    Alice
    miner
*/

const ec = new elliptic.ec("secp256k1");

describe("블록 생성 시나리오 - 코인베이스부터 트랜잭션 반영까지", () => {
    let transaction : Transaction;
    let unspent: Unspent;
    let privateKey: string;
    let publicKey: string;
    let signature: SignatureInput;
    // 등장인물 주소 선언
    let bob: string;
    const alice = `0x${"b".repeat(38)}`// 40자리 임의의 주소
    const miner = `0x${"m".repeat(38)}`// 40자리 임의의 주소

    beforeEach(()=> {
        transaction = new Transaction();
        unspent = new Unspent();

        // Bob의 키쌍 생성 및 서명
        privateKey = crypto.randomBytes(32).toString("hex");
        const keyPair = ec.keyFromPrivate(privateKey);
        publicKey = keyPair.getPublic().encode("hex", true);

        const hash = SHA256("나 10코인 가지고있다.").toString();
        signature = keyPair.sign(hash, "hex");
        bob = publicKey.slice(26);
        // 밥의 미사용 객체를 시나리오에 맞게끔 10코인을 unspent 즉 미사용 객체에 넣으려고 함.
        const txOuts: TxOut[] = [
            { account: bob, amount: 5},
            { account: bob, amount: 5}
        ]
        txOuts.forEach(unspent.create(hash));
    })

    describe("1단계: 코인베이스 트랜잭션 생성", () => {
        it("채굴자 계정으로 50코인 보상 트랜잭션 생성", () => {
            // 최신 블록의 순번을 42로 가정함
            const coinbaseTx = transaction.createCoinbase(miner, 42);
            expect(coinbaseTx.txOuts[0].account).toEqual(miner);
            expect(coinbaseTx.txIns[0].txOutId).toBeUndefined();
            expect(coinbaseTx.txIns[0].txOutIndex).toEqual(43);
        })
    })

    describe("2단계: 일반 트랜잭션 생성 및 pool 저장", ()=> {
        it("Bob이 Alice에게 7코인을 보내는 트랜잭션 생성", () => {
            const reciept = {
                sender: { account: bob },
                amount: 7,
                signature,
                received: alice
            }
            const myUnspentTxOuts = unspent.getUTXO(bob);
            const tx = transaction.create(reciept, myUnspentTxOuts)
            const pool = transaction.getPool();
            console.log(JSON.stringify(pool, null, 2));
            expect(tx.txOuts.find(o => o.account === alice)?.amount).toEqual(7);
        })
    })

    describe("3단계: 블록 후보 생성 후 채굴, 그리고 트랜잭션 반영까지", ()=> {
        // 블록 후보 만들고 채굴되는 과정 => 코인베이스 트랜잭션부터 UTXO unspent 까지 생명주기 
        it("트랜잭션 생명주기", () => {
            // 아래 단계는 코인베이스 설정 및 일반적인 트랜잭션 생성 후 트랜잭션 대기풀에 넣었다.
            
            // 1단계 코인베이스 트랜잭션을 트랜잭션 풀에 넣는다.
            const coinbaseTx = transaction.createCoinbase(miner, 43);
            transaction["transactionPool"].push(coinbaseTx);

            // 2단계 일반적인 트랜잭션(bob => alice 7코인)에 대한 생성 그리고 pool에 push
            const receipt = {
                sender: { account: bob},
                received: alice,
                amount: 7,
                signature
            }
            const myUnspentTxOuts = unspent.getUTXO(bob);
            
            const tx = transaction.create(receipt, myUnspentTxOuts);

            // 그 이후 블록이 채굴되었다면?

            // 3단계 트랜잭션 풀에서 제거한다.
            const txsForBlock = [coinbaseTx, tx];
            transaction.sync(txsForBlock);

            // 4단계 unspent.update()를 통해 잔액 상태 반영
            txsForBlock.forEach(tx => unspent.update(tx));


            // 5단계 검증 => 각각의 계정에 잔액이 반영이 되었는가?
            const result = unspent["unspentTxOuts"];
            expect(result.find(o => o.account === miner).amount).toEqual(50);
            expect(result.find(o => o.account === alice).amount).toEqual(7);
            expect(result.find(o => o.account === bob).amount).toEqual(3);
        })
    })
})