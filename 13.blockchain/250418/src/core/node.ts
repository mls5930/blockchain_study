// 경로: 250417/src/core/node.ts

import Chain from "./chain/chain";
import { getConfig } from "./config"
import createApp from "./server";
import { Client } from "./server/client";
import { P2P } from "./server/p2p";

export const startNode = async(NODE_ID: string = "node1") => {
    const { 
        httpPort, 
        nodeId, 
        p2pPort, 
        peerPort 
    } = getConfig(NODE_ID);

    const chain = new Chain();
    const client = new Client(chain);
    const p2p = new P2P(chain);
    const app = createApp(client, chain, peerPort);
    
    await startHttpServer(app, httpPort, nodeId);
    await startP2PServer(p2p, p2pPort, nodeId);
}

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
