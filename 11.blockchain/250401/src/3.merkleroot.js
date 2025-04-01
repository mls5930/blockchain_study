const merkle = require("merkle")

// 하버드 1000명 성적표가 담겼다고 가정
const txData = ["4.5", "4.0", "4.1", "4.2", "4.4", "4.5"]

const merkleTree = merkle("sha256").sync(txData)
const Root = merkleTree.root();
console.log(Root);
// BDB04D99394BB02D966D58F8B7856991444F27CB50C9B544188CCA4467611FFD