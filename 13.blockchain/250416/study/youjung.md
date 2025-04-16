# 오늘 뭐가 어려웠어요?

[p2p.ts](../src/core/server/p2p.ts)

해당 부분이 헷갈려요

## 어떤 부분이 헷갈렸을까?

특히 특정 메서드 부분이 어렵습니다

```ts
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
```
