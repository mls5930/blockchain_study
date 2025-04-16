// 경로 : 250416/src/core/genesis.ts

import { IBlock } from "@core/interface/block.interface"

export const GENESIS: IBlock = {
    version: "",
    height: 0,
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 1,
    nonce: 0,
    data: ["tx01", "tx02"]
}

export const INTERVAL = 10;
export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
export const BLOCK_GENERATION_INTERVAL = 10 * 60;

