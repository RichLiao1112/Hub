import React, { ReactNode } from "react";
import * as S from './index.styled';

export interface IHeader {
  right?: ReactNode;
  left?: ReactNode;
  middle?: ReactNode;
}

export default function Header(props: IHeader) {
  return (
    <S.Header>
      <S.Content>
        <S.Left>{props.left}</S.Left>
        <S.Middle>{props.middle}</S.Middle>
        <S.Right>
          {props.right}
        </S.Right>
      </S.Content>
    </S.Header>
  )
}