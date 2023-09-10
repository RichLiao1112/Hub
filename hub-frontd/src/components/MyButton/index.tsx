import React, { FC, ReactNode } from 'react';
import { ITouchEvent } from '@tarojs/components';
import * as S from './index.styled';

export interface IButton {
	text: ReactNode;
	onClick?: () => void;
	width?: number;
	height?: number;
	type?: 'primary' | 'default' | 'error';
	loading?: boolean;
}

const MyButton: FC<IButton> = (props) => {
	const handleClick = (event: ITouchEvent) => {
		if (props.loading) return;
		props.onClick?.();
    event.stopPropagation();
	}

	return (
		<S.Container loading={props.loading} onClick={handleClick} width={props.width} height={props.height} type={props.type ?? 'default'}>
			{props.loading && <S.LoadingIcon className='at-icon at-icon-loading-3' />}
			&nbsp;
			{props.text}
			&nbsp;
		</S.Container>
	)
}

export default MyButton;