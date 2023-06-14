import {createEffect, onCleanup, onMount} from "solid-js";
import {getCompleteSize, words} from "~/stores/words.store";
import {setWinnerName} from "~/stores/winner.store";


export default function Wheel() {

  let canvasSize = 500;

  let winner: number | undefined = undefined;

  let rotLeftToAnimate = 0;
  let radNow = 0;
  let startOffset = 0;

  let time = 0;

  let lastTimeStamp: number | undefined = undefined;
  createEffect(() => {
    render(undefined)
  })

  onMount(() => {
    onResize()
    window.addEventListener("resize", onResize)
  })

  onCleanup(() => {
    window.removeEventListener("resize", onResize);
  })

  function onResize() {
    let c = document.getElementById("wheelCanvas") as HTMLCanvasElement;

    canvasSize = c.clientWidth * 2;

    c.width = canvasSize;
    c.height = canvasSize;

    render(undefined)
  }

  function render(timeStamp: number | undefined) {
    let delta = 0;
    if (lastTimeStamp != undefined && timeStamp != undefined) {
      delta = (timeStamp - lastTimeStamp) / 1000;
    }

    lastTimeStamp = timeStamp;

    let c = document.getElementById("wheelCanvas") as HTMLCanvasElement;

    let offset = (Math.PI * 2) / getCompleteSize();

    let ctx = c.getContext("2d")!;

    let currentRad = radNow;

    ctx.save();

    ctx.clearRect(0, 0, canvasSize, canvasSize)

    ctx.translate(canvasSize / 2, canvasSize / 2)
    ctx.translate(0.5, 0.5)
    ctx.rotate(currentRad);

    for (let word of words) {
      ctx.fillStyle = word.color

      ctx.rotate(-offset * word.size);

      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.arc(0, 0, canvasSize / 2, offset * word.size, 0, true)
      ctx.lineTo(0, 0);

      ctx.closePath();
      ctx.fill();

      ctx.rotate((offset * word.size) / 2);

      console.log("c" + canvasSize / 2 * 0.9);

      ctx.font = "120px Arial";
      ctx.fillStyle = "white"

      ctx.fillText(word.value, canvasSize / 2 * 0.1, 40, canvasSize / 2 * 0.9)
      ctx.rotate(-(offset * word.size) / 2);

      currentRad += offset;
    }

    ctx.restore();

    ctx.fillStyle = "red"
    ctx.fillRect(canvasSize / 2 - 3, 0, 6, 10);

    if (time < 1) {

      time += delta / 5;

      radNow = rotLeftToAnimate * easeInOutCubic(time) + startOffset;

      requestAnimationFrame(render)
    }

    if (time > 0.9) {
      if (winner != undefined) {
        setWinnerName(words[winner].value)
      }
    }
  }

  function startAnimation() {

    radNow %= (Math.PI * 2);

    startOffset = radNow;
    time = 0;

    setWinnerName(undefined)

    let winnerIndexs = [];

    for (let index = 0; index < words.length; index++) {

      for (let i = 0; i < words[index].size; i++) {
        winnerIndexs.push(index);
      }
    }

    let winnerIndex = Math.floor(Math.random() * winnerIndexs.length);

    console.log(winnerIndexs);

    winner = winnerIndexs[winnerIndex];

    let sumBefore = 0;

    for (let i = 0; i < winner; i++) {
      sumBefore += words[i].size
    }

    let cellSize = (Math.PI * 2) / getCompleteSize();

    let startRadRange = cellSize * sumBefore;
    let endRadRange = startRadRange + cellSize * words[winner].size;

    console.log(startRadRange, endRadRange);

    //add half a PI to make 0 the top
    let randomOffset = (endRadRange - startRadRange) * Math.random() + startRadRange;

    rotLeftToAnimate = Math.PI * 2 * 8 + randomOffset - Math.PI / 2 - radNow;

    render(undefined);
  }

  return <canvas onclick={startAnimation} width={canvasSize} height={canvasSize} id={"wheelCanvas"}/>
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

}