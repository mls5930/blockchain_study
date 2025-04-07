import Block from "@core/block/block";

export interface IChain {
    get(): Block[]; // 체인에 담겨있는 전체 블록 조회
    length(): number; // 체인의 길이
    latestBlock(): Block; // 가장 최근에 추가한 블록
    addToChain(receivedBlock: Block): Block
    getBlock(callbackFn: (block: Block) => boolean): Block
    getBlockByHeight(height: number): Block
    getBlockByHash(hash: string): Block
    // 매개변수: receivedChain
    // 반환타입: isError, value
    // 해당 메서드에서 매개변수의 맥락 => 다른 노드로부터 받은 새로운 체인
    // 체인을 비교한다고 했죠? 내 체인이 더 길고 신뢰하냐? 너께 더 신뢰하냐?
    replaceChain(receivedChain: Block[]): { isError: boolean, value: string }
}