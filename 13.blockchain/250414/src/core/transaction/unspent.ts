import { TransactionRow, TxIn, TxOut, UnspentTxOut, UnspentTxPool } from "@core/interface/transaction.interface";

class Unspent {
    private readonly unspentTxOuts: UnspentTxPool = [];

    /*
        const txOuts = [
            { account: "Bob", amount: 3 },
            { account: "Alice", amount: 7 },
        ]
    */

    getUnspentTxOuts(): UnspentTxPool {
        return this.unspentTxOuts;
    }

    create(hash: string) {
        return (txOut: TxOut, txOutIndex: number) => {
            const { account, amount } = txOut;

            this.unspentTxOuts.push({
                txOutId: hash,
                txOutIndex,
                account,
                amount
            })
        }
    }

    delete(txin: TxIn) {
        // 사용했던 트랜잭션 Id와 순번 가져옴.
        // 밥이 Alice한테 7코인 보냈던 해당 트랜잭션
        const { txOutIndex, txOutId } = txin

        const index = this.unspentTxOuts.findIndex((unspentTxOut: UnspentTxOut) => {
            return (
                unspentTxOut.txOutId === txOutId &&
                unspentTxOut.txOutIndex === txOutIndex
            )
        })

        // 사용한 UTXO 객체를 제거
        if (index !== -1) this.unspentTxOuts.splice(index, 1);
    }

    update(transaction: TransactionRow) {
        const { txIns, txOuts, hash } = transaction;

        if (!hash) throw new Error("hash 정상적이지 않고 없다!");
        // [{3}]
        txOuts.forEach(this.create(hash));
        // 7 => [{3}, {4}]
        txIns.forEach(this.delete.bind(this));
    }

    // 특정 주소의 정보를 받아서 미사용 배열 객체 정보를 반환하는 메서드
    getUTXO(account: string): UnspentTxOut[] {
        const myUnspentTxOuts = this.unspentTxOuts.filter((utxo) => utxo.account === account);
        return myUnspentTxOuts;
    }

    //myUnspentTxouts인데....잔액들"만"의 총 합을 반환하는 메서드도 있으면 좋음.
    getAmount(myUnspentTxOuts: UnspentTxOut[]): number {
        return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0);
    }

    // 위의 두 메서드를 조립해서 내가 가지고 있는 미사용 잔액들의 총합이 보내고자 하는 금액보다 충분한지 검증
    isAmount(account: string, sendAmount: number): boolean {
        const myUnspentTxOuts = this.getUTXO(account);
        const totalAmount = this.getAmount(myUnspentTxOuts);

        if (totalAmount >= sendAmount) return true;
        return false;
    }


}

export default Unspent;