import { TransactionRow, TxOut } from "@core/interface/transaction.interface";
import Transaction from "@core/transaction/transaction";
import Unspent from "@core/transaction/unspent"
import elliptic, { SignatureInput } from "elliptic";
import crypto from "crypto"
import { SHA256 } from "crypto-js";

const ec = new elliptic.ec("secp256k1");

describe("Transaction 클래스를 통한 트랜잭션 생성 흐름 TDD", () => {
    let unspent: Unspent;
    let transaction: Transaction;
    let privateKey: string;
    let publicKey: string;
    let signature: SignatureInput;

    beforeEach(() => {
        // 초기화
        unspent = new Unspent();
        transaction = new Transaction();

        // 초기 잔액 등록 (Bob);
        // 아래의 코드는, 이전 블록이 추가되었다고 가정하고,
        // 이전 블록이 추가될 시점에서 Bob과 찰리의 미사용 조각들을 등록했다고 가정하는 것.
        const initHash = "init";
        const txOuts: TxOut[] = [
            { account: "Bob", amount: 5 },
            { account: "Bob", amount: 5 },
            // { account: "Bob", amount: 3 } 
            { account: "Charlie", amount: 10 }
        ]
        txOuts.forEach(unspent.create(initHash));

        // Bob의 키쌍 생성을 먼저 합니다.

        privateKey = crypto.randomBytes(32).toString("hex");
        const keyPair = ec.keyFromPrivate(privateKey)
        publicKey = keyPair.getPublic().encode("hex", true);

        // 생성한 키쌍으로 임시 사인을 한다

        const txData = "나 황금송아지 있다니께!";
        const hash = SHA256(txData).toString();
        signature = keyPair.sign(hash, "hex");
    })

    it("createInput()메서드를 활용. 밥이 가지고 있는 5 + 5코인을 사용해서 7코인 입력값 작성", () => {
        // 밥이라는 주소의 전체 미사용 정보들을 가져옴
        const myUnspentTxOut = unspent.getUTXO("Bob");
        const [txIns, usedAmount] = transaction.createInput(myUnspentTxOut, 7, signature);

        expect(txIns.length).toEqual(2);
        expect(usedAmount).toEqual(10);
    })

    it("createOutInput()메서드를 활용. 7코인을 Alice에게, 나머지 3코인을 Bob에게 반환한다.", () => {
        const txOuts = transaction.createOutInput("Alice", 7, "Bob", 10);

        expect(txOuts.length).toEqual(2);
        expect(txOuts.find((o) => o.account === "Alice")?.amount).toEqual(7);
        expect(txOuts.find((o) => o.account === "Bob")?.amount).toEqual(3);
    })

    it("트랜잭션 풀에 넣어볼거임!! (transaction.ts의 create메서드 활용)", () => {
        const reciept = {
            signature,
            amount: 7,
            received: "Alice",
            sender: { account: "Bob" }
        }

        const myUnspentTxOut = unspent.getUTXO("Bob");

        const tx: TransactionRow = transaction.create(reciept, myUnspentTxOut)

        /*
            tx = {
                txIns[],
                txOuts[],
                hash
            }
        */

        expect(tx.hash.length).toEqual(64);
    })

    it("update()를 활용하여 기존 UTXO 제거 및 새 UTXO 등록이 된다", () => {
        const reciept = {
            signature,
            amount: 7,
            received: "Alice",
            sender: { account: "Bob" }
        }

        const myUnspentTxOut = unspent.getUTXO("Bob");

        const tx: TransactionRow = transaction.create(reciept, myUnspentTxOut)

        unspent.update(tx);
        const result = unspent["unspentTxOuts"];

        console.log(result);
    })

    it("getPool: 현재 트랜잭션 풀 반환", () => {
        const reciept = {
            signature,
            amount: 7,
            received: "Alice",
            sender: { account: "Bob" }
        }

        const myUnspentTxOut = unspent.getUTXO("Bob");

        const tx: TransactionRow = transaction.create(reciept, myUnspentTxOut)

        console.log(JSON.stringify(transaction.getPool(), null, 2));
    })

    it("update(): 블록에 포함된 트랜잭션 1건 제거", () => {
        const reciept = {
            signature,
            amount: 7,
            received: "Alice",
            sender: { account: "Bob" }
        }
        const myUnspentTxOut = unspent.getUTXO("Bob");

        const tx: TransactionRow = transaction.create(reciept, myUnspentTxOut)

        transaction.update(tx);

        console.log(JSON.stringify(transaction.getPool(), null, 2));

    })

    it("sync() 메서드 활용. 여러 트랜잭션을 한 번에 제거", () => {
        const reciept = {
            signature,
            amount: 7,
            received: "Alice",
            sender: { account: "Bob" }
        }

        const myUnspentTxOut = unspent.getUTXO("Bob");
        const tx1: TransactionRow = transaction.create(reciept, myUnspentTxOut)

        const reciept2 = {
            signature,
            amount: 2,
            received: "Charlie",
            sender: { account: "Bob" }
        }

        const tx2: TransactionRow = transaction.create(reciept2, myUnspentTxOut)
        transaction.sync([tx1, tx2]);
        console.log(JSON.stringify(transaction.getPool(), null, 2));
    })
})

// 1. KeyPair 생성 (지갑 생성)
//    ↓
// 2. 트랜잭션 생성
//    ↓
// 3. 트랜잭션에 서명 (signature)
//    ↓
// 4. 트랜잭션 풀(Transaction Pool)에 추가
//    ↓
// 5. 블록 후보 생성 (Pending Block)
//    ↓
// 6. 블록에 트랜잭션들 포함
//    ↓
// 7. 블록 생성 → 체인에 추가