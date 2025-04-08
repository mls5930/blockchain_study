import Block from "@core/block/block";
import { GENESIS, INTERVAL } from "@core/config";
import { IChain } from "@core/interface/chain.interface";

class Chain implements IChain {

    private chain: Block[] = [GENESIS];

    get(): Block[] {
        return this.chain
    }
    length(): number {
        return this.chain.length;
    }
    latestBlock(): Block {
        return this.chain[this.length() - 1];
    }
    // 블록이 채굴되었을 때 이후
    // 반환값은 최신 블록
    addToChain(receivedBlock: Block): Block {
        this.chain.push(receivedBlock);
        return this.latestBlock();
    }

    // 특정 블록을 찾아야 되는 시점에서 필요한 메서드들 구현
    getBlock(callbackFn: (block: Block) => boolean): Block {
        const findBlock = this.chain.find(callbackFn);
        if (!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
        return findBlock;
    }

    // 블록의 높이를 조회
    getBlockByHeight(height: number): Block {
        return this.getBlock((block: Block) => block.height === height);
    }

    // 블록의 해시로 조회
    getBlockByHash(hash: string): Block {
        return this.getBlock((block: Block) => block.hash === hash);
    }
    replaceChain(receivedChain: Block[]): { isError: boolean | undefined; message: string; } {

        /*
            1. 상대방 체인을 가져온다 => 마지막 블록
            2. 내 체인도 가져온다 => 내 블록

            기준이 height 비교를 하면 되지 않나
        */
        const latesReceivedBlock: Block = receivedChain[receivedChain.length - 1];
        const latestBlock: Block = this.latestBlock();


        // 상대방의 체인이 제네시스 블록만 가지고 있는가? 

        // 상대방의 체인이 내 체인보다 짧다
        if (latesReceivedBlock.height <= latestBlock.height) {
            return {
                isError: false,
                message: "상대방의 체인은 내 체인보다 짧거나 같다.."
            }
        }
        //  여기까지 도달했다 => 상대방 체인이 내꺼보다 길다.
        this.chain = receivedChain;
        return { isError: false, message: undefined }

    }

    getAdjustmentBlock(): Block {
        const currentLength = this.length();

        // 블록이 10개 미만이면, GENESIS를 반환
        if (currentLength < INTERVAL) return this.chain[0];

        // 그렇지 않으면 => 만약 11개다? 11개 이전 블록 반환 => 기준 => 1 10=> timestamp 계산 => 난이도 조정
        return this.chain[currentLength - INTERVAL]
    }
    serialize(): string {
        // "[{block1}, {block2}, {block3}]""
        return JSON.stringify(this.chain)
    }
    deserialize(chunk: string): Block[] {
        // 다른 노드에서 받은 체인JSON 문자열을 파싱
        return JSON.parse(chunk)
    }

}

export default Chain
