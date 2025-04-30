// 오늘은 axios로 안가져올거임. 직접 abi변수 선언할거임
// abi의 구조 많이 봐둬야 합니다.
const selectedAccount = document.querySelector("#account");
const selectedProgress = document.querySelector("#progress");
const selectedReward = document.querySelector("#reward");
const selectedRandom = document.querySelector("#random");
const selectedOwner = document.querySelector("#owner");

let web3;

if(!window.ethereum) {
    throw new Error("설치된 지갑이 없음!");
} else {
    web3 = new Web3(window.ethereum);
}

const loadABI = async() => {
  const { data } = await axios.get("contracts_baseball_sol_Baseball.abi");
  return data
}

const getContractInstance = async() => {
    // 지갑 연결되어있니?
    await window.ethereum.request({ method: "eth_requestAccounts" });    
    // abi, CA 있니?
    // 컨트랙트 인스턴스 있니?
    const abi = await loadABI();
    const contract = new web3.eth.Contract(abi, "0xeb45d9d9660471a08c03771712942acb10a9423e");    
    return contract;
}

const connectWallet = async() => {
    try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        const account = accounts[0];
        selectedAccount.innerHTML = account;
    } catch (error) {
        console.log(error);
        selectedAccount.innerHTML = error.message;
    }
}


const getProgress = async() => {
   try {
    const contract = await getContractInstance();
    const progress = await contract.methods.getProgress().call();
    selectedProgress.innerHTML = progress;
   } catch (error) {
    console.log(error);
    selectedProgress.innerHTML = error.message;
   }
}

const getReward = async() => {
    try {
        const contract = await getContractInstance();
        const reward = await contract.methods.getReward().call();
        selectedReward.innerHTML = reward;
    } catch (error) {
        console.log(error);
        selectedReward.innerHTML = error.message;
    }
}

const getRandom = async() => {
    try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        const account = accounts[0];
        const contract = await getContractInstance();
        const random = await contract.methods.getRandom().call({
            from: account
        });
        selectedRandom.innerHTML = random;
    } catch (error) {
        console.log(error);
        selectedRandom.innerHTML = error.message;
    }
}

const getOwner = async() => {
    try {
        const contract = await getContractInstance();
        const owner = await contract.methods.getOwner().call();
        selectedOwner.innerHTML = owner;
    } catch (error) {
        console.log(error);
        selectedOwner.innerHTML = error.message;
    }
}

const gameStart = async() => {
    const resultInput = document.querySelector("#result").value
    if (resultInput.length < 3) {
        alert("숫자를 제대로 입력하세요 3자리!")
        return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = window.ethereum.selectedAddress;
    const contract = await getContractInstance();
    const result = await contract.methods.gameStart(Number(resultInput)).send({
        from: account,
        value: web3.utils.toWei("1", "ether")
    });
    console.log(result);
}