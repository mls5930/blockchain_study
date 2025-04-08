import Block from "@core/block/block";

export interface IChain {
    get(): Block[]; // 체인에 담겨있는 전체 블록 조회
    length(): number; // 체인의 길이
    latestBlock(): Block; // 가장 최근에 추가한 블록
    addToChain(receivedBlock: Block): Block
    getBlock(callbackFn: (block: Block) => boolean): Block
    getBlockByHeight(height: number): Block
    getBlockByHash(hash: string): Block
    // receivedChain => 상대 체인이라고 파악
    replaceChain(receivedChain: Block[]): { isError: boolean | undefined, message: string }
    getAdjustmentBlock(): Block
    // P2P 통신할 때 사용할 메서드
    serialize(): string
    deserialize(chunk: string): Block[]
}