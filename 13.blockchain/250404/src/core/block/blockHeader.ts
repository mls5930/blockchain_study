import { IBlock, IBlockHeader } from "@core/interface/block.interface";

class BlockHeader implements IBlockHeader {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(_previousBlock : IBlock) {
        // 새로 생성되는 블록은 이전블록의 내용이 필요하다
         this.version = BlockHeader.getVersion();
         this.timestamp = BlockHeader.getTimestamp();
         this.height = _previousBlock.height + 1;
         this.previousHash = _previousBlock.hash;
    }

    static getVersion() {
        return "1.0.0";
    }
    static getTimestamp () {
        return new Date().getTime();
    }
}

const genesisBlock: IBlock = {
    version: "1.0.0",
    height: 0,
    timestamp: 0,
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    hash: "0".repeat(64),
    nonce: 0,
    difficulty: 0,
    data: [],
  };
  
const header = new BlockHeader(genesisBlock);

export default BlockHeader;