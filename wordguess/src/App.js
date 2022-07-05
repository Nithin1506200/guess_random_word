import { useEffect, useState } from "react";
import "./App.css";
import Row from "./row";
const link = "https://random-word-api.herokuapp.com/word";
function App() {
  const [guessWord, setGuessWord] = useState("hellowj");
  const [current, setCurrent] = useState(0);
  const [typeWord, setTypeword] = useState("");
  // initial setup
  const [length, setLength] = useState([]);
  const [win, setWin] = useState(false);
  useEffect(() => {
    window.addEventListener("keyup", handle);
    function handle(event) {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 97 && event.keyCode <= 122)
      ) {
        if (typeWord.length < guessWord[0].length) {
          setTypeword((typeword) => {
            typeword = typeword.concat(event.key);

            if (typeword === guessWord[0]) {
              setWin(true);
            }
            if (typeword.length === guessWord[0].length) {
              setLength((e) => {
                e[current] = typeword;
                return e;
              });
              setTypeword("");
              setCurrent((e) => e + 1);
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
  }, [guessWord, current, length, typeWord]);
  useEffect(() => {
    fetch(link)
      .then((resopnse) => resopnse.json())
      .then((data) => {
        setGuessWord(data);
        const rows = [];
        for (let i = 0; i < data[0].length; i++) {
          rows.push("");
        }
        setLength(rows);
        setCurrent(0);
        setTypeword("");
      });
    return () => {
      setCurrent("");
      setLength([]);
      setTypeword("");
      setWin(false);
    };
  }, []);

  return (
    <div className="App">
      <div>Hellow world {guessWord}</div>
      {win ? <h1 style={{ color: "green" }}>congrats! You won👍🎉✔</h1> : ""}
      {length.map((value, i) => {
        return (
          <Row
            key={i}
            guess={guessWord}
            current={i === current ? typeWord : length[i]}
          />
        );
      })}
    </div>
  );
}

export default App;
