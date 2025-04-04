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
    data: ["tx01"]
}


const GENESISBLOCK = new BlockHeader(GENESIS);
// console.log(GENESISBLOCK);
// 실습 해당 파일을 ts-node로 실행시켜보기


