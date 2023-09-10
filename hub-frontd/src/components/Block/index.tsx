import React, { memo } from 'react';
import { ITouchEvent } from '@tarojs/components';
import * as S from './index.styled'
import MyButton from '../MyButton';

export interface IBlock {
  name?: string;
  banner?: string;
  onSetting?: () => void;
  onClick?: () => void;
}

const Block = (props: IBlock) => {
  const { name, banner } = props;

  const handleSetting = () => {
    props.onSetting?.();
  }

  return (
    <S.Block onClick={props.onClick}>
      <S.Edit>
        <MyButton
          onClick={handleSetting}
          type='primary'
          height={32}
          width={32}
          text={
            <S.SettingIcon className='at-icon at-icon-settings' />
          }
        />
      </S.Edit>
      <S.Name>{ name }</S.Name>
      { banner && <S.Banner src={banner} mode='aspectFit' /> }
    </S.Block>
  )
}

export default memo(Block)