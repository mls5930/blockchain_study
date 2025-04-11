import { randomBytes } from "crypto";
import { SHA256 } from "crypto-js";
import Transaction from "@core/transaction/transaction";
import { ec as EC } from "elliptic";
import { SignatureInput } from "elliptic";
import { TxIn, TxOut, UnspentTxOut } from "@core/transaction/interface/transaction.interface";

const ec = new EC("secp256k1");

describe("시나리오 기반: 밥이 앨리스에게 7코인을 보낸다 => 거스름돈 분기점", () => {
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

  it("✅ 거스름돈이 생기면, 밥의 계정으로 TxOut이 생성된다", () => {
    const overUnspent: UnspentTxOut[] = [
      { txOutId: "tx001", txOutIndex: 0, account: publicKey.slice(26), amount: 5 },
      { txOutId: "tx002", txOutIndex: 0, account: publicKey.slice(26), amount: 5 },
    ]; // 총 10
  
    const [inputs, amount] = transaction.createInput(overUnspent, 7, signature);
    const outs = transaction.createOutInput("Alice", 7, publicKey.slice(26), amount);
    console.log(outs);
    
    const change = outs.find((o) => o.account === publicKey.slice(26));
    expect(change).toBeDefined();
    expect(change!.amount).toBe(3);
  });
  
  it("❌ 꺼낸 금액과 보낼 금액이 같으면, 거스름돈은 생성되지 않는다", () => {
    const exactUnspent: UnspentTxOut[] = [
      { txOutId: "tx001", txOutIndex: 0, account: publicKey, amount: 3 },
      { txOutId: "tx002", txOutIndex: 0, account: publicKey, amount: 4 },
    ]; // 총 7
  
    const [inputs, amount] = transaction.createInput(exactUnspent, 7, signature);
    const outs = transaction.createOutInput("Alice", 7, publicKey, amount);
  
    const change = outs.find((o) => o.account === publicKey.slice(26));
    expect(change).toBeUndefined();
  });  
});
