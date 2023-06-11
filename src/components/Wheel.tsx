import {createEffect} from "solid-js";
import {words} from "~/stores/words.store";

export default function Wheel() {

    createEffect(() => {
        let c = document.getElementById("wheelCanvas") as HTMLCanvasElement;

        let currentRad = 0;
        let offset = (Math.PI * 2) / words.length;

        let ctx = c.getContext("2d")!;

        for (let i = words.length - 1; i >= 0; i--) {
            ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16)

            ctx.beginPath();

            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 100, currentRad, currentRad + offset, false)
            ctx.lineTo(250, 250);

            ctx.closePath();

            ctx.fill();

            currentRad += offset;
        }
    })

    return <canvas width={500} height={500} id={"wheelCanvas"}/>
}