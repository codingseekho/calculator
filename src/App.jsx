import { useState } from "react";
import "./App.css";





function App() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

const clearHistory = () => {
  setHistory([]);
};

  const clickButton = (btn) => {

    if (btn === "C") {
      setValue("");
    }

    else if (btn === "⌫") {
      setValue(value.slice(0, -1));
    }

    else if (btn === "=") {
      try {
        const result = eval(value);

        setHistory([
          ...history,
          value + " = " + result
        ]);

        setValue(result.toString());

      } catch {
        setValue("Error");
      }
    }

    else {
      setValue(value + btn);
    }
  };


  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+",
    "C","⌫"
  ];


  return (
    <div className="calculator">

      <div className="app-title">
  <span className="logo-icon">🧮</span>
  <h1>Calculator Pro</h1>
</div>

      <input 
        type="text"
        value={value}
        readOnly
      />


      <div className="buttons">
        {buttons.map((btn) => (
          <button 
            key={btn}
            onClick={() => clickButton(btn)}
          >
            {btn}
          </button>
        ))}
      </div>


      <div className="history">
  <h2>History</h2>

  <button className="clear-history" onClick={clearHistory}>
    Clear History
  </button>

  {history.map((item,index)=>(
    <p key={index}>{item}</p>
  ))}

</div>


    </div>
  );
}

export default App;