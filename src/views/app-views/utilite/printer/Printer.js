import React, { useRef } from "react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";


const Printer = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, 
    onAfterPrint: ()=> alert('azeaze'),
  });

  return (
    <div >
      {/* // bech n5abiw ticket html/css  */}
      <div style={{display:'none'}}>
      <ComponentToPrint ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Confirm </button>
    </div>
  );
};

render(<Printer />, document.querySelector("#root"));