import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BaseballNFTABI from '../contracts/BaseballNFT.json';

const getContract = () => {
  const baseballNftTokenAddress = '0x5b6da3706cc3103975167732c80bacc5942f564c';
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
// 번들링 물어보기
export default getContract;
