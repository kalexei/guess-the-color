import { useEffect, useState } from "react";
import "./App.css";
import ColorBox from "./components/ColorBox";

function compare(x, y) {
  return x === y;
}

const status = {
  win: "WIN",
  loss: "LOSS",
  pending: "PENDING",
};

function createRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function generateRandomColors(amount) {
  const colors = [];
  for (let i = 0; i < amount; i++) {
    colors.push(createRandomColor());
  }
  return colors;
}

function App() {
  const [currentAmount, setCurrentAmount] = useState(3);
  const [currentColors, setCurrentColors] = useState(
    generateRandomColors(currentAmount)
  );
  const [currentStatus, setCurrentStatus] = useState(status.pending);
  const [correctColor, setCorrectColor] = useState();
  const [inputAmount, setInputAmount] = useState(3);

  useEffect(() => {
    if (currentStatus === status.pending) {
      setCurrentColors(generateRandomColors(currentAmount));
    }
  }, [currentStatus, currentAmount]);

  useEffect(() => {
    setCorrectColor(
      currentColors[Math.floor(Math.random() * currentColors.length)]
    );
  }, [currentColors]);

  return (
    <div className="App">
      <input
        type="number"
        value={inputAmount}
        onChange={e => {
          if (e.target.value < 3 || e.target.value > 9) {
            return;
          }
          setInputAmount(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setCurrentAmount(inputAmount);
        }}
      >
        Apply
      </button>
      <div className="colorBoxContainer">
        <ColorBox color={correctColor} />
      </div>
      <div className="buttonsContainer">
        {currentColors?.map((color, i) => (
          <button
            disabled={currentStatus !== status.pending}
            key={i}
            onClick={() => {
              setCurrentStatus(
                compare(color, correctColor) ? status.win : status.loss
              );
            }}
            className={
              currentStatus !== status.pending && compare(color, correctColor)
                ? "greenButton"
                : currentStatus !== status.pending &&
                  !compare(color, correctColor)
                ? "redButton"
                : ""
            }
          >
            {color}
          </button>
        ))}
      </div>
      <div className={"nextButton"}>
        {currentStatus === status.loss ? (
          <button
            onClick={() => {
              setCurrentStatus(status.pending);
            }}
          >
            Try again
          </button>
        ) : null}
        {currentStatus === status.win ? (
          <button
            className="winButton"
            onClick={() => {
              setCurrentStatus(status.pending);
            }}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
