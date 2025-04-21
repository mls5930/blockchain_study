// src/core/block.ts

import { IBlock } from "@core/interface/block.interface"
import BlockHeader from "./blockHeader";
import merkle from "merkle";
// npm install crypto-js
import crypto from "crypto-js";
import CryptoModule from "@core/crypto/cryptoModule";
import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/genesis";

class Block extends BlockHeader implements IBlock {
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];
    // 이전 블록에 대한 정보도 필요하다.
    constructor(_previousBlock: Block, _data: string[], _adjustmentBlock: Block) {
        // super => 이전 블록 생성자 함수 호출 때문에
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot<string>(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0;
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock);
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
        const value: string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty}${nonce}`;
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
            if (binary.startsWith("0".repeat(generateBlock.difficulty))) {
                // 채굴이 되었다는거겠지? 해당 스코프 진입 조건은
                generateBlock.hash = hash;
                return generateBlock
            }
        }
    }
    // 블록 추가 메서드
    static generateBlock(_previousBlock: Block, _data: string[], _adjustmentBlock: Block): Block {
        const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock
    }

    static getDifficulty(_newBlock: Block, _adjustmentBlock: Block, _previousBlock: Block): number {
        if (_newBlock.height <= 0) throw new Error("높이가 없습니다!");

        if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) {
            return _previousBlock.difficulty;
        }
        // 이번엔 난이도를 높일까? 낮출까? 그대로 둘까?
        // DIFFICULTY_ADJUSTMENT_INTERVAL개의 블록이 실제로 채굴되는데 걸린 시간
        const timeToken: number = _newBlock.timestamp - _adjustmentBlock.timestamp;
        // 원래 예상했던 시간(예: 블록 하나당 10초 곱하기 주기 개수)
        const timeExpected = BLOCK_GENERATION_INTERVAL * 10 * DIFFICULTY_ADJUSTMENT_INTERVAL;
        if (timeToken < timeExpected / 2) return _previousBlock.difficulty + 1; // 채굴 속도가 너무 빠르면 난이도 +1
        if (timeToken > timeExpected * 2) return _previousBlock.difficulty - 1; // 채굴 속도가 너무 느리면 난이도 -1
    }
}

export default Block;
