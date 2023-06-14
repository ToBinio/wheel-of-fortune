import {createMemo, createSignal} from "solid-js";

export const [winnerName, setWinnerName] = createSignal<undefined | string>(undefined);

export const hasWinner = createMemo(() => {

  console.log(winnerName() !== undefined);

  return winnerName() !== undefined
});