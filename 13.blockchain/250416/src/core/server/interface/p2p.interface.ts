// 경로 : 250416/src/core/server/interface/p2p.interface.ts


export interface IP2P {
    connectToPeer(host: string, port: number): void
    listen(port: number): void;
}