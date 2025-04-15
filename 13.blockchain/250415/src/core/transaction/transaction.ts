import { TransactionPool, TransactionRow, TxIn, TxOut, UnspentTxOut } from "@core/interface/transaction.interface";
import { SHA256 } from "crypto-js";
import { SignatureInput } from "elliptic";

class Transaction {
    private readonly REWARD = 50; // 채굴자 보상
    private readonly transactionPool: TransactionPool = []; // 미처리 트랜잭션 풀

    getPool (): TransactionPool {
        return this.transactionPool
    }
    
    createInput(
        myUnspentTxOuts: UnspentTxOut[],
        receiptAmount: number,
        signature: SignatureInput
    ): [TxIn[], number] {
        // 먼저 동전 짤짤이 다 꺼내볼거임 => 목표한, 필요한 만큼
        // 지금까지 꺼낸 UTXO들의 총 누적 값
        // reduce로 값을 계속 더할건데, 위의 매개변수 receiptAmount보다 크거나 같을 때까지 동전을 꺼낼거임
        let targetAmount = 0;
        const txins = myUnspentTxOuts.reduce((acc:TxIn[], UnspentTxOut: UnspentTxOut) => {
            const { amount, txOutId, txOutIndex } = UnspentTxOut;
            // 목표 금액만큼 모았으면 더 이상 꺼낼 필요가 없음
            if (targetAmount >= receiptAmount) return acc;
            // 목표 금액만큼 안모였다면, 미사용 객체의 금액들을 계속 더한다.
            // ?? 0 => 만약 undefined다 => 0으로 취급하고 0을 더하겠다.
            targetAmount += amount ?? 0; 
            acc.push({ txOutIndex, txOutId, signature})
            return acc;
        }, [])
        return [txins, targetAmount];
    }

    createOutInput (
        received: string, // 받는 사람 주소
        amount: number, // 실제 보낼 금액 => 7
        sender: string, // 보내는 사람 주소
        senderAmount: number // 보내는 사람이 실제로 꺼낸 돈 => 10
    ): TxOut[] {
        const txouts: TxOut[] = [];
        // 받을 사람에게 요청한 금액만큼 TxOut을 하나 만들어 배열에 넣음.

        // [{received: "앨리스주소", amount: 7}]
        txouts.push({ account: received, amount});
        // senderAmount: 100 amount: 50 
        if (senderAmount - amount > 0) {
            // 거스름돈 주기
            // {account: Bob, amount: 3}
            txouts.push({account: sender, amount: senderAmount - amount});
        }

       const outAmount = txouts.reduce((acc, cur) => acc + cur.amount, 0);
       // 실제로 혜성님이 꺼낸 금액 100과 거스름돈까지 준거 다시 계산 => 비교
       if(outAmount !== senderAmount) throw new Error("총 금액이 맞지 않음!");
       return txouts;
    }
   
    // 트랜잭션 출력 직렬화
    serializeTxOut(txOut: TxOut): string {
        const { account, amount } = txOut;
        const text = [account, amount].join('');
        return SHA256(text).toString();
    }

    // 트랜잭션 입력 직렬화
    serializeTxIn(txIn: TxIn): string {
        const { txOutIndex } = txIn;
        return SHA256(txOutIndex?.toString() ?? '').toString();
    }

    // 트랜잭션 생성
    create(
        receipt: {
            signature: SignatureInput;
            amount: number;
            received: string;
            sender: { account: string };
        },
        unspentTxOuts: UnspentTxOut[]
    ): TransactionRow {
        if (!receipt.signature) throw new Error('서명이 없습니다.');

        const [txIns, amount] = this.createInput(
            unspentTxOuts,
            receipt.amount,
            receipt.signature
        );

        const txOuts = this.createOutInput(
            receipt.received,
            receipt.amount,
            receipt.sender.account,
            amount
        );

        const transaction: TransactionRow = {
            txIns,
            txOuts,
            hash: '',
        };

        transaction.hash = this.serializeRow(transaction);
        this.transactionPool.push(transaction);

        return transaction;
    }

    // 트랜잭션 데이터 직렬화
    serializeTx<T>(data: T[], callback: (item: T) => string): string {
        return data.reduce((acc: string, item: T) => acc + callback(item), '');
    }

    // 트랜잭션 행 직렬화
    serializeRow(row: TransactionRow): string {
        const { txIns, txOuts } = row;
        const txOutsText = this.serializeTx<TxOut>(txOuts ?? [], (item) =>
        this.serializeTxOut(item)
        );
        const txInsText = this.serializeTx<TxIn>(txIns ?? [], (item) =>
        this.serializeTxIn(item)
        );
        return SHA256(txOutsText + txInsText).toString();
    }

    /*
        1. 코인베이스 트랜잭션 출력값 생성
        2. 코인베이스도 트랜잭션이기 때문에 => 입력값 구조 형태 만들어볼겁니다.
        3. 입력값 + 출력값을 해시하는 메서드
        4. 위의 1,2,3을 조립하여 하나의 메서드 => createCoinbase
    */
    createTxOut(account: string, amount: number): TxOut {
        if (account.length !== 40) throw new Error("지갑 주소가 아닙니다.")
        
        const txOut = new TxOut();
        txOut.account = account;
        txOut.amount = amount;
        return txOut;
    }

    createTxIn(txOutIndex: number, txOutId?: string, signature?: SignatureInput): TxIn {
        const txIn = new TxIn();
        txIn.signature = signature;
        txIn.txOutId = txOutId;
        txIn.txOutIndex = txOutIndex;
        return txIn;
    }

    createRow(txIns: TxIn[], txOuts: TxOut[]): TransactionRow {
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txIns
        transactionRow.txOuts = txOuts
        transactionRow.hash = this.serializeRow(transactionRow);
        return transactionRow;
    }

    createCoinbase(account:string, latestBlockHeight: number): TransactionRow {
        const txIn = this.createTxIn(latestBlockHeight + 1);
        const txOut = this.createTxOut(account, this.REWARD);
        return this.createRow([txIn],[txOut]);
    }

    update(transaction: TransactionRow): void {
        const findCallback = (tx: TransactionRow) => transaction.hash === tx.hash;
        const index = this.transactionPool.findIndex(findCallback);
        if(index !== -1) this.transactionPool.splice(index, 1);
    }
 
    // 트랜잭션 풀 동기화
    sync(transactions: TransactionRow[]): void {
        if(typeof transactions === "string") return;
        transactions.forEach(this.update.bind(this));
    }
}

export default Transaction