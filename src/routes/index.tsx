import {Title} from "solid-start";
import WordList from "~/components/WordList";
import Wheel from "~/components/Wheel";

export default function Home() {
    return (
        <main>
            <h2>Wheel</h2>
            <WordList/>
            <Wheel/>
        </main>
    );
}
