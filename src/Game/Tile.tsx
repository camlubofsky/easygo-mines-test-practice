import React from 'react';
import styled from 'styled-components';
import { Gem, Mine } from '.././assets/index';
import mineSound from '.././assets/mine.mp3';
import gemSound from '.././assets/gem.mp3';
import { GameTileProps, TTile } from './types';
import { GameTile } from './styles'

export const Tile: React.FC<TTile> = ({
  mine,
  location,
  gameFinished,
  isLoading,
  onTileClick,
  revealedTiles,
  disabled,
  clickedTile
}) => {
  const revealed = revealedTiles.includes(location);
  const audio = mine ? new Audio(mineSound) : new Audio(gemSound);
  const svgProps = {
    width: revealed ? '4rem' : '3rem',
    fillOpacity: revealed ? '1' : '0.35',
  };

  const isClicked = clickedTile === location

  return (
    <GameTile
      onClick={() => onTileClick(location, disabled, audio)}
      revealed={revealed}
      gameFinished={gameFinished}
      isLoading={isLoading}
      disabled={disabled}
      isClicked={isClicked}
    >
      {(revealed || gameFinished) && (mine ? <Mine {...svgProps} /> : <Gem {...svgProps} />)}
    </GameTile>
  );
};
