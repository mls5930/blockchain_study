"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { userid, birthday } } = yield axios_1.default.get("http://api.example");
    return { userid: userid, birthday: birthday };
});
// birthday
// "1950-08-02" 한국
// "1950/08/02" 미국
// 508002 => number 타입 예측이 힘들다.
const a = fetchData();
/*
    변수 a는 fetchData의 반환값이 객체이기 때문에 a 타입 자체는 객체입니다.
    a 안에 userid와 birthday속성이 있는데 각각 string,string 입니다.
*/
