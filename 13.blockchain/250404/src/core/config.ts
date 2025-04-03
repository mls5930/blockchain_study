import { IBlock } from "@core/interface/block.interface";

export const GENESIS : IBlock = {
    version : "1.0.0",
    height : 0,
    timestamp : new Date().getTime(),
    hash : "0".repeat(64),
    previousHash : "0".repeat(64),
    merkleRoot : "0".repeat(64),
    difficulty : 0,
    nonce : 0,
    data : ["tx01"]
}