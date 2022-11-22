import React, { useState } from 'react';
import { CasinoGameMines, minesBet, minesCashout, minesNext } from '.././api';
import { Tile } from './Tile';
import {Container, GameBoard, SidePanel, Button, Title} from './styles'
import cashout from '../assets/cashout.mp3'


const Game = () => {
  const defaultGameState: CasinoGameMines = {
    minesCount: 5,
    mines: [],
    revealedTiles: [],
    state: 'idle',
  };
  
  const [gameState, setGameState] = useState(defaultGameState);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedTile, setClickedTile] = useState()
    
  const gameBoardArray = [];
  for (let index = 0; index < 25; index++) {
    gameBoardArray.push({ location: index, mine: gameState.mines.includes(index) });
  }
  
  const betAndCashoutHandler = async (func: Function, gameState: string) => {
    setIsLoading(true);
    const updatedGameState = await func();
    {gameState==="progress" && new Audio(cashout).play()}
    setGameState(updatedGameState);
    setIsLoading(false);
  };

  const tileClickHandler = async (
    location: number,
    disabled: boolean,
    audio: HTMLAudioElement
  ) => {
    if (disabled) {
      return;
    }
    setClickedTile(location)
    setIsLoading(true);
    const updatedGameState = await minesNext(location);
    audio.play();
    setGameState(updatedGameState);
    setClickedTile(undefined)
    setIsLoading(false);
  };

  const disableButton =
    isLoading ||
    (gameState.state === 'progress' && gameState.revealedTiles.length === 0);

  return (
    <>
      <Container>
        <SidePanel>
          <Title>Mines Game</Title>
          <Button
            disabled={disableButton}
            onClick={() =>
              betAndCashoutHandler(
                gameState.state === 'progress' ? minesCashout : minesBet, gameState.state
              )
            }
          >
            {isLoading
              ? 'Loading...'
              : gameState.state === 'progress'
              ? 'Cash Out'
              : 'Bet'}
          </Button>
        </SidePanel>
        <GameBoard>
          {gameBoardArray.map(
            ({ mine, location }: { mine: boolean; location: number }) => {
              return (
                <Tile
                  key={location}
                  location={location}
                  mine={mine}
                  clickedTile={clickedTile}
                  isLoading={isLoading}
                  onTileClick={tileClickHandler}
                  revealedTiles={gameState.revealedTiles}
                  gameFinished={
                    gameState.state === 'busted' ||
                    gameState.state === 'cashout'
                  }
                  disabled={
                    gameState.state !== 'progress' ||
                    gameState.revealedTiles.includes(location)
                  }
                />
              );
            }
          )}
        </GameBoard>
      </Container>
    </>
  );
};
export default Game;
