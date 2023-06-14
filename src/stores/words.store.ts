import {createStore} from "solid-js/store";
import {Word} from "~/types/word";

export const [words, setWords] = createStore<Word[]>([])

//todo remove

setWords((words) => {
  words.push({value: "Test1", color: "#" + Math.floor(Math.random() * 16777215).toString(16), size: 1})
  words.push({value: "Test2", color: "#" + Math.floor(Math.random() * 16777215).toString(16), size: 1})
  words.push({value: "Test3", color: "#" + Math.floor(Math.random() * 16777215).toString(16), size: 1})
  words.push({value: "Test4", color: "#" + Math.floor(Math.random() * 16777215).toString(16), size: 1})

  return words;
})

export function getCompleteSize(): number {
  let sum = 0;

  for (let word of words) {
    sum += word.size;
  }

  return sum;
}