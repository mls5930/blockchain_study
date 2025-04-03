import crypto from "crypto";
import CryptoModule from "@core/crypto/crypto.module";

const mine = (difficulty: number, base: string) => {
    let nonce: number = 0;
    let hash: string = "";
    let binary: string = "";
    while(true) {
        nonce++
        const data = base + nonce;
        hash = crypto.createHash("SHA256").update(data).digest("hex");
        binary = CryptoModule.hashToBinary(hash);
        // 바이너리가 앞에서부터 `difficulty` 만큼 0이 나오는가?
        if(binary.startsWith("0".repeat(difficulty))){
            console.log("nonce", nonce);
            console.log("nonce", binary);
            break;
        }
    }
}

mine(10, "string11");