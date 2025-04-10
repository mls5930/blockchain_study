import { randomBytes } from "crypto";
import { SHA256 } from "crypto-js";
import Transaction from "@core/transaction/transaction";
import { ec as EC } from "elliptic";
import { SignatureInput } from "elliptic";
import { TxIn, TxOut, UnspentTxOut } from "@core/transaction/interface/transaction.interface";

const ec = new EC("secp256k1");

describe("시나리오 기반: 밥이 앨리스에게 7코인을 보낸다", () => {
  const transaction = new Transaction();

  let privateKey: string;
  let publicKey: string;
  let signature: SignatureInput;
  let unspent: UnspentTxOut[];

  const targetAmount = 7;
  const recipient = "Alice";

  // 1. 지갑 키쌍 생성
  it("1. 밥의 키쌍을 생성할 수 있어야 한다", () => {
    privateKey = randomBytes(32).toString("hex");
    expect(privateKey.length).toBe(64);

    const keyPair = ec.keyFromPrivate(privateKey);
    publicKey = keyPair.getPublic().encode("hex", true);
    expect(publicKey.length).toBe(66);
  });

  // 2. 서명 생성
  it("2. 밥의 서명은 유효한 형식이어야 한다", () => {
    const txData = "트랜잭션 준비중";
    const hash = SHA256(txData).toString();

    const keyPair = ec.keyFromPrivate(privateKey);
    signature = keyPair.sign(hash, "hex");

    expect(typeof signature.r).toBe("object");
    expect(signature).toHaveProperty("s");
  });

  // 3. 밥의 잔액은 충분해야 한다
  it("3. 밥의 UTXO 목록은 7 이상 총합을 가지고 있어야 한다", () => {
    unspent = [
      { txOutId: "tx001", txOutIndex: 0, account: publicKey, amount: 3 },
      { txOutId: "tx002", txOutIndex: 0, account: publicKey, amount: 4 },
      { txOutId: "tx003", txOutIndex: 0, account: publicKey, amount: 3 },
    ];
    const total = unspent.reduce((acc, cur) => acc + cur.amount, 0);
    expect(total).toBeGreaterThanOrEqual(7);
  });

  // 4. createInput으로 필요한 입력을 구성한다
  let txIns: TxIn[];
  let usedAmount: number;

  it("4. createInput()으로 필요한 UTXO를 꺼내서 TxIn을 만든다", () => {
    
    const [inputs, amount] = transaction.createInput(unspent, targetAmount, signature);
    txIns = inputs;
    usedAmount = amount;

    expect(txIns.length).toBeGreaterThanOrEqual(2);
    expect(usedAmount).toBeGreaterThanOrEqual(targetAmount);
  });

  // 5. 출력 TxOut을 만든다 (Alice에게 7코인)
  let txOuts: TxOut[];

  it("5. createOutInput()으로 Alice에게 7코인을 보낸다", () => {
    txOuts = transaction.createOutInput(recipient, targetAmount, publicKey, usedAmount);
    expect(txOuts.find((o) => o.account === recipient)?.amount).toBe(7);
  });

  // 6. 거스름돈도 TxOut으로 생성되어야 한다
  // 당연히, 6단계 이전에, 거스를 돈이 아예 없으니까 에러가 나야 하는 상황이 맞음.
  it("6. 거스름돈은 밥에게 다시 TxOut으로 생성된다", () => {
    const change = txOuts.find((o) => o.account === publicKey.slice(26));
    expect(change).toBeDefined();
    expect(change!.amount).toBe(usedAmount - targetAmount);
  });

  // 7. 입력금액과 출력금액은 항상 같아야 한다
  it("7. 입력 총액과 출력 총액은 정확히 일치해야 한다", () => {
    const outSum = txOuts.reduce((acc, cur) => acc + cur.amount, 0);
    expect(outSum).toBe(usedAmount);
  });

  // 8. 직렬화해서 트랜잭션 해시를 생성할 수 있다
  let hash: string;

  it("8. serializeRow()로 해시 생성이 가능해야 한다", () => {
    const row = { txIns, txOuts, hash: "" };
    hash = transaction.serializeRow(row);
    expect(hash.length).toBe(64);
  });

  // 9. 최종 트랜잭션을 create()로 생성할 수 있다
  let finalTx: ReturnType<typeof transaction["create"]>;

  it("9. create() 함수로 최종 트랜잭션을 만들 수 있다", () => {
    finalTx = transaction.create(
      {
        signature,
        amount: targetAmount,
        received: recipient,
        sender: { account: publicKey },
      },
      unspent
    );

    expect(finalTx.hash.length).toBe(64);
    expect(finalTx.txIns.length).toBeGreaterThanOrEqual(1);
    expect(finalTx.txOuts.length).toBeGreaterThanOrEqual(1);
  });

  // 10. 트랜잭션 풀에 트랜잭션이 등록되었는지 확인
  it("10. 트랜잭션 풀에 트랜잭션이 등록되었는지 확인", () => {
    // create() 안에서 push 되었는지 확인
    const pool = (transaction as any).transactionPool;
    const exists = pool.find((tx: any) => tx.hash === finalTx.hash);
    expect(exists).toBeDefined();
  });
});
