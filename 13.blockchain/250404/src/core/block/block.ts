// src/core/block.ts

import { IBlock } from "@core/interface/block.interface"
import BlockHeader from "./blockHeader";
import { GENESIS } from "@core/config";
import merkle from "merkle";
// npm install crypto-js
import crypto from "crypto-js";
import CryptoModule from "@core/crypto/cryptoModule";

class Block extends BlockHeader implements IBlock  {
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];
    // 이전 블록에 대한 정보도 필요하다.
    constructor(_previousBlock: Block, _data : string[]) {
        // super => 이전 블록 생성자 함수 호출 때문에
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot<string>(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0;
        this.difficulty = 0; // difficulty는 임의로 0으로 넣겠음.
        this.data = _data;
    }
    // data: ["tx01"]
    static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = merkle("sha256").sync(_data);
        return merkleTree.root();
    }

    static createBlockHash(_block: Block): string {
        const {
            version, 
            difficulty, 
            height, 
            merkleRoot, 
            nonce, 
            previousHash, 
            timestamp
        } = _block
        const value : string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty}${nonce}`;
        return crypto.SHA256(value).toString();
    }

    static findBlock(generateBlock: Block): Block {
        let hash: string
        let nonce: number = 0
        let binary: string;
        while (true) {
            nonce++
            generateBlock.nonce = nonce;
            hash = Block.createBlockHash(generateBlock);
            binary = CryptoModule.hashToBinary(hash);
            if(binary.startsWith("0".repeat(generateBlock.difficulty))) {
                // 채굴이 되었다는거겠지? 해당 스코프 진입 조건은
                generateBlock.hash = hash;
                return generateBlock
            }
        }
    }
    // 블록 추가 메서드
    static generateBlock(_previousBlock: Block, _data: string[]): Block {
        const generateBlock = new Block(_previousBlock, _data);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock
    }
}

let newBlock: Block;
let newBlock2: Block;

let data = ["tx01"]
newBlock = Block.generateBlock(GENESIS, data);
newBlock2 = Block.generateBlock(newBlock,data);

export default Block;
