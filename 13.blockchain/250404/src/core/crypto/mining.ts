import crypto from "crypto";
import CryptoModule from "./crypto.module";

function mine(difficulty: number, base: string) {
  let nonce = 0;
  let hash = "";
  let binary = "";

  while (true) {
    const data = base + nonce;
    hash = crypto.createHash("sha256").update(data).digest("hex");

    // 여기서 해시를 2진수로 바꿔야 난이도 비교가 정확해짐
    // 블록 헤더를 해시값으로 만든 값을 크립토 모듈로 2진수로 바꾸어 놓음.
    binary = CryptoModule.hashToBinary(hash);

    if (binary.startsWith("0".repeat(difficulty))) {
      console.log(`🎉 성공! nonce: ${nonce}`);
      console.log(`📦 hash: ${hash}`);
      console.log(`🔢 binary: ${binary}`);
      break;
    }
    nonce++;
  }
}

// 테스트
mine(20, "hello");
