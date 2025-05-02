// 오늘은 axios로 안가져올거임. 직접 abi변수 선언할거임
// abi의 구조 많이 봐둬야 합니다.
const selectedAccount = document.querySelector("#account");
const selectedProgress = document.querySelector("#progress");
const selectedReward = document.querySelector("#reward");
const selectedrandom = document.querySelector("#random")
const selectedPlaying = document.querySelector("#playing")


let web3;

if (!window.ethereum) {
    throw new Error("설치된 지갑이 없음!");
} else {
    web3 = new Web3(window.ethereum);
}

const loadABI = async () => {
    console.log("여길안오나?");

    const { data } = await axios.get("contracts_Baseball_sol_Baseball.abi");

    return data
}

const getContractInstance = async () => {
    // 지갑 연결되어있니?
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // abi, CA 있니?
    // 컨트랙트 인스턴스 있니?
    const abi = await loadABI();


    const contract = await new web3.eth.Contract(abi, "0xafdfb23fd42afbe9fd415b6a033f21d50833a287");
    return contract;
}

const connectWallet = async () => {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        selectedAccount.innerHTML = account;
    } catch (error) {
        console.log(error);
        selectedAccount.innerHTML = error.message;
    }
}

const getContract = async () => {
    // 지갑 연결되어있니?
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // abi, CA 있니?
    // 컨트랙트 인스턴스 있니?
    const abi = await loadABI();

    const contract = new web3.eth.Contract(abi, "0xafdfb23fd42afbe9fd415b6a033f21d50833a287");
    return contract;
}

const getProgress = async () => {
    try {
        const contract = await getContract();
        console.log(contract);

        const progress = await contract.methods.getProgress().call();
        const array = Array.from({ length: 10 });
        selectedProgress.innerHTML = "총 시도 횟수";
        const getProgress = array.map((value, index) => {
            const div = document.createElement("div")
            if (index < progress) {
                div.className = "progress";
                div.innerHTML = "[x]";
            } else {
                div.className = "opportunity";
                div.innerHTML = "[ㅤ]";
            }
            return div;
        })
        getProgress.forEach(div => {
            selectedProgress.appendChild(div);
        });

    } catch (error) {
        console.log(error);
        selectedProgress.innerHTML = error.message;
    }
}

const getReward = async () => {
    try {
        const contract = await getContract();
        const reward = await contract.methods.getReward().call();
        const result = wad3.utils.fromWei(reward);
        console.log(result);
        selectedReward.innerHTML = reward;
    } catch (error) {
        console.log(error);
        selectedReward.innerHTML = error.message;
    }
}

const getRandom = async () => {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        const contract = await getContractInstance();
        const random = await contract.methods.getRandom().call({
            from: account
        });
        selectedrandom.innerHTML = random;

    } catch (error) {
        selectedrandom.innerHTML = error.message;

    }
}

const getOwner = async () => {
    try {
        const contract = await getContractInstance();
        const reward = await contract.methods.getOwner().call();
        selectedReward.innerHTML = reward;


    } catch (error) {
        console.log(error);
        selectedrandom.innerHTML = error.message;


    }
}

const gameStart = async () => {
    try {
        const proceed = confirm("게임 입장 티켓값으로 0.01 ETH가 소요됩니다.");
        if (proceed !== true) return

        const resultInput = document.querySelector("#result").value
        if (resultInput.length < 3) {
            alert("숫자를 제대로 입력하세요 3자리!")
            return;
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = window.ethereum.selectedAddress;
        const contract = await getContractInstance();

        await contract.methods.getticket().send({
            from: account,
            value: web3.utils.toWei("0.01", "ether"),

        })
        const result = await contract.methods.gameStart(Number(resultInput)).send({
            from: account,
            value: web3.utils.toWei("1", "ether"),
            // value: {
            //     value: web3.utils.toWei("1", "ether"),
            //     ticket: web3.utils.toWei("0.02", "ether"),
            // } value는 단 하나의 값만 보내야아함 


        })


        console.log(result);



    } catch (error) {
        console.log(error);
        selectedrandom.innerHTML = error.message;

    }
}
const getPlaying = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const contract = await getContractInstance();
    const tx = await contract.methods.getPlaying().call();
    const result = tx == 0 ? "게임중" : "게임종료";
    selectedPlaying.innerHTML = result;
    return result
}

