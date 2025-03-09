import React from "react";
import { Counter } from "../components/Counter";
import { History } from "../components/History";
import { ContainerWrapper } from "../components/ContainerWrapper.styled";

export const CounterLayout = () => {
  return (
    <ContainerWrapper>
      <div>
        <Counter />
        <History />
      </div>
    </ContainerWrapper>
  );
};
