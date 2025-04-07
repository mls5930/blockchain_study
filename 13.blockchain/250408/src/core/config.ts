// src/core/config.ts

import { IBlock } from "@core/interface/block.interface"

export const GENESIS: IBlock = {
    version: "",
    height: 0, // 최초의 블럭이기 때문에 순번이 0
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    //
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 1,
    nonce: 0,
    data: ["tx01", "tx02"]
}

// 블록 10개 이전
export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
// 블록 10개 생성 주기를 60초마다 가정 => 현재 10분
export const BLOCK_GENERATION_INTERVAL = 10 * 60;