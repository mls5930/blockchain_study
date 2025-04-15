import {
    TransactionRow,
    TxIn,
    TxOut,
  } from "@core/interface/transaction.interface";
  import Unspent from "@core/transaction/unspent";
  import crypto from "crypto";
  import { SHA256 } from "crypto-js";
  import elliptic, { SignatureInput } from "elliptic";
  
  const ec = new elliptic.ec("secp256k1");
  
  describe("unspent.ts, 블록 확정 후 잔액 상태(UTXO) 관리", () => {
    let unspent: Unspent;
    let initHash: string;
    let privateKey: string;
    let publicKey: string;
    let signature: SignatureInput;
  
    //   beforEach : TEST 실행 전 초기화 코드, 반복되는 설정/초기화 코드 줄임
    beforeEach(() => {
      unspent = new Unspent();
      initHash = "qwer1234";
  
      const txOuts: TxOut[] = [
        { account: "Bob", amount: 5 },
        { account: "Bob", amount: 1 },
        { account: "Bob", amount: 3 },
        { account: "Charlie", amount: 10 },
      ];
      txOuts.forEach(unspent.create(initHash)); //초기 등록
  
      // Bob key pair 생성
      privateKey = crypto.randomBytes(32).toString("hex");
      const keyPair = ec.keyFromPrivate(privateKey);
      publicKey = keyPair.getPublic().encode("hex", true);
  
      // keyPair로 signature 생성
      const txData = "블록체인은 아름다운 것 같아요";
      const hash = SHA256(txData).toString();
      signature = keyPair.sign(hash, "hex");
    });
  
    it("1. 미사용 객체 create(), 새로운 잔액(TxOut) UTXO 목록에 등록", () => {
      const result = unspent["unspentTxOuts"];
  
      //  길이 4
      expect(result.length).toBe(4);
      // txOutId, txOutIndex, account, amount 값 확인
      expect(result[3]).toMatchObject({
        txOutId: "qwer1234",
        txOutIndex: 3,
        account: "Charlie",
        amount: 10,
      });
    });
  
    it("2. getUTXO(), 특정 계정의 미사용 잔액(UTXO)", () => {
      const bobUTXO = unspent.getUTXO("Bob"); // Bob의 UTXO
  
      //  길이 3
      expect(bobUTXO.length).toBe(3);
      // account = Bob
      for (let i = 0; i < bobUTXO.length; i++) {
        expect(bobUTXO[i].account).toEqual("Bob");
        expect(bobUTXO[i].amount).not.toBeUndefined();
      }
    });
  
    it("3. getAmount(), 미사용 잔액(UTXO) 총합", () => {
      const bobUTXO = unspent.getUTXO("Bob"); // Bob의 UTXO
      const total = unspent.getAmount(bobUTXO); // Bob의 UTXO 총합
  
      // 총합 9
      expect(total).toBe(9);
    });
  
    it("4. isAmount(), 갖고 있는 잔액이 보낼 돈보다 충분한지 확인 (getUTXO + getAmount)", () => {
      // 잔액 충분 => true
      expect(unspent.isAmount("Bob", 7)).toBe(true);
      // 잔액 부족 => false
      expect(unspent.isAmount("Bob", 12)).toBe(false);
    });
  
    it("5. delete(), 새로운 잔액(TxIn) UTXO 목록에서 제거", () => {
      const txIn: TxIn = {
        txOutId: initHash,
        txOutIndex: 0,
        signature,
      }; // txOutIndex:0 제거
  
      unspent.delete(txIn);
      const result = unspent["unspentTxOuts"];
  
      // 길이 3
      expect(result.length).toBe(3);
    });
  
    it("6. update(), 새 잔액 등록 후 사용한 잔액 제거 (create + delete)", () => {
      const transaction: TransactionRow = {
        // 과거 받았던 잔액
        txIns: [
          { txOutId: initHash, txOutIndex: 0, signature },
          { txOutId: initHash, txOutIndex: 1, signature },
          { txOutId: initHash, txOutIndex: 2, signature },
        ],
        // 누구에게 얼마 줄 지
        txOuts: [
          { account: "Alice", amount: 7 }, // Alice한테 7 주고
          { account: "Bob", amount: 2 }, // Bob 거스름돈 2
        ],
        hash: "tx01",
      };
  
      unspent.update(transaction);
      const result = unspent["unspentTxOuts"];
  
      // 길이 4 - 3 + 2 = 3
      expect(result.length).toBe(3);
    });
  });
  