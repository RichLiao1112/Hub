import { styled } from "@linaria/react";
import { View } from "@tarojs/components";

const colorful = {
  default: {
    backgroundColor: '#fff',
    activeBackgroundColor: 'rgba(0, 0, 0, .1)',
    color: '#333333',
    activeBoxShadow: 'none',
    activeColor: '#333333',
  },
  primary: {
    backgroundColor: '#1a73e8',
    activeBackgroundColor: '#1b63c1',
    color: '#fff',
    activeBoxShadow: '0 1px 3px 1px rgba(66,64,67,.15), 0 1px 2px 0 rgba(60,64,67,.3)',
    activeColor: '#fff',
  },
  error: {
    backgroundColor: '#fff',
    activeBackgroundColor: 'rgb(217, 48, 37)',
    color: 'rgb(217, 48, 37)',
    activeBoxShadow: '0 1px 3px 1px rgba(217, 48, 37, .15), 0 1px 2px 0 rgba(217, 48, 37, .3)',
    activeColor: '#fff',
  }
}

export const LoadingIcon = styled(View)`
    animation: rotate 2s linear infinite;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
`

export const Container = styled(View)<{ width?: number; height?: number; type: 'default' | 'primary' | 'error' | ''; loading?: boolean }>`
  font-size: 16px;
  background-color: ${({ type }) => colorful[type].backgroundColor};
  color: ${({ type }) => colorful[type].color};
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  width: ${({ width }) => width ? `${width}px` : '100%'};
  height: ${({ height }) => height ? `${height}px` : '36px'};
  cursor: ${({ loading }) => loading ? 'no-drop' : 'pointer'};
  font-weight: bold;
  transition: all 200ms ease-in;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${({ type }) => colorful[type].activeBackgroundColor};
    box-shadow: ${({ type }) => colorful[type].activeBoxShadow};
    color: ${({ type }) => colorful[type].activeColor};
  }
`;