import { SignatureInput } from "elliptic";

export class TxIn {
    txOutId?: string // 이전 트랜잭션의 ID
    txOutIndex: number; // 그 트랜잭션 안에서 몇 번째 출력이었는지
    signature: SignatureInput // 내가 이 입력을 사용할 수 있다는 증거 
}

export class TxOut {
    account: string // 받을 사람
    amount: number // 얼마를 줄 것인가
}

export class TransactionRow {
    txIns: TxIn[]; // 내가 어떤 기록을 남기고 있는지
    txOuts: TxOut[]; // 그걸 누구에게 넘길건지
    hash?: string; // 트랜잭션 식별자
}

// UTXO 구조 => 너 얼마 남았네? 미사용 잔액 추적
export class UnspentTxOut {
    txOutId: string; // 해당 UTXO가 포함된 트랜잭션 해시
    txOutIndex: number; // 해당 UTXO의 트랜잭션 출력 인덱스
    account: string; // UTXO 소유 계정
    amount: number; // 잔액
}

// 트랜잭션 저장소
export type TransactionPool = TransactionRow[];