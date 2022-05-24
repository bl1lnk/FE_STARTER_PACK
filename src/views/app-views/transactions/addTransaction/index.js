import React, {useState} from 'react'
import { Modal, Button, Input, Form ,message, } from 'antd';
import TransactionService from 'services/TransactionService';
import { updateUser } from 'redux/actions/Auth';
import {useDispatch } from "react-redux";
import { 
  SwapOutlined
} from '@ant-design/icons';

function AddTransaction({user, setUserListUpdate, userListUpdate}) {

  const dispatch= useDispatch()


  const [visible, setVisible] = useState(false)

  let [validateStatusAmount, setValidateStatusAmount] = useState("empty");


  const [amount, setAmount] = useState(0);
  const [loadingDeposit, setLoadingDeposit] = useState(false)
  const [loadingWithdraw, setLoadingWithdraw] = useState(false)
  const showModal = () => {
   setVisible(true);
  };

  const handleOk = () =>{
    setTimeout(()=>{
      setVisible(false);
    });
  }

  const handleCancel = () =>{
      setVisible(false);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
 
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

 






  const playerAmountHandler = (e) =>{
    
   
       setAmount(e.target.value)



    let amountLEngth = String(e.target.value).length;
   
    if( parseInt(amountLEngth)> 0){
      setValidateStatusAmount("success")
    }else{
      setValidateStatusAmount("error")
    } 
}

const addTransaction = (type) =>{
  if(type === 'credit'){
    setLoadingDeposit(true)
  }else{
    setLoadingWithdraw(true)
  }
  TransactionService.addTransaction({
    "reciverId" : user.id,
    "amount" :  amount,
    "type" : type
  }).then((resp) => {

    
    if (resp.status === 'success') {
   
      setUserListUpdate(userListUpdate+1)
      dispatch(updateUser(resp.data.senderCreditAfter))
      setVisible(false)
      message.success(`${type}  ${amount} DT to ${user.username}  success! `);
      if(type === 'credit'){
        setLoadingDeposit(false)
      }else{
        setLoadingWithdraw(false)
      }
      
  
    }
    
    }).catch(()=> {
 


     if(type === 'credit'){
        setLoadingDeposit(false)
      }else{
        setLoadingWithdraw(false)
      }
      
    })
   
}

  return (
    
    <>
      
      <span className="ml-2"  onClick={showModal} style={{display:'inline-block'}}> <SwapOutlined /> Add Transaction</span>
        <Modal
          centered={true} 
         
          visible={visible}
          title="Add Transaction"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            
            <Button type="primary" htmlType="submit" onClick={()=>addTransaction('credit')} loading={loadingDeposit}>
          Deposit
        </Button>,
            <Button  type="danger" htmlType="submit" className="bt btn-success ml-3" onClick={()=>addTransaction('debit')}  loading={loadingWithdraw}> 
          Withdraw
        </Button>,

          
          ]}
        >
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
   
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Please input your amount!' }]}
        hasFeedback
        validateStatus={validateStatusAmount}
      >
        <Input
          style={{width:"100%"}} 
          placeholder="amount to transact"
          value={amount}
          onChange={playerAmountHandler}
        />
      </Form.Item>

    </Form>
        </Modal>
      </>
  )
}

export default AddTransaction