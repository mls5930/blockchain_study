// 경로: 250417/src/core/config.ts

export const getConfig = (NODE_ID:string = "node1") => {
    return {
        nodeId: NODE_ID,
        httpPort : NODE_ID === "node1" ? 4000 : 4001,
        p2pPort : NODE_ID === "node1" ? 8080 : 8081,
        peerPort: NODE_ID === "node1"? 8081: 8080,
    }
}