import React,{ useRef} from 'react'
import {Modal,Descriptions, Tag} from 'antd';
import { PrinterOutlined} from '@ant-design/icons';
import styles from "./PrintOldTicket.module.css"
import { Child } from 'views/app-views/utilite/printer/CloneTicket';

export default function PrintOldTicketModal({setVisibleOTM, visibleOTM, ticket,currency}) {
	const childRef = useRef();

  

  
     
      const handleCancel = () =>{
        setVisibleOTM(false);
      }


 
  
  return (

      
        <Modal
          visible={visibleOTM}
      
          onCancel={handleCancel}
          footer={null}
         /*  bodyStyle={100} */
       style={{position:'relative',top:10}} 
        >
    
       <Descriptions title="TICKET Info" layout="vertical" bordered>
<Descriptions.Item label="Ticket Id" span={3}> {ticket.code}</Descriptions.Item>
<Descriptions.Item label="Ticket Status" span={2}> 

  {/* {isComplete ? (<Badge status="success" text="paid" />) : ( <Badge status="error" text="Unpaid" />)} */}


    { ticket.status === 'WAITING' && <Tag color="gold">Not played</Tag>}
				  { ticket.status === 'OVER' && <Tag color="red"> Played</Tag>}
				  { ticket.status === 'COMPLETED' && <Tag color="green">Paid</Tag>}
				  { ticket.status === 'PLAYED' && <Tag color="pink">In Play</Tag>}
  
   </Descriptions.Item>
<Descriptions.Item label="Update Ticket ">   
<Child ref={childRef}  key={ticket.code} ticket={ticket} />
<span className={styles.printTicket} onClick={() => childRef.current.Print()}>  <PrinterOutlined /> Print</span>
</Descriptions.Item>
<Descriptions.Item label="Rounds " span={1}> <strong><i>{ticket.rounds}  </i></strong></Descriptions.Item>
<Descriptions.Item label="Bet" span={2}> <strong><i>{ticket.bet}  {currency}</i></strong></Descriptions.Item>
<Descriptions.Item label="Ticket Price" > <strong><i>{ticket.played}  {currency}</i></strong></Descriptions.Item>
<Descriptions.Item label="Total Win"> <strong><i>{ticket.winned }  {currency}</i></strong></Descriptions.Item>


</Descriptions>

</Modal>
    
  )
}
