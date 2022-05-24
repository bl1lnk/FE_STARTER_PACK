import React,{useState,useRef} from 'react'
import { Button,Modal,Descriptions, notification } from 'antd';
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./printer/ComponentToPrint";
import TicketService from 'services/TicketService';
import {useDispatch, useSelector} from "react-redux";
import { updateUser } from 'redux/actions/Auth';

/* import { Child } from './printer/CloneTicket'; */

function ConfirmCreateTicketModal({setVisible, bet, rounds, currency, visible}) {
    






const [loadingBTN, setLoadingBTN] = useState(false)
 const [ticketId, setTicketId] = useState(null) 
 const authVariables = useSelector((state) => state.auth);
 const {credit} = authVariables

const dispatch = useDispatch()


 

 const handleCancel = () =>{
     setVisible(false);
 }


 // PRINTER VARIABLES 

 const componentRef = useRef();
 const handle = useReactToPrint({
  content: () => componentRef.current,
  onBeforeGetContent : ()=> {
 
    }
 
  
});




const handlePrint = () =>{
  setLoadingBTN(true)
    TicketService.addTicket({
      "roundes" : rounds,
      "price" : bet
    }).then((resp) => {
      
      if (resp.code === 200) {
        setTicketId(resp.data.code)
       
        handle()
        dispatch(updateUser(credit- (bet*rounds)))
        setLoadingBTN(false)
        setVisible(false)
        }else{
          notification.error({message : "Error fetching transactions ..." , duration :3});
          setVisible(false)
        }
      }).catch((e)=> {
      console.log(e);
      setLoadingBTN(false)
      setVisible(false)
      })
      
}





  return (
    <Modal
    visible={visible}
    title=""
   
    onCancel={handleCancel}
    footer={[
      <Button type="danger" key="cancel" onClick={handleCancel}>
        Return
      </Button>,
      <Button key="Confirm bet" type="primary" loading={loadingBTN} onClick={handlePrint}>
        Confirm Bet
      </Button>,
       


     /*  <printer /> */
    ]}
  >
    
    <div style={{display:'none'}}>
      <ComponentToPrint ref={componentRef}  rounds={rounds} bet={bet}  code={ticketId} />
  {/*     <Spin /> */}
    </div> 

    


<Descriptions title="Game Info" layout="vertical" bordered>

{/*    <Descriptions.Item label="Ticket Id"> ASJ8S0TDU</Descriptions.Item> */}
<Descriptions.Item label="Number Round">{rounds}</Descriptions.Item>
<Descriptions.Item label="Bet Amount"> {bet}{currency}</Descriptions.Item>
{/*  <Descriptions.Item label="Date" span={1}>
2019-04-24 18:00:00
</Descriptions.Item> */}
<Descriptions.Item label="Total" span={3}>
{/*  <Badge status="error" text="UnPaid" /> */}
<span id="total"><i> &nbsp; &nbsp;{bet * rounds} {currency}</i></span>
</Descriptions.Item>

{/*    <Descriptions.Item label="">
<span id="total"><i>TOTAL: &nbsp; &nbsp;4 DT</i></span>
</Descriptions.Item> */}
</Descriptions>

</Modal>
  )
}

export default ConfirmCreateTicketModal