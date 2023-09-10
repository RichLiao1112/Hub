import React, { ReactNode } from "react";
import { View } from '@tarojs/components';
import Header from "@/components/Header";
import * as S from './index.styled';
import MyButton from "../MyButton";

export interface IModal {
  visible?: boolean;
  onCancel?: () => void;
  title?: ReactNode;
  container?: ReactNode;
  onOk?: () => void;
  okLoading?: boolean;
  footer?: ReactNode;
}

export default function Modal(props: IModal) {
  return (
    <S.Modal visible={!!props.visible}>
      <S.Mask onClick={props.onCancel} />
      <S.Container>
        <Header
          left={props.title}
          right={<MyButton onClick={props.onCancel} text={<View className='at-icon at-icon-close'></View>} width={32} height={32}/>}
        />
        {props.container}
        {props.footer ? props.footer : (
          <S.Footer>
            <MyButton text='取消' onClick={props.onCancel} />
            <MyButton text='确定' type='primary' onClick={props.onOk} loading={!!props.okLoading} />
          </S.Footer>
        )}
      </S.Container>
    </S.Modal>
  )
}