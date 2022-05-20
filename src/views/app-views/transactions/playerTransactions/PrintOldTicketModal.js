import React,{useState, useRef} from 'react'
import { Button, Card, Row, Col, Input,Modal,Descriptions, Badge,Form,List, Timeline, notification, message} from 'antd';
import {PlusOutlined,CheckOutlined, SettingOutlined, PrinterOutlined} from '@ant-design/icons';
import styles from "./PrintOldTicket.module.css"
import { Child } from 'views/app-views/utilite/printer/CloneTicket';

export default function PrintOldTicketModal({setVisibleOTM, visibleOTM, ticket,currency}) {
	const childRef = useRef();

    const [loading, setLoading] = useState(false)

    const handleOk = () =>{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
          setVisibleOTM(false);
        });
      }
     
      const handleCancel = () =>{
        setVisibleOTM(false);
      }
 const showAA = () =>{
     alert(ticket.code)
 }

 
  
  return (

      
        <Modal
          visible={visibleOTM}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
         /*  bodyStyle={100} */
       style={{position:'relative',top:10}} 
        >
    
       <Descriptions title="TICKET Info" layout="vertical" bordered>
<Descriptions.Item label="Ticket Id" span={3}> {ticket.code}</Descriptions.Item>
<Descriptions.Item label="Ticket Status" span={2}> 

  {/* {isComplete ? (<Badge status="success" text="paid" />) : ( <Badge status="error" text="Unpaid" />)} */}
 
    {ticket.status == "WAITING" && ( <Badge status="error" text="WAITING" />)}
    {ticket.status == "PLAYED" && ( <Badge status="warning" text="PLAYED" />)}
    {ticket.status == "COMPLETED" && ( <Badge status="success" text="COMPLETED" />)}
  
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
