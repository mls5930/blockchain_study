require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
<<<<<<< HEAD
  networks: {
    kairos: {
      provider: () =>
        new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          process.env.RPC_URL
        ),
      network_id: 1001,
    },
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
}
// npx fruffle migrate
=======
    networks: {
        kairos: {
            provider: () =>
                new HDWalletProvider(
                    [process.env.PRIVATE_KEY],
                    process.env.RPC_URL
                ),
            network_id: 1001,
        },
    },
    compilers: {
        solc: {
            version: "0.8.20"
        }
    },
    plugins: ['truffle-plugin-verify'],
    etherscan: {
        apiKey: process.env.KAIASCAN_KEY, // 오타 수정
        customChains: [
            {
                network: "kairos",
                chainId: 1001,
                urls: {
                    apiURL: "https://kairos-oapi.kaiascan.io/api",
                    browserURL: "https://kairos.kaiascan.io/"
                }
            }
        ]
    }
};
>>>>>>> dab8e3c8aac1987655f1b1689761ad243518379a
