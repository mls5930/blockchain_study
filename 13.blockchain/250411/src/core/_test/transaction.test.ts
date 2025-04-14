import elliptic, { SignatureInput } from "elliptic"
import crypto from "crypto"
import { SHA256 } from "crypto-js";
import { TransactionRow, TxIn, TxOut, UnspentTxOut } from "@core/interface/transaction.interface";
import Transaction from "@core/transaction/transaction";
/*
    bob이 Alice 에게 7코인을 보낸다.

    1.밥은 자신의 지갑에서 서명을 통해 트랜잭션을 생성하고,
    2.자신이 가진 동전들(UTXO) 중에서 7코인 이상을 선택해 엘리스에게 전달한다.
    3.트랜잭션은 해시 처리되어서 고유하게 식별되며 트랜잭션 풀에 등록된 후 
    4.블록 생성에 사용될 준비를마친다 => 트랜잭션 저장소(풀)에 등록된다.
*/
const ec = new elliptic.ec("secp256k1")
describe("밥이 엘리스에게 7코인을 보낸다", () => {
    let privateKey: string;
    let publicKey: string;
    let signature: SignatureInput;
    let unspent: UnspentTxOut[]; //밥은 도댜체 얼마를 가지고 있나? 기록들의 모음
    it("1. 밥의 키쌍을 생성살 수 있어야 한다.", () => {
        // 1, 비밀키 생성
        // 2. 비밀키포 파생된 공개키 생성
        privateKey = crypto.randomBytes(32).toString("hex");
        const keypair = ec.keyFromPrivate(privateKey);
        publicKey = keypair.getPublic().encode("hex", true);
    })
    it("2.밥의 서명은 유효한 형식이여야 한다.", () => {
        // 한 번 트랜잭션을 만들어서 서명까지 해보자




        // 검증도 해보고 싶은데 어떻게 해야 할까요?
        const txData2 = "나 밥인데 100비트코인 있다고!"
        const hash2 = SHA256(txData2).toString();
        const keypair2 = ec.keyFromPrivate(publicKey, "hex")




    })

    it("3. 밥이 자신이 서명한 것을 검증함", () => {
        const txData = "나 밥인데 100비트코인 있다고!"
        const hash = SHA256(txData).toString()
        const keypair = ec.keyFromPrivate(privateKey)
        signature = keypair.sign(hash, "hex")
        const isValid = keypair.verify(hash, signature)
        expect(isValid).toBe(true)
    })
    it("4. 밥의 UTXO 목록은 7 이상 총합을 가지고 있어야 한다.", () => {
        // 밥이 가지고 있는 미사용 잔액을 함 봐보자
        // 아래 선언한 배열 객체는 미사용에 대한 임시 값임!!!
        unspent = [
            { txOutId: "tx001", txOutIndex: 0, account: publicKey.slice(26), amount: 3 },
            { txOutId: "tx002", txOutIndex: 0, account: publicKey.slice(26), amount: 4 },
            { txOutId: "tx003", txOutIndex: 0, account: publicKey.slice(26), amount: 3 }

        ];
        // acc = 초기값 0
        // reduce도 결국 순회하는거야. 근데 계속 더하는 것 => acc + 현재값 acc 는 초기 값 0으로 설명 cur.amount: 3
        // 1. acc = 0 cur = { txOutId: "tx001", txOutIndex: 0, account: publicKey.slice(26), amount: 3 },
        // 2. acc + cur.amount = 3
        // 3. acc = 3,  cur  ={ txOutId: "tx002", txOutIndex: 0, account: publicKey.slice(26), amount: 4 }
        // 4. acc + cur.amount = 7 
        // 5. acc = 7 
        // 6. acc + cur =  { txOutId: "tx003", txOutIndex: 0, account: publicKey.slice(26), amount: 10 }
        // 7. acc = 10
        const total = unspent.reduce((acc, cur) => acc + cur.amount, 0);

        expect(total).toEqual(10)
    });

    let txIns: TxIn[];
    let usedAmount: number;
    let targetAmount: number = 7
    const transaction = new Transaction();
    // 밥이 Alice한테 7코인을 보내려고 10코인을 꺼내고 거스름돈 받는 상황
    it("5. createInput()으로 필요한 UTXO를 꺼내서 TxIn 을 만든다", () => {
        // 4단계에서 unspent 를 봐야함!!
        const [inputs, amount] = transaction.createInput(unspent, targetAmount, signature);
        txIns = inputs;
        usedAmount = amount;

        expect(txIns.length).toBeGreaterThanOrEqual(2);
        expect(usedAmount).toBeGreaterThanOrEqual(targetAmount);
    })
    let txOuts: TxOut[];
    const transactionPool: TransactionRow[] = [];
    it("6. createOutInput()으로 Alice에게 7 코인을 보낸다", () => {
        txOuts = transaction.createOutInput("aliceAddress", 7, publicKey.slice(26), 10)
        expect(txOuts.find((o) => o.account === "aliceAddress")?.amount).toBe(7)
        // 위의 테스트가 끝났다면, 하나의 트랜잭션이 만들어진것과 다름이 없음
        // 단! 전체를 더한 hash값을 구해야 하겠지.
        transactionPool.push({ txIns, txOuts })
        // 위의 hash만 귀해서 넣으면 끝임
        // 그건 문서 13번 ~16번을 보면 됌
        console.log(JSON.stringify(transactionPool, null, 2));

    })

});





