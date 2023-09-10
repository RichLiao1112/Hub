import { styled } from "@linaria/react";
import { View, Text, Image } from "@tarojs/components";

export const Name = styled(Text)`
  font-size: 14px;
  color: #3F536E;
  font-weight: bold;
  transition: all .3s;
`

export const Banner = styled(Image)`
  width: 100%;
  height: 80px;
  margin-top: 6px;
  text-align: center;
  transition: all .3s;
`;

export const Edit = styled(View)`
  position: absolute;
  bottom: 6px;
  right: 6px;
`;

export const SettingIcon = styled(View)`
  font-size: 20px;
`

export const Block = styled(View)`
  box-sizing: border-box;
  border: 1px solid #e2ecf4;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 6px 0;
  transition: all .3s;
  position: relative;
  cursor: pointer;

  :hover {
    box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  }

  @media only screen and (max-width: 1500px) {
    flex-direction: row;
    direction: rtl;
    align-items: center;
    justify-content: space-between;
    padding: 6px 24px;

    ${Banner} {
      height: auto;
      max-height: 80%;
      width: 100px;
      margin-top: 0;
    }

    ${Name} {
      font-size: 32px;
    }

    ${Edit} {
      position: relative;
      top: 0;
      right: 0;
    }

    ${SettingIcon} {
      font-size: 32px;
    }
  }
`
