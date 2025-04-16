import net from "net"
import Chain from "@core/chain/chain";
import { IMessage, MessageType } from "./interface/message.interface";
import Block from "@core/block/block";

export class Client {
    constructor(private readonly chain: Chain) { }

    connect(host: string, port: number, type: MessageType, payload?: string[]): void {
        const client = new net.Socket();

        // 내가 블록 재굴했으면, 당연히 내가 전파해야겠지!
        client.connect(port, host, () => {
            // 이 메세지는
            // 최신 블록 목록이거나
            // 새로운 체인 값이거나
            // 블록 전체 목록이거나
            const message = this.message(type, payload);
            client.write(JSON.stringify(message))
        })
        client.on("data", (data) => {
            const message: IMessage = JSON.parse(data.toString().trim());
            switch (message.type) {
                case MessageType.addBlock:
                    this.chain.replaceChain(message.payload as Block[])
                    break;
                case MessageType.allBlock:
                    console.log(`[All Block]${message.payload}`);

                    break;
                case MessageType.latestBlock:
                    console.log(`[All latestBlock]${message.payload}`);
                    break;
            }
            client.destroy(); // 연결정료
        })
        client.on("clase", () => {
            console.log("[client] 즉, 터미널 종료함!");

        })
    }
    private addBlock(payload: string[]): Block[] {
        const block = Block.generateBlock(
            this.chain.latestBlock(),
            payload,
            this.chain.getAdjustmentBlock()
        );
        this.chain.addToChain(block);
        return this.chain.get();
    }
    private message(type: MessageType, payload: string[]): IMessage {
        // type = latestBlock | allBlock | addBlock 
        // 즉, 위의 타입에 따라서 체인을 교체하거나 콘솔 출력
        switch (type) {
            case MessageType.addBlock:
                return {
                    type,
                    payload: this.addBlock(payload)
                }
            case MessageType.allBlock:
                return {
                    type,
                    payload: this.chain.get()
                }
            case MessageType.latestBlock:
                return {
                    type,
                    payload: this.chain.latestBlock()
                }
            default:
                break;
        }
    }
}