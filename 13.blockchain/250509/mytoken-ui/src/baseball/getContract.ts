import Web3 from "web3";
import baseBallContractABI from "../contracts/Baseball.json"
import myTokenContractABI from "../contracts/MyToken.json"

const getContract = () => {
    // 여러분들이 배포한 CA 주소들 넣어요 내꺼 말고^^
    const myTokenAddress = "0x6ef48F92241a56F3B3265EE13c42dDee9AA38a65";
    const baseballAddress = "0xC29B215885CDe3c32Eb1a5c2cce40b083194425D";
    const web3 = new Web3(window.ethereum);

    const myTokenContract = new web3.eth.Contract(
        myTokenContractABI.abi,
        myTokenAddress
    );
    const baseBallContract = new web3.eth.Contract(
        baseBallContractABI.abi,
        baseballAddress
    );

    return {
        baseballAddress,
        myTokenContract,
        baseBallContract
    }
}

export default getContract