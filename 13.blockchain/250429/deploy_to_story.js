require('dotenv').config();
const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');


const web3 = new Web3("http://")
const abiPath = path.join(__dirname, 'contracts_Counter_sol_Counter.abi');
const bytecodePath = path.join(__dirname, 'contracts_Counter_sol_Counter.bin');

async function deploystory() {
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();

    if (!bytecode.startsWith('0x')) {
        bytecode = '0x' + bytecode;
    }


}
