import React,{useState} from 'react'
import { Button,Modal,Descriptions, Badge, Timeline , message} from 'antd';
import {CheckOutlined } from '@ant-design/icons';
import styles from "./index.module.css"
import TicketService from 'services/TicketService';
import {useDispatch, useSelector} from "react-redux";
import { updateUser } from 'redux/actions/Auth';


export default function UpdateTicketModal({gameCode, currency, ticket, Headervisible, setHeaderVisible,roundsTotal}) {



  const [btnLoading, setAdnBtnLoading]= useState(false)


  const authVariables = useSelector((state) => state.auth);
  const {credit} = authVariables

  const dispatch= useDispatch()





 const handleCancel_Header = () =>{
  setHeaderVisible(false);
}

const PayeTicketHandler = () =>{
  setAdnBtnLoading(true)
		TicketService.updateTicket({code: gameCode }).then((resp) => {
			if (resp.code === 200) {
				message.success('Ticket is payed with success! ');
				setAdnBtnLoading(false)
        setHeaderVisible(false)
        dispatch(updateUser(credit+roundsTotal))
			}
		  }).catch((e)=> {
			console.log(e);
			setAdnBtnLoading(false)

			
		  }) 
	

}


  return (
    <Modal
    visible={Headervisible}
    title=""

    onCancel={handleCancel_Header}
    footer={null}
  >


<Descriptions title="Game Info" layout="vertical" bordered>
<Descriptions.Item label="Ticket Id" span={3}> {gameCode}</Descriptions.Item>
<Descriptions.Item label="Ticket status" span={2}> 
    {ticket[0] && ticket[0].status === "WAITING" && ( <Badge status="error" text="WAITING" />)}
    {ticket[0] && ticket[0].status === "OVER" && ( <Badge status="warning" text="PLAYED" />)}
    {ticket[0] && ticket[0].status === "COMPLETED" && ( <Badge status="success" text="PAYED" />)}
    {ticket[0] && ticket[0].status === "PLAYED" && ( <Badge status="primary" text="IN PLAY" />)}
  </Descriptions.Item>
  {ticket[0] && ticket[0].status === "OVER" && (<Descriptions.Item label="Update ticket ">   <Button  onClick={PayeTicketHandler} className={styles.updateTicket}  loading={btnLoading}>  <CheckOutlined /> PAYEE</Button></Descriptions.Item>)}
<Descriptions.Item label="TOTAL" span={3}> <strong><i>{roundsTotal}  {currency}</i></strong></Descriptions.Item>

<Descriptions.Item label="Rounds" span={3}>
<Timeline>

  {ticket[0] && ticket.map((tickdata, i)=>(
    <>
    <Timeline.Item key={tickdata.id * 504}><span style={{color:"#fff"}}>Round : {i+1} </span></Timeline.Item>
    {ticket[0] && tickdata.prix >0 
     ? (<Timeline.Item key={tickdata.id *6078}><span style={{color:"green"}}>Prix : {ticket[0] && tickdata.prix} {currency}</span></Timeline.Item>)
     : (<Timeline.Item key={tickdata.id *6078}><span style={{color:"gray"}}>Prix : {ticket[0] && tickdata.prix}  </span></Timeline.Item>)}
     
    </>
   
  ))}

  </Timeline>
</Descriptions.Item >
  
</Descriptions>

    </Modal>
  )
}
