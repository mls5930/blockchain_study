// 경로 :250416/src/core/server/interface/message.interface.ts

import Block from "@core/block/block";

export enum MessageType {
    latestBlock = "latestBlock", // 최신 블록 요청
    allBlock = "allBlock", // 전체 블록 요청
    addBlock = "addBlock", // 새로운 블록 추가 요청
}

export interface IMessage {
    type: MessageType; // 어떤 종류의 요청인지
    payload: Block | Block[]; // 보낼 데이터 (블록 1개 또는 블록 목록)
}