import { useState, useEffect, useRef } from "react";
import "./App.css";
import { create, all } from "mathjs";


const math = create(all);

math.config({
  number: "BigNumber",
  precision: 1000,
  predictable: true
});


function App() {


  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

  const displayRef = useRef(null);



  useEffect(()=>{

    if(displayRef.current){

      displayRef.current.scrollTop =
      displayRef.current.scrollHeight;

    }

  },[value]);




  const clickButton = (btn)=>{


    if(btn==="C"){

      setValue("");

    }


    else if(btn==="⌫"){

      setValue(value.slice(0,-1));

    }


    else if(btn==="="){


      try{


        const result = math.evaluate(value);


        const answer = result.toFixed();


        setHistory([
          value + " = " + answer,
          ...history
        ]);


        setValue(answer);



      }

      catch{


        setValue("Error");


      }


    }


    else{


      setValue(value + btn);


    }


  };





  const clearHistory=()=>{

    setHistory([]);

  };





  const buttons=[

    "C","⌫","%","/",
    "7","8","9","*",
    "4","5","6","-",
    "1","2","3","+",
    "0",".","="

  ];





  return (


    <div className="calculator">



      <div className="app-title">

        <span>🧮</span>

        <h1>Calculator Pro</h1>

      </div>




      <div 
        className="display"
        ref={displayRef}
      >


        <div
          className="expression"
        >

          {value || "0"}

        </div>


      </div>





      <div className="buttons">


        {
          buttons.map((btn)=>(


            <button

              key={btn}

              className={
                btn==="=" ? "equal" :
                btn==="C" ? "clear" :
                btn==="⌫" ? "delete" :
                ""

              }


              onClick={()=>clickButton(btn)}

            >

              {btn}


            </button>


          ))
        }


      </div>







      <div className="history">


        <div className="history-head">


          <h2>History</h2>


          <button

            className="clear-history"

            onClick={clearHistory}

          >

            Clear

          </button>


        </div>





        {

          history.length===0 ?


          <p className="empty">

            No History

          </p>



          :



          history.map((item,index)=>(


            <p key={index}>

              {item}

            </p>


          ))


        }



      </div>




    </div>


  );

}


export default App;