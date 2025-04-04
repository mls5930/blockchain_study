// src/core/block.ts


import { IBlock } from "@core/interface/block.interface"
import BlockHeader from "./blockHeader"
import { GENESIS } from "@core/config";
import merkle from "merkle"
import crypto from "crypto-js"
import CryptoModule from "@core/crypto/crypto.module";
class Block extends BlockHeader implements IBlock {
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];
    // 이전 블록에 대한 정보도 필요하다.
    constructor(_previousBlock: Block, _data: string[]) {
        // super => 이전 블록 생성자 함수 호출 때문에
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot<string>(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0;
        this.difficulty = 0; //difficulty 는 임의로 0을 넣겠음.
        this.data = _data;
    }
    static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = merkle("sha256").sync(_data)
        return merkleTree.root();
    }
    static createBlockHash(_block: Block): string {
        const {
            version,
            height,
            timestamp,
            previousHash,
            nonce,
            merkleRoot,
            difficulty
        } = _block
        const value: string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty}${nonce}`;
        return crypto.SHA256(value).toString();

    }
    static findBlock(generateBlock: Block): Block {
        let hash: string
        let nonce: number = 0

        while (true) {
            nonce++
            generateBlock.nonce = nonce;
            hash = Block.createBlockHash(generateBlock)
            const binary = CryptoModule.hashToBinary(hash)
            if (binary.startsWith("0".repeat(generateBlock.difficulty)))
                // 채굴이 되었다는거겠지? 해당 스코프 진입 조건은
                generateBlock.hash = hash;
            return generateBlock
        }
    }
    static generateBlock(_previousBlock: Block, _data: string[]): Block {
        const generateBlock = new Block(_previousBlock, _data);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock
    }
}


// 우리가 만든 블록 구조 클래스 실행시켜볼거임!

// 예시 가정
// 블록을 2개를 만들겁니다.
// 1. 제네시스 블록
// 2. 그 이후의 블록

let newBlock: Block;
let newBlock2: Block;
// 블록 추가를 해볼거임
// 최초의 진입점 => new Block X Block.generateBlock(newBlock)
// 데이터는 임의로 넣을게요

let data = ["tx04"]
newBlock = Block.generateBlock(GENESIS, data)
newBlock2 = Block.generateBlock(newBlock, data)
console.log(newBlock);
console.log(newBlock2);

export default Block

const GENESISBLOCK = new Block(GENESIS, ["tx01"])
console.log(GENESISBLOCK);
