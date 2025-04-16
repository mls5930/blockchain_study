/*
    한 터미널 => node1
    도 하나의 터미널 => node2

    각 노드가 자인만의 체인을 가지고 서버를 열고
    서로 연결된 상태에서 블록을 전파하는 구조

    먼저, 하나의 설정
    getConfig();
*/

import Chain from "./chain/chain"
import { getConfig } from "./config"
import createApp from "./server";
import { Client } from "./server/client";
import { P2P } from "./server/p2p";

export const startNode = async (NODE_ID: string = "node1") => {
    const {
        httpPort,
        nodeId,
        p2pport,
        peerHost,
        peerPort
    } = getConfig(NODE_ID)

    const chain = new Chain();
    const client = new Client(chain); // 아직 안만듦
    const p2p = new P2P(chain) // 아직 안만듦
    const app = createApp(client, chain, peerPort)

    await startHttpServer(app, httpPort, nodeId)
    await startP2PServer(p2p, p2pport, nodeId)
    await connectInitialPeers(p2p, peerHost, peerPort)


    function startHttpServer(app: any, port: number, nodeId: string): Promise<void> {
        return new Promise((resolve) => {
            app.listen(port, () => {
                console.log(`[${nodeId}] HTTP server running → http://localhost:${port}`);
                resolve();
            });
        });
    }

    function startP2PServer(p2p: P2P, port: number, nodeId: string): Promise<void> {
        return new Promise((resolve) => {
            p2p.listen(port);
            console.log(`[${nodeId}] P2P server running on port ${port}`);
            resolve();
        });
    }

    function connectInitialPeers(p2p: P2P, host: string, port: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                p2p.connectTopeer(host, port);
                resolve();
            }, 1000);
        });
    }

}


