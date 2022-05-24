import React,{useState, useEffect, useRef} from 'react'
import { Button, Card, Row, Col, Input,Form, notification} from 'antd';
import {LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.css'

import TicketService from 'services/TicketService';
 import UpdateTicketModal from './UpdateTicketModal';
import ConfirmCreateTicketModal from './ConfirmCreateTicketModal'
import { currency } from 'configs/EnvironmentConfig';



function Index() {


 

  // ticket States
  const [ticket, setTicket] = useState([]);

  const [isComplete, setIsComplete] = useState(false)

  const [roundsTotal, setRoundsTotal] = useState(0)
  const [checkGamecodeLoading, setCheckGamecodeLoading] = useState(false)
  const [bet, setBet] = useState(null)
  const[rounds, setRounds] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)


  
  /* *******************    start  CSS USESTATE BACKGROUND  ACTIVE FOCUS   **************************************** */
  const initialCsstyle={
    button1:styles.mrButton,
    button2:styles.mrButton,
    button3:styles.mrButton,
    button4:styles.mrButton,
    button5:styles.mrButton,
    button6:styles.mrButton,
    button7:styles.mrButton,
    button8:styles.mrButton,
    button9:styles.mrButton,
  }

  const [buttonStyle, setButtonStyle]= useState({
    button1:styles.mrButton,
    button2:styles.mrButton,
    button3:styles.mrButton,
    button4:styles.mrButton,
    button5:styles.mrButton,
    button6:styles.mrButton,
    button7:styles.mrButton,
  })


  const [buttonStyleRound, setButtonStyleRound]= useState({
    button1:styles.mrButton,
    button2:styles.mrButton,
    button3:styles.mrButton,
    button4:styles.mrButton,
    button5:styles.mrButton,
    button6:styles.mrButton,
    button7:styles.mrButton,
    button8:styles.mrButton,
    button9:styles.mrButton,
  })

const [visible, setVisible] = useState(false)
const [Headervisible, setHeaderVisible] = useState(false)



  const [gameCode, SetGameCode]= useState("")
  const gameCodeHandler = (e) =>{
    SetGameCode(e.target.value)

  }


  const inputHeader_Ref= useRef();


  const ButtonBetHandler = (ButtonIndex, value) =>{
    setBet(value);
    switch (ButtonIndex) {
      case 1:
        setButtonStyle({...initialCsstyle, button1:styles.mrButtonActive});
        break;
      case 2:
        setButtonStyle({...initialCsstyle,button2:styles.mrButtonActive})
        break;
      case 3:
        setButtonStyle({...initialCsstyle,button3:styles.mrButtonActive})
        break;
      case 4:
        setButtonStyle({...initialCsstyle,button4:styles.mrButtonActive})
        break;
      case 5:
        setButtonStyle({...initialCsstyle,button5:styles.mrButtonActive})
        break;
      case 6:
        setButtonStyle({...initialCsstyle,button6:styles.mrButtonActive})
        break;
      case 7:
        setButtonStyle({...initialCsstyle,button7:styles.mrButtonActive})
        break;
      case 8:
        setButtonStyle({...initialCsstyle,button7:styles.mrButtonActive})
        break;
      case 9:
          setButtonStyle({...initialCsstyle,button7:styles.mrButtonActive})
            break;
      default:
        setButtonStyle({...initialCsstyle});
        break;
    }
  }


  const  ButtonRoundHandler= (ButtonIndex, value) =>{
    setRounds(value);
    switch (ButtonIndex) {
      case 1:
        setButtonStyleRound({...initialCsstyle,button1:styles.mrButtonActive})
        break;
      case 2:
        setButtonStyleRound({...initialCsstyle,button2:styles.mrButtonActive})
        break;
      case 3:
        setButtonStyleRound({...initialCsstyle,button3:styles.mrButtonActive})
        break;
      case 4:
        setButtonStyleRound({...initialCsstyle,button4:styles.mrButtonActive})
        break;
      case 5:
        setButtonStyleRound({...initialCsstyle,button5:styles.mrButtonActive})
        break;
      case 6:
        setButtonStyleRound({...initialCsstyle,button6:styles.mrButtonActive})
        break;
      case 7:
        setButtonStyleRound({...initialCsstyle,button7:styles.mrButtonActive})
        break;
      case 8:
        setButtonStyleRound({...initialCsstyle,button8:styles.mrButtonActive})
        break;
      case 9:
        setButtonStyleRound({...initialCsstyle,button9:styles.mrButtonActive})
        break;
      default:
        setButtonStyleRound({...initialCsstyle});
        break;
    }
  }


useEffect(()=> {
  

  inputHeader_Ref.current.focus();
  
  if(!rounds || !bet) {
    setIsDisabled(true)
  }else{
    setIsDisabled(false) 
  }
} , [bet , rounds])






const AddHandler = ()=>{
    showModal()
    
}

//modal states


const showModal = () => {
  setVisible(true);
 };

 const showModal_header= () =>{
   setHeaderVisible(true);
 }

 const handleOk = () =>{

   setTimeout(()=>{

     setVisible(false);
   });
 }




 // form variables
 const [form] = Form.useForm();

 const onFinish = (values) => {
  console.log('game code is utilite page', gameCode)
  TicketService.getTicket({ code: gameCode }).then((resp) => {
   
    setCheckGamecodeLoading(true)
    let totalr = 0;
    if (resp.code === 200) {
      showModal_header();
      setCheckGamecodeLoading(false)
      setTicket(resp.data)
        resp.data.forEach((ticktdata)=>{
        
    
          if(ticktdata.isComplete === true){
            setIsComplete(true)
          }
          totalr = totalr+ ticktdata.prix
      
        })
     
        setRoundsTotal(totalr)
      

    }else{
      setCheckGamecodeLoading(false);
      notification.error({message : "Ticket Not Found" , duration :3});
      
   /*    message.error("error not found") */
    }
    
  }).catch((e)=> {
    console.log(e);
  })



 
};




  return (
   
    <div style={{ background: '', padding: '30px' }}>
 
    <Row gutter={16}>

    <Col span={24}>
    {/* {checkGamecodeLoading && ( <Spin  />)} */}
        <Card className={styles.inputHeader} bordered={false}>
        <Form form={form} onFinish={onFinish}>
     
        <Form.Item name='gamecodeChecker'>
         {checkGamecodeLoading? 
         (<Input placeholder="Enter your game code .." 
              ref={inputHeader_Ref}
              allowClear onChange={gameCodeHandler}   
              suffix={<LoadingOutlined 
                className="site-form-item-icon" />}  
          />)
         :(<Input 
              placeholder="Enter your game code .." 
              ref={inputHeader_Ref}
              allowClear 
              
              onChange={gameCodeHandler} />)}
        </Form.Item>
    
        <Input  type="submit" value="ok" hidden={true}/>
       
        </Form>

        </Card>
      </Col>

      
      <Col span={12}>
        <Card title="Bet" bordered={false} style={{textAlign:'center'}}>

        <Button  className={buttonStyle.button1} onClick={()=> ButtonBetHandler(1 ,0.5)} >0.5 {currency}</Button>
        <Button  className={buttonStyle.button2} onClick={()=> ButtonBetHandler(2 ,1)} value="1">1 {currency}</Button>
        <Button  className={buttonStyle.button3} onClick={()=> ButtonBetHandler(3 ,2)} value="2">2 {currency}</Button>
        <Button  className={buttonStyle.button4} onClick={()=> ButtonBetHandler(4 ,3)} value="3">3 {currency}</Button>
        <Button  className={buttonStyle.button5} onClick={()=> ButtonBetHandler(5 ,5)} value="5">5 {currency}</Button>
        <Button  className={buttonStyle.button6} onClick={()=> ButtonBetHandler(6 ,10)} value="10">10 {currency}</Button>
        <Button  className={buttonStyle.button7} onClick={()=> ButtonBetHandler(7 ,20)} value="20">20 {currency}</Button>
        <Button  className={styles.buttonStyleDisabled} disabled={true}> &nbsp;</Button>
        <Button  className={styles.buttonStyleDisabled}  disabled={true}> &nbsp;</Button>


        </Card>
      </Col>
      
      <Col span={12}>
        <Card title="Rounds" bordered={false} style={{textAlign:'center'}}>
 
          <Button  className={buttonStyleRound.button1} onClick={() => ButtonRoundHandler(1,1)}  value="1"  >1</Button>
        <Button  className={buttonStyleRound.button2} onClick={()=>ButtonRoundHandler(2,2)} value="2">2</Button>
        <Button  className={buttonStyleRound.button3} onClick={()=>ButtonRoundHandler(3,3)} value="3">3</Button>
        <Button  className={buttonStyleRound.button4} onClick={()=>ButtonRoundHandler(4,4)} value="4">4</Button>
        <Button  className={buttonStyleRound.button5} onClick={()=>ButtonRoundHandler(5,5)} value="5">5</Button>
        <Button  className={buttonStyleRound.button6} onClick={()=>ButtonRoundHandler(6,10)} value="10">10</Button>
        <Button  className={buttonStyleRound.button7} onClick={()=>ButtonRoundHandler(7,20)} value="20">20</Button>
        <Button  className={buttonStyleRound.button8} onClick={()=>ButtonRoundHandler(8,50)} value="50">50</Button>
        <Button  className={buttonStyleRound.button9} onClick={()=>ButtonRoundHandler(9,100)} value="100">100</Button>
      
        </Card>
        
        <Button  className={styles.addButton} onClick={AddHandler} disabled={isDisabled}>
        
     {/*    <PlusOutlined /> */}
       Add 
    </Button>
      </Col>
   
    </Row>

{/* // THIS MODAL FOR SINGING IN  A NEW  GAME ( ROUND/BET ...) */}
    <ConfirmCreateTicketModal visible={visible} handleOk={handleOk} currency={currency} bet={bet} rounds={rounds} setVisible={setVisible} />

    <UpdateTicketModal  gameCode={gameCode} currency={currency} isComplete={isComplete}  ticket={ticket}  Headervisible={Headervisible} roundsTotal={roundsTotal} setHeaderVisible={setHeaderVisible}/> 
  {/*   <ChangePasswordModal visible={true} /> */}

{/*  THIS MODAL FOR HEADER INPUT WHERE U VERIFY TICKET CODE AND UPDATE IT  */}

     
  </div>
  )
}

export default Index