import React from 'react'
import stylesCtp from "./ComponentToPrint.module.css";
import Barcode from 'react-barcode'
import moment from 'moment-timezone';

const ComponentToPrint = React.forwardRef((props, ref) => {



  let {rounds, bet, code, userCode } = props

  const time =  moment().tz('Africa/Tunis').format('LLLL')
  return (
    
    <div className="bg-gray-200 ticketPrint" ref={ref} style={{ fontSize: "18px", color:"black"}}>
  {/*    if code = if ticket code exits print ticket page else print usercode page */}
      { code ? (<div  flexDirection="column" justifyContent='center' alignItems='center'  className="wrap-ticketPrinter">
        <ul className={stylesCtp.ticketList} >
          <li><h3 className={stylesCtp.newVegasQrBottom}><i> NEW VEGAS <span className={stylesCtp.n216}>216</span></i></h3></li>
          <li>{time}</li>
          <li>Number Round: {rounds}</li>
          <li>Bet Amount: {bet} DT</li>
          <li>---------------------------</li>
          <li>TOTAL  : {rounds* bet} DT</li>
          <li className="codeBar"><Barcode    width='1px' height='30px' value= {code} />  </li>
        </ul>
    </div>) :(
    
      <ul className={stylesCtp.ticketList} >
          
          <li className="codeBar"><Barcode    width='1px' height='30px' value= {userCode} />  </li>
          <li>{time}</li>
        </ul>
   )

      }
    </div>
  )
})

export default ComponentToPrint;
