import {createStore} from "solid-js/store";
import {Word} from "~/types/word";

export const [words, setWords] = createStore<Word[]>([])

//todo remove

setWords((words) => {
    words.push({value: "Test1"})
    words.push({value: "Test2"})
    words.push({value: "Test3"})
    words.push({value: "Test4"})
    
    return words;
})