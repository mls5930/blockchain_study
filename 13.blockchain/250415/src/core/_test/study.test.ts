import Transaction from "@core/transaction/transaction";
import Unspent from "@core/transaction/unspent";
import elliptic, { SignatureInput } from "elliptic";
import crypto from "crypto"
import { SHA256 } from "crypto-js";
import { TransactionPool, TransactionRow, TxOut } from "@core/interface/transaction.interface";


//Bob이 Alice에게 7코인을 보낸다.
/*
    등장인물

    Bob
    Alice
    miner
*/
const ec = new elliptic.ec("secp256k1");
// 등장인물 주소 선언


describe("블록 생성 시나리오 - 코인베이스부터 트랜잭션 반영까지", () => {
    let transaction: Transaction;
    let unspent: Unspent;
    let privateKey: string;
    let publicKey: string;
    let signature: SignatureInput;
    let bob: string;
    const alice = `0x${"b".repeat(38)}`// 40자리임의의 주소 
    const miner = `0x${"m".repeat(38)}`// 40자리임의의 주소 

    beforeEach(() => { //beforeEach 는 변수만 읽고 메서드를 실행
        transaction = new Transaction();
        unspent = new Unspent();
        // Bob의 키쌍 생성 및 서명
        privateKey = crypto.randomBytes(32).toString("hex")
        const keyPair = ec.keyFromPrivate(privateKey)
        publicKey = keyPair.getPublic().encode("hex", true);

        const hash = SHA256("나 10코인 가지고있다.").toString();
        signature = keyPair.sign(hash, "hex");
        bob = publicKey.slice(26);

        // 밥의 미사용 객체를 시나리오에 맞게끔 10코인을 unspent 즉 미사용 객체에 넣으려고 함.
        const txOuts: TxOut[] = [
            { account: bob, amount: 5 },
            { account: bob, amount: 5 }

        ]
        txOuts.forEach(unspent.create(hash))
    })
    describe("2.단계: 일반 트랜잭션 생성 및 pool 저장", () => {

        it("블록 트랜잭션 생성이 되는지", () => {
            const result = transaction.createCoinbase(miner, 42);
            transaction["transactionPool"].push(result)
            // console.log(result);
            expect(result.txIns[0].txOutIndex).toEqual(43)
            expect(result.hash.length).toEqual(64)
            expect(result.txOuts[0].account.length).toEqual(40)
            expect(result.txOuts[0].amount).toEqual(50)



            //"이후 트랜잭션 생성이 되는지", 
            const exchange = {
                signature,
                amount: 1,
                received: alice,
                sender: { account: bob }
            }
            const bobmouny = unspent.getUTXO(bob)
            const Tx: TransactionRow = transaction.create(exchange, bobmouny)
            // console.log(Tx);
            console.log(transaction.getPool());

            // 3단계 트렌잭션 풀에서 제거 
            const txForBlock = transaction.sync([Tx, result])
            // console.log(txForBlock);
            console.log(transaction.getPool());

            // 4단계 unspent.update()를 통해 잔액 상태 반영
            unspent.update(result)
            unspent.update(Tx)



            // 5. 단계 검증 => 각가의 계정에 잔액이 반영이 되었는가?
            const result1 = unspent["unspentTxOuts"]
            console.log(result1);
            const bobBalance = result1.filter((o) => o.account === bob).reduce((acc, cur) => acc + cur.amount, 0)
            console.log(bobBalance);

            expect(result1.find(o => o.account === miner).amount).toEqual(50);
            expect(bobBalance).toEqual(9);
            expect(result1.find(o => o.account === alice).amount).toEqual(1);
            // 6. 단계 트렌젝션 초기화 되어있는지 확인
            console.log(transaction.getPool());


        })

        // it("트랜잭션 ")
    })


    describe("3.단계: 블록 후보 생성후 채굴 그리고 트랜잭션 반영까지", () => { })












})