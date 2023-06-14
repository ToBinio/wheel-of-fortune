import {setWords, words} from "~/stores/words.store";
import {Index} from "solid-js";
import {produce} from "solid-js/store";

export default function WordList() {

  let word = ""

  function addWord() {

    setWords(produce((words) => {
      words.push({
        value: word,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        size: 1
      })

      return words;
    }))
  }

  function deleteWord(index: number) {
    setWords(produce((words) => {
      words.splice(index, 1);

      return words
    }))
  }

  function setWord(index: number, e: InputEvent & { currentTarget: HTMLInputElement, target: HTMLInputElement }) {
    let size = parseInt(e.target.value);

    if (size > 0)
      setWords(index, 'size', size);
  }

  function renderWord(word: any, index: number) {
    return (
      <li>
        <input type="text" value={words[index].value} onInput={(e) => {
          setWords(index, 'value', e.target.value)

          console.log(words);
        }}/>
        <button onclick={() => {
          deleteWord(index)
        }}>Delete
        </button>
        <input type="number" value={words[index].size}
               onInput={(e) => setWord(index, e)}/>

      </li>
    )
  }

  return (
    <div>
      <h3>Words</h3>
      <div>
        <ul>
          <Index each={words}>
            {renderWord}
          </Index>

          <li>
            <input type="text" name="word" id="word" onchange={(e) => word = e.target.value}/>
            <button onclick={addWord}>Add</button>
          </li>
        </ul>
      </div>
    </div>
  )
}