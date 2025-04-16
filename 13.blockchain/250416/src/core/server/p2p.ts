// 경로: 250416/src/core/server/p2p.ts

import net, { Socket } from "net";
import { IMessage, MessageType } from "./interface/message.interface";
import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { IP2P } from "./interface/p2p.interface";

export class P2P implements IP2P {
  sockets: Socket[] = [];

  constructor(private readonly chain: Chain) {}

  listen(port: number): void {
    const server = net.createServer((socket) => {
      this.initializeSocket(socket);
    });

    server.listen(port, () => {
      console.log(`P2P 서버 실행 중 (port: ${port})`);
    });
  }

  connectToPeer(host: string, port: number): void {
    const socket = new net.Socket();
    socket.connect(port, host, () => {
      console.log(`[+] ${host}:${port} 에 연결 성공`);
      this.initializeSocket(socket);
      this.sendMessage(socket, MessageType.allBlock);
    });

    socket.on("error", (err) => {
      console.log(`[!] ${host}:${port} 연결 실패: ${err.message}`);
    });
  }

  // 소켓 초기화 및 메시지 핸들링 등록
  private initializeSocket(socket: Socket): void {
    this.sockets.push(socket);
    console.log(`[+] 소켓 연결: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on("data", (data) => this.handleData(socket, data));

    socket.on("end", () => {
      const index = this.sockets.indexOf(socket);
      if (index !== -1) this.sockets.splice(index, 1);
      console.log(`[-] 소켓 연결 종료: ${socket.remoteAddress}:${socket.remotePort}`);
    });
  }

  // 수신 데이터 처리 (안정성 확보 + 메시지 분기)
  private handleData(socket: Socket, data: Buffer): void {
    try {
      const message: IMessage = JSON.parse(data.toString().trim());

      switch (message.type) {
        case MessageType.addBlock:
          this.chain.replaceChain(message.payload as Block[]);
          this.sendMessage(socket, MessageType.allBlock);
          break;

        case MessageType.latestBlock:
          this.sendMessage(socket, MessageType.latestBlock, this.chain.latestBlock());
          break;

        case MessageType.allBlock:
          this.sendMessage(socket, MessageType.allBlock, this.chain.get());
          break;
      }
    } catch (err) {
      console.error("[!] 메시지 처리 오류:", err.message);
    }
  }

  // 메시지 전송 헬퍼 (일관성 있는 형식)
private sendMessage(socket: Socket, type: MessageType, payload?: Block | Block[]): void {
    const message: IMessage = { type, payload };
    socket.write(JSON.stringify(message));
  }
}
