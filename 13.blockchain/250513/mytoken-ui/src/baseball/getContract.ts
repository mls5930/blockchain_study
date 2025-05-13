import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BaseballNFTABI from '../contracts/BaseballNFT.json';

const getContract = () => {
  const baseballNftTokenAddress = '0xf0Ea84a4577F33b685b3b8EA8eD325b23aA533cc';
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
