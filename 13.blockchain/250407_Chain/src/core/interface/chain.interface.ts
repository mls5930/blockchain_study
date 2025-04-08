import Block from "@core/block/block";

export interface IChain {
    get(): Block[]; // 체인에 담겨있는 전체 블록 조회
    length(): number; // 체인의 길이
    latestBlock(): Block; // 가장 최근에 추가한 블록
    addToChain(receivedBlock: Block): Block
    getBlock(callbackFn: (block: Block) => boolean): Block
    getBlockByHeight(height: number): Block
    getBlockByHash(hash: string): Block
}