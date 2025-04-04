// src/core/config.ts

import { IBlock } from "@core/interface/block.interface"
<<<<<<< HEAD
import BlockHeader from "@core/block/blockHeader"

export const GENESIS: IBlock = {
    version: "",
    height: 0, //최초의 블럭이기 떄문에 순번이 0
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    // 해더와 바디
=======

export const GENESIS: IBlock = {
    version: "",
    height: 0, // 최초의 블럭이기 때문에 순번이 0
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    //
>>>>>>> 996cbd0dee3928727bef9b2cc108c125725f4162
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 1,
    nonce: 0,
<<<<<<< HEAD
    data: ["tx01"]
}


const GENESISBLOCK = new BlockHeader(GENESIS);
// console.log(GENESISBLOCK);
// 실습 해당 파일을 ts-node로 실행시켜보기

=======
    data: ["tx01", "tx02"]
}


// 실습: 해당 파일을 ts-node로 실행시켜보기
// 결과물 나오면 그대로 냅두세요. 제가 확인해봄
// 내가 만든 파일은 내가 실행시킬 수 있어야 해요.
>>>>>>> 996cbd0dee3928727bef9b2cc108c125725f4162

