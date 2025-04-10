import Wallet from "@core/wallet";
import path from "path";
import fs from "fs"

describe("고혜성 양반의 지갑 테스트 코드", ()=> {
    it("6. privateKey를 넣으면 파일의 privatKey와 같은지 검증", () => {
        //d0fbecdca7f2f135b708109e60db5159dedd1f8dd1a8af072964177a643de384 기존에 만든 privateKey
        const wallet = new Wallet("d0fbecdca7f2f135b708109e60db5159dedd1f8dd1a8af072964177a643de384")
        const filepath = path.join(__dirname, "../data", `0x${wallet.account}`);
        console.log(wallet.privateKey);
        console.log(wallet.account);

        expect(wallet.privateKey).toEqual(fs.readFileSync(filepath, "utf-8"))
    })
})