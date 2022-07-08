import { useEffect, useState } from "react";
import "./App.css";
import Row from "./row";
const link = "https://random-word-api.herokuapp.com/word";
function App() {
  // actual guess word fetched by api
  const [guessWord, setGuessWord] = useState("hellowj");
  // current correct guess word
  const [current, setCurrent] = useState(" ");
  // current typing word
  const [typeWord, setTypeword] = useState("");
  // NOTE: determine win
  const [win, setWin] = useState(false);
  useEffect(() => {
    window.addEventListener("keyup", handle);
    function handle(event) {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 97 && event.keyCode <= 122)
      ) {
        if (typeWord.length <= guessWord[0].length) {
          setTypeword((typeword) => {
            typeword = typeword.concat(event.key);
            if (event.key === guessWord[0][typeword.length - 1]) {
              setCurrent((e, len = typeword.length - 1) => {
                let empty = "";
                for (let i = 0; i < guessWord[0].length; i++) {
                  if (i === len) {
                    empty += event.key;
                  } else {
                    empty += e[i];
                  }
                }

                return empty;
              });
            }
            if (typeword === guessWord[0]) {
              setWin(true);
              return typeword;
            }
            if (typeword.length === guessWord[0].length) {
              typeword = "";
            }

            return typeword;
          });
        }
      } else if (event.key === "Backspace") {
        setTypeword((e) => e.slice(0, e.length - 1));
      }
    }
    return () => {
      window.removeEventListener("keyup", handle);
    };
  }, [guessWord, current, typeWord]);
  useEffect(() => {
    fetch(link)
      .then((resopnse) => resopnse.json())
      .then((data) => {
        setGuessWord(data);
        const empty = " ";

        setCurrent(empty.repeat(data[0].length));
        setTypeword("");
      });
    return () => {
      setCurrent("");
      setTypeword("");
      setWin(false);
    };
  }, []);

  return (
    <div className="App">
      <div>Hellow world {guessWord}</div>
      {win ? <h1 style={{ color: "green" }}>congrats! You won👍🎉✔</h1> : ""}
      <Row guess={guessWord} current={current} />
      <Row guess={guessWord} current={typeWord} />
    </div>
  );
}

export default App;
