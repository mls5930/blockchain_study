// NODE_ID에 따라서 포트 설정하기

// NODE_ID라는 값을 기준으로 각 노드가 사용할 포트와 
// 상대 노드의 정보를 자동으로 설정하는 메서드

// 우리는 실행시킬 때 다음과 같은 명령어를 사용합니다
// NODE_ID=node1 npx ts-node src/core/index.ts
// NODE_ID=node2 npx ts-node src/core/index.ts
// process.env.NODE_ID

export const getConfig = (NODE_ID:string = "node1") => {
    return {
        nodeId: NODE_ID,
        httpPort : NODE_ID === "node1" ? 4000 : 4001,
        p2pPort : NODE_ID === "node1" ? 8080 : 8081,
        peerPort: NODE_ID === "node1"? 8081: 8080,
        peerHost: "127.0.0.1"
    }
    // node1

    // http://127.0.0.1:4000
    // ws://127.0.0.1:8080

    // node2

    // http://127.0.0.1:4001
    // ws://127.0.0.1:8081
}