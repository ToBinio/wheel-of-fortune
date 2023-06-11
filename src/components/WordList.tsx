import {For} from "solid-js";
import {Word} from "~/types/word";
import {createStore, produce} from "solid-js/store";
import {setWords, words} from "~/stores/words.store";

export default function WordList() {

    let word = ""

    function addWord() {
        setWords(words.length, {value: word})
    }

    function renderWord(word: Word) {
        return (
            <li>
                {word.value}
            </li>
        )
    }

    return (
        <div>
            <h3>Words</h3>

            <div>
                <ul>
                    <For each={words}>
                        {renderWord}
                    </For>

                    <li>
                        <input type="text" name="word" id="word" onchange={(e) => word = e.target.value}/>
                        <button onclick={addWord}>Add</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}