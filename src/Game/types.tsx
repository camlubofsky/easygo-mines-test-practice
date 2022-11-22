export interface GameTileProps {
  revealed: boolean;
  gameFinished: boolean;
  isLoading: boolean;
  disabled: boolean;
  isClicked: boolean;
}

export type TTile = {
  location: number;
  mine: boolean;
  gameFinished: boolean;
  isLoading: boolean;
  onTileClick: Function;
  revealed: boolean;
  disabled: boolean;
  clickedTile: number ;
};
