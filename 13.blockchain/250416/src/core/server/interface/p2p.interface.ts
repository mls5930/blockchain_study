// 포트에서 P2P 서버를 열기
export interface IP2P {
    listen(port: number): void;

}