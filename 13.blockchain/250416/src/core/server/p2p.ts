import net, { Socket } from "net";
import { IP2P } from "./interface/p2p.interface";
import { IMessage, MessageType } from "./interface/message.interface";
import Chain from "@core/chain/chain";
import Block from "@core/block/block";

export class P2P implements IP2P {
    sockets: Socket[] = [];

    constructor(private readonly chain: Chain) { }

    listen(port: number): void {
        // port : 8080, 8081
        const server = net.createServer((socket) => {
            this.initializeSocket(socket);
        })

        server.listen(port, () => {
            console.log(`P2P 서버 실행 중 port: ${port}`);
        })
    }

    connectToPeer(host: string, port: number): void {
        const socket = new net.Socket();
        socket.connect(port, host, () => {
            console.log(`[+] ${host}: ${port} 에 연결 성공`);
            this.initializeSocket(socket);
            // socket, MessageType.allBlock
            socket.write(JSON.stringify({ allBlock: "allBlock" }))
        })

        socket.on("error", (err) => {
            console.log(`[!] ${host}:${port} 연결실패 ${err.message}`);
        })
    }

    // 소켓 초기화 및 메시지 핸들링 등록
    private initializeSocket(socket: Socket): void {
        this.sockets.push(socket);
        socket.on('data', (data) => this.handleData(socket, data))
        socket.on("end", () => {
            const index = this.sockets.indexOf(socket);
            if (index !== -1) this.sockets.splice(index, 1);
            console.log(`[-] 소켓 연결 종료 ${socket.remoteAddress}: ${socket.remotePort}`);
        })
    }

    // 수신 => 어떤 노드가 블록 채굴했을 때 넘어오는 데이터 처리 (메세지 분기)
    private handleData(socket: Socket, data: Buffer) {
        try {
            const message: IMessage = JSON.parse(data.toString().trim());

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
    }
}