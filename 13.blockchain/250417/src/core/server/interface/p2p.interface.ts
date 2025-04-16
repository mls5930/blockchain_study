// 경로: 250417/src/core/server/interface/p2p.interface.ts

// 포트에서 P2P 서버를 열기
export interface IP2P {
    listen(port: number): void;
}