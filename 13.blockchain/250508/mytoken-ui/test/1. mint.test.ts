import Web3 from "web3";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const web3 = new Web3(process.env.RPC_URL);
const deployer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(deployer)

// 컨트랙트 컴파일 결과 불러오기
const ERC20Compiled = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../build/contracts/MyToken.json"), "utf-8"
    )
)

let tokenContract;
let nonOwner;

beforeAll(async () => {
    const { abi, bytecode } = ERC20Compiled;
    const accounts = await web3.eth.getAccounts();
    nonOwner = accounts[1];

    const contract = new web3.eth.Contract(abi);

    const deployTx = contract.deploy({ data: bytecode });

    const receipt = await deployTx.send({
        from: deployer.address,
        gas: "3000000"
    })

    tokenContract = new web3.eth.Contract(abi, receipt.options.address);
})

describe("TDD mint 테스트", () => {
    /*  
        최초 토큰 발행에 대해서 저는 다음과 같이 정의하고 테스트 합니다.
        
        흐름

        1. 최초 민트 그리고 오너만 호출 가능함
        2. 다른 사용자가 민트를 호출하려고 한다면 실패해야 함
    */
    it("1. 오너는 mint를 호출할 수 있어야 한다", async () => {
        // 최초로 컨트랙트를 배포했을 때, 한 번 발행하고, 또 다시 발행했을 때 mint를 실행함
        const before = await tokenContract.methods.balanceOf(deployer.address).call();
        // 최초 발행자가 얼마를 가지고 있는지 확인
        console.log(before);

        // 민트 오너가 최초 발행할 수 있는 민트값을 설정
        const mintAmount = web3.utils.toWei("100", "ether");
        // 첫 번째 인자: to, 두 번째 인자: 발행할 토큰
        const result = await tokenContract.methods.mint(deployer.address, mintAmount).send({
            from: deployer.address
        })
        // 이 때, 정상적으로 트랜잭션이 성공이 되었다면, 트랜잭션 해시 값이 출력이 됨.
        console.log(result);

        const after = await tokenContract.methods.balanceOf(deployer.address).call();
        console.log(after);
    })

    it("2. 오너 말고 다른 사람이 mint를 호출 하면 실패를 한다", async () => {
        const mintAmount = web3.utils.toWei("100", "ether");
        await expect(
            tokenContract.methods.mint(nonOwner, mintAmount).send({
                from: nonOwner,
                gas: "3000000"
            })
        ).rejects.toThrow();
    })
})
