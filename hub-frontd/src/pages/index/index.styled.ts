import { styled } from "@linaria/react";
import { View, Text } from "@tarojs/components";

export const Index = styled(View)`
  box-sizing: content-box;
  padding: 8px;
  position: relative;
`

export const ModalTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

export const ModalContainer = styled(View)`
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  margin-top: 8px;

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  display: flex;
`;

export const Footer = styled(View)`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1;
  grid-gap: 8px;
`;

export const Blocks = styled(View)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  justify-content: flex-start;
  grid-gap: 12px;
  transition: all .3s;
  margin-top: 8px;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: 1fr;
    
    ${Footer} {
      justify-content: center;
    }
  }
`;
