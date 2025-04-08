import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { GENESIS } from "@core/config";

describe("replaceChain 테스트", () => {
  let myChain: Chain;
  let otherChain: Chain;

  beforeEach(() => {
    myChain = new Chain();
    otherChain = new Chain();
  });

  it("1. 상대 체인이 제네시스 블록만 있을 경우 → 교체하지 않음", () => { });
  it("2. 상대 체인이 내 체인보다 짧거나 같을 경우 → 교체하지 않음", () => { });
  it("3. 상대 체인이 더 길 경우 → 체인 교체", () => { });
});