import { styled } from "@linaria/react";
import { View, Text, Input } from "@tarojs/components";

export const MyInput = styled(View)`
  padding: 8px 0;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
`;

export const FocusPlaceholder = styled(View)`
  padding: 0 6px;
  position: absolute;
  left: 0;
  background-color: white;
  transition: all 100ms ease-in;
  font-size: 16px;
  z-index: 9;
`;

export const InputContainer = styled(Input)`
  width: 100%;
  font-size: 16px;
  z-index: 10;
  margin: 12px 0;
`;

export const Content = styled(View)<{ focus: boolean; hasContent: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  transition: all 200ms ease-in;
  position: relative;
  box-sizing: border-box;
  padding: 12px 16px;
  border-color: ${({ focus }) => focus ? 'rgb(26, 115, 232)' : '#DEE2E7'};


  ${FocusPlaceholder} {
    visibility: ${({ focus, hasContent }) => (focus || hasContent) ? 'visible' : 'hidden'};
    opacity: ${({ focus, hasContent }) => (focus || hasContent) ? 1 : 0};
    top: ${({ focus, hasContent }) => (focus || hasContent) ? '-14px' : '16px'};
    left: ${({ focus, hasContent }) => (focus || hasContent) ? '6px' : '16px'};
    color: ${({ focus }) => focus ? 'rgb(26, 115, 232)' : 'rgb(95,99,104)'};
    font-size: ${({ focus, hasContent }) => (focus || hasContent) ? '12px' : '16px'};
    /* transform: ${({ focus, hasContent }) => (focus || hasContent) ? 'scale(.8)' : 'scale(1)'}; */
  }

  @media only screen and (max-width: 1500px) {

    ${FocusPlaceholder} {
      visibility: ${({ focus, hasContent }) => (focus || hasContent) ? 'visible' : 'hidden'};
      opacity: ${({ focus, hasContent }) => (focus || hasContent) ? 1 : 0};
      top: ${({ focus, hasContent }) => (focus || hasContent) ? '-8px' : '16px'};
      left: ${({ focus, hasContent }) => (focus || hasContent) ? '6px' : '0'};
      color: ${({ focus }) => focus ? 'rgb(26, 115, 232)' : 'rgb(95,99,104)'};
    }

    /* ${InputContainer} {
      margin-top: ${({ focus, hasContent }) => (focus || hasContent) ? '12px' : '0'};
    } */
  }
`;
