import styled from 'styled-components';
import {GameTileProps} from './types'
import { pulse } from './pulse';


export const Container = styled.div`
  height: 640px;
  display: flex;
`;

export const SidePanel = styled.div`
  width: 170px;
  background: rgb(33,55,67);
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 50px 0 0 30px;
`;

export const Title = styled.div`
  display: flex;
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 8px;
  background: ${({ disabled }) => disabled ?  'rgb(18,148,39)': 'rgb(20,232,36)'};
  border: none;
  color: ${({ disabled }) => disabled ?  'rgb(15,58,35)': 'black'};
  &:hover {
    background: ${({ disabled }) => !disabled && 'rgb(31,255,32)'};
  }
  &:active {
    font-size: ${({ disabled }) => !disabled && '14px'};
  }
`
export const GameBoard = styled.div`
  display: grid;
  row-gap: 20px;
  column-gap: 12px;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  background-color: rgb(15, 33, 46);
  padding: 24px;
`;

export const GameTile = styled.div<GameTileProps>`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background: ${({revealed, gameFinished}) =>
    revealed || gameFinished ? 'rgb(7,24,36)' : 'rgb(48, 69, 83)'};
  box-shadow: ${({revealed, gameFinished}) =>
    revealed || gameFinished
      ? '0 8px 2px rgb(7,24,36)'
      : '0 8px 2px rgb(33,55,67)'};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ disabled }) => !disabled && 'rgb(85, 112, 134)'};
    transform: ${({ disabled }) => !disabled && 'translateY(-0.25rem)'};
  }
  &:active {
    transform: ${({ disabled }) => !disabled && 'translateY(0)'};
  }
  animation-name: ${({isLoading, isClicked}) => (isLoading && isClicked ? pulse : '')};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
`;