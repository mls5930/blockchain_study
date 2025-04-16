import net, { Socket } from "net";
import { IP2P } from "./interface/p2p.interface";
import { IMessage, MessageType } from "./interface/message.interface";
import Chain from "@core/chain/chain";
import Block from "@core/block/block";

export class P2P implements IP2P {
    sockets: Socket[] = [];

    constructor(private readonly chain: Chain) {}

    listen(port: number): void {
        const server = net.createServer((socket) => {
            this.initializeSocket(socket);
        })

        server.listen(port, () => {
            console.log(`P2P 서버 실행 중 port: ${port}`);
        })
    }

    // 클라이언트 메시지를 수신하고 타입에 따라 처리하는 로직 등록
    private initializeSocket(socket: Socket): void {
        this.sockets.push(socket);
        socket.on('data', (data) => {
            try{
                const message: IMessage =  JSON.parse(data.toString().trim());
    
                switch (message.type) {
                    case MessageType.addBlock:
                        this.chain.replaceChain(message.payload as Block[])
                        break;
                    case MessageType.allBlock:
                        socket.write(JSON.stringify(message));
                        break;
                    case MessageType.latestBlock:
                        socket.write(JSON.stringify(message));
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log(`[!] 메세지 처리 오류! ${error.message}`);
            }
        })
        socket.on("end", () => {
            const index = this.sockets.indexOf(socket);
            if (index !== -1) this.sockets.splice(index, 1);
            console.log(`[-] 소켓 연결 종료 ${socket.remoteAddress}: ${socket.remotePort}`);   
        })
    }
}