import CrytoModule from "@core/crypto/crypto.module"
import Crypto from "crypto"
const mine = (difficulty: number, base: string) => {
    let nonce: number = 0;
    let hash: string = "";
    let binary: string = "";
    while (true) {
        nonce++
        const data = base + nonce;
        hash = Crypto.createHash("SHA256").update(data).digest("hex");
        binary = CrytoModule.hashToBinary(hash);
        // 바이너리가 앞에서부터 "difficulty" 만큼 0이 나오는가?
        // console.log(nonce);
        if (binary.startsWith("0".repeat(difficulty))) {
            console.log("nonce", nonce);
            console.log("hash", hash);
            console.log("binary", binary);
            break
        }
    }
}

mine(4, "나 김두한이다.");
