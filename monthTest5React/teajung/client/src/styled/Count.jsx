import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  gap: 16px;
`;

export const DivLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border:  1px solid #9e9e9e ;
`;

export const DivLeftTop = styled.div`
  height: 100%;
  text-align: center;
  font-size : 3rem;
`;

export const DivLeftBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 100%;
`;

export const DivRight = styled.div`
  width: 50%;
  height: 100%;
  border:  1px solid #9e9e9e ;
  font-size: 24px;

`;

export const Button = styled.button`
  background-color:  "#dfdfdf";
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
  width: 100px;
  height: 100px;
  border:  1px solid green;
  &:hover {
    background-color:"#ebebeb";
  }
`;