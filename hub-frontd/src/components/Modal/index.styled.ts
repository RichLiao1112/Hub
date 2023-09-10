import { styled } from "@linaria/react";
import { View, Text } from "@tarojs/components";

export const Mask = styled(View)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 200ms ease-in;
`;

export const Container = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 8px;
  background-color: #FFF;
  overflow: hidden;
  transition: all 200ms ease-in;
  padding: 16px;
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


export const Modal = styled(View)<{ visible: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 200;
  transition: all 200ms ease-in;
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  opacity: ${({ visible }) => visible ? 1 : 0};

  ${Mask} {
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
    opacity: ${({ visible }) => visible ? 1 : 0};
  }

  ${Container} {
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
    opacity: ${({ visible }) => visible ? 1 : 0};
  }

  @media only screen and (max-width: 1500px) {
    ${Footer} {
      justify-content: center;
    }
  }
`;
