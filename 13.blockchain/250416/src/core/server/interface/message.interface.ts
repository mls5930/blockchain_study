// 요청 종류 enum 열거형 오타를 방지

import Block from "@core/block/block";

export enum MessageType {
    latestBlock = "latestBlock",
    allBlock = "allBlocK",
    addBlock = "addBlock"
}

export interface IMessage {
    type: MessageType;
    payload: Block | Block[] //보낼 데이터 (블록 1개 또는 블록 전체 목록)

}

const type = "latestBlock"

if (type === MessageType.latestBlock) {
    console.log("나는 latestBlock 타입이지롱");

}

const type2 = "나 비트코인 100개있음"
// if(type === MessageType.addBlock){
//     // 열거형 추상화에 맞지 않는 값이면, 힌트로 알려준다
// }
// if(type2 === MessageType.addBlock){
// }