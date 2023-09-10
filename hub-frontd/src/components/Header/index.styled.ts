import { styled } from "@linaria/react";
import { View, Text } from "@tarojs/components";

export const Header = styled(View)`
  box-sizing: border-box;
  position: sticky;
  width: 100%;
  height: auto;
  border-bottom: 1px solid #DEE2E7;
`;

export const Content = styled(View)`
  overflow: visible;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1;
  grid-gap: 8px;
  padding-bottom: 8px;
`;

export const Left = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Right = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Middle = styled(View)`
  width: 100%;
  background-color: black;
`;