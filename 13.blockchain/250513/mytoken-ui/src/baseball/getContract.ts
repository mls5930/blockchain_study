import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BaseballNFTABI from '../contracts/BaseballNFT.json';

const getContract = () => {
  const baseballNftTokenAddress = '0x56D584224a2b2c95a6FF97f300d8722233d23f84';
  const web3 = new Web3(window.ethereum);

  const baseballNftTokenContract = new web3.eth.Contract(
    BaseballNFTABI.abi as AbiItem[],
    baseballNftTokenAddress
  );

  return {
    baseballNftTokenAddress,
    baseballNftTokenContract,
  };
};

export default getContract;
