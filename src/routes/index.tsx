import WordList from "~/components/WordList";
import Wheel from "~/components/Wheel";
import {Transition} from "solid-transition-group";
import {Show} from "solid-js";
import {hasWinner, winnerName} from "~/stores/winner.store";
import '../styles/index.css'

export default function Home() {
  return (
    <main>
      <h2>Wheel</h2>
      <Transition name="winner">
        <Show when={hasWinner()}>
          <h1 id={'winner'}>{winnerName()}</h1>
        </Show>
      </Transition>
      <div id={'content'}>
        <WordList/>
        <Wheel/>
      </div>
    </main>
  );
}
