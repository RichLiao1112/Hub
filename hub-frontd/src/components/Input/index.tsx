import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { InputProps, CommonEventFunction, View } from "@tarojs/components";
import * as S from './index.styled';

export interface IMyInput {
  inputProps?: InputProps;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export default function MyInput(props: IMyInput) {
  const { inputProps = {}, prefix, suffix } = props;

  const [content, setContent] = useState<string | undefined>(undefined);
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback((e: any) => {
    setFocus(true);
    if (inputProps.onFocus) {
      inputProps.onFocus(e);
    }
  }, [inputProps.onFocus])

  const onBlur = useCallback((e: any) => {
    setFocus(false);
    if (inputProps.onBlur) {
      inputProps.onBlur(e);
    }
  }, [inputProps.onBlur])

  const onInput = useCallback((e) => {
    setContent(e.detail.value);
    if (inputProps.onInput) {
      inputProps.onInput(e);
    }
  }, [inputProps.onInput])

  useEffect(() => {
    setContent(inputProps.value);
  }, [inputProps.value])

  return (
    <S.MyInput>
      <S.Content hasContent={!!content} focus={focus} onClick={() => setFocus(true)}>
        <S.FocusPlaceholder>{inputProps.placeholder}</S.FocusPlaceholder>
        <S.InputContainer {...inputProps} onInput={onInput} focus={focus} placeholder={focus ? '' : inputProps.placeholder} onFocus={onFocus} onBlur={onBlur} />
      </S.Content>
    </S.MyInput>
  )
}