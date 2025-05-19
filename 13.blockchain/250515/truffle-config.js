require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    kairos: {
      provider: () =>
        new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          process.env.RPC_URL
        ),
      network_id: 1001,
    },
<<<<<<< HEAD
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
}
// npx fruffle migrate
=======
    compilers: {
        solc: {
            version: "0.8.20"
        }
    },
};
>>>>>>> aea9dba04d8fae0dfb0778723bd1ee7f1113bd0b
