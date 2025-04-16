// 경로: 250416-4/src/core/server/client.ts

import net from "net";
import { IMessage, MessageType } from "./interface/message.interface";
import Chain from "@core/chain/chain";
import Block from "@core/block/block";

export class Client {
  constructor(private readonly chain: Chain) {}

  connect(host: string, port: number, type: MessageType, payload?: string[]): void {
    const client = new net.Socket();

    client.connect(port, host, () => {
      const message = this.message(type, payload);
      client.write(JSON.stringify(message));
    });

    client.on("data", (data) => {
      const message: IMessage = JSON.parse(data.toString().trim());

      switch (message.type) {
        case MessageType.addBlock:
          this.chain.replaceChain(message.payload as Block[]);
          break;
        case MessageType.latestBlock:
          console.log("[Latest Block]", message.payload);
          break;
        case MessageType.allBlock:
          console.log("[All Blocks]", message.payload);
          break;
      }

      client.destroy();
    });

    client.on("close", () => {
      console.log(`[Client] 소켓 연결 종료`);
    });
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

  private message(type: MessageType, payload?: string[]): IMessage {
    switch (type) {
      case MessageType.addBlock:
        return {
          type,
          payload: this.addBlock(payload),
        };
      case MessageType.latestBlock:
        return {
          type,
          payload: this.chain.latestBlock(),
        };
      case MessageType.allBlock:
        return {
          type,
          payload: this.chain.get(),
        };
    }
  }
}
