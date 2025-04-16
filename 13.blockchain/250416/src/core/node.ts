//  경로: 250416/src/core/node.ts

import Chain from "./chain/chain";
import { P2P } from "./server/p2p";
import createApp from "./server";
import { getConfig } from "./config";
import { Client } from "./server/client";

export async function startNode(NODE_ID: string = "node1") {
  const {
    peerPort,
    httpPort,
    nodeId,
    p2pPort,
    peerHost
  } = getConfig(NODE_ID);

  const chain = new Chain();
  const client = new Client(chain);
  const p2p = new P2P(chain);
  const app = createApp(client, chain, peerPort);

  await startHttpServer(app, httpPort, nodeId);
  await startP2PServer(p2p, p2pPort, nodeId);
  await connectInitialPeers(p2p, peerHost, peerPort);
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

function connectInitialPeers(p2p: P2P, host: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      p2p.connectToPeer(host, port);
      resolve();
    }, 1000);
  });
}
