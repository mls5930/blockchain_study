// src/core/config.ts

import { IBlock } from "@core/interface/block.interface"
import BlockHeader from "@core/block/blockHeader"

export const GENESIS: IBlock = {
    version: "",
    height: 0, //최초의 블럭이기 떄문에 순번이 0
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    // 해더와 바디
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 1,
    nonce: 0,
    data: ["tx01", "tx02"]
}


// 블록 10 개 이전
export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

// 블록 10개 생성주기
export const BLOCK_GENERATION_INTERVAL = 10 * 60


