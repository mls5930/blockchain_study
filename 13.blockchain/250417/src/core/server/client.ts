// 경로: 250417/src/core/server/client.ts
import net from "net"
import Chain from "@core/chain/chain";
import { IMessage, MessageType } from "./interface/message.interface";
import Block from "@core/block/block";

export class Client {
    constructor(private readonly chain: Chain) {}

    connect(host: string, port: number, type: MessageType, payload?: string[]): void {
        const client = new net.Socket();
        client.connect(port, host, () => {
            const message = this.message(type, payload);
            client.write(JSON.stringify(message))
        })

        client.on("close", () => {
            console.log("[Client] 즉, 터미널 종료함!");  
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