import { IBlock, IBlockHeader } from "@core/interface/block.interface";
// implements: 추상화 구조 => IBlockHeader 구조를 지키겠다.
class BlockHeader implements IBlockHeader {
    // ES7 문법
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(_previousBlock: IBlock) {
        this.version = BlockHeader.getVersion();
        this.timestamp = BlockHeader.getTimestamp();
        this.height = _previousBlock.height + 1;
        this.previousHash = _previousBlock.hash || "0".repeat(64)
    }

    static getVersion() {
        return "1.0.0"
    }

    static getTimestamp() {
        return new Date().getTime();
    }
}

export default BlockHeader;