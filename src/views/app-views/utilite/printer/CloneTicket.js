
import { forwardRef, useRef, useImperativeHandle } from "react"
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";



export const Child = forwardRef((props, ref ) => {
    
   let {ticket} = props

    const componentRef = useRef();


    const handle = useReactToPrint({
        content: () => componentRef.current,
      });

   
	useImperativeHandle(ref, () => ({
  
     Print() {      
    
      handle()        
	  }
	}));

 


  
	return <>
  
    <div style={{display:'none'}}>
        <ComponentToPrint ref={componentRef}  rounds={ticket.rounds} bet={ticket.bet} code={ticket.code} />
     
    </div>

        
    </>;
  });
