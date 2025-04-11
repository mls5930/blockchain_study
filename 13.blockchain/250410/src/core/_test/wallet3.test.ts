import Wallet from "@core/wallet";
import { randomBytes, sign } from "crypto";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

describe("Wallet Test", () => {
  let privateKey: string;
  let publicKey: string;
  let signature: elliptic.ec.Signature;

  const ec = new elliptic.ec("secp256k1");

  it("비밀키 생성", () => {
    const random = randomBytes(32);
    privateKey = random.toString("hex"); // 비밀키 생성
    // 비밀키 길이 64
    expect(privateKey.length).toBe(64);
  });

  it("공개키 생성", () => {
    const keyPair = ec.keyFromPrivate(privateKey);
    publicKey = keyPair.getPublic().encode("hex", true); // 공개키 생성
    // 공개키 길이 66
    expect(publicKey.length).toBe(66);
  });

  it("사인 및 검증", () => {
    const txData = "나도 시켜줘 부자"; // 트랜잭션 데이터
    const hash = SHA256(txData).toString(); // 데이터 hash
    const keyPair = ec.keyFromPrivate(privateKey); // keyPair 생성
    signature = keyPair.sign(hash, "hex"); // sign

    // 검증 통과
    const verified = keyPair.verify(hash, signature); // 검증
    expect(verified).toBe(true);

    // 데이터 변조 => 검증 실패
    const anotherHash = SHA256("변조 데이터").toString(); // 데이터 변조
    const invalidVerify = keyPair.verify(anotherHash, signature);
    expect(invalidVerify).toBe(false);

    // signature 변조 => 변조된 공개키 넣음 => 검증 실패
    const anotherKeyPair = ec.keyFromPrivate(
      "5e59ac326d507d1955fe2313485105f1d03a6cd83b92c996726e3de937e7d54b"
    );
    signature = anotherKeyPair.sign(hash, "hex");
    const invalidVerify2 = keyPair.verify(hash, signature);
    expect(invalidVerify2).toBe(false);
  });

  it("Wallet 생성", () => {
    const wallet = new Wallet(); // Wallet 생성

    // 개인키 64
    expect(privateKey.length).toBe(64);
    // 공개키 66
    expect(publicKey.length).toBe(66);
    // 주소 40
    expect(wallet.account.length).toBe(40);
  });
});
