import React, {useState} from 'react'
import { Modal, Button, Input, Form, Select, InputNumber,Checkbox ,message, notification} from 'antd';
import TransactionService from 'services/TransactionService';
import { updateUser } from 'redux/actions/Auth';
import {useDispatch } from "react-redux";
import { 
  CreditCardOutlined,
  DollarOutlined,
  SwapOutlined
} from '@ant-design/icons';


function AddTransaction({user, setUserListUpdate, userListUpdate}) {

  const dispatch= useDispatch()

  const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};


  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)




  let [validateStatusPc, setValidateStatusPc] = useState("empty");
  let [validateStatusAmount, setValidateStatusAmount] = useState("empty");

  const [playercode, setPlayercode] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loadingDeposit, setLoadingDeposit] = useState(false)
  const [loadingWithdraw, setLoadingWithdraw] = useState(false)
  const showModal = () => {
   setVisible(true);
  };

  const handleOk = () =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
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
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const playerCodeHandler = (e) =>{
    setPlayercode(e.target.value);
    if(playercode.length >4){
      setValidateStatusPc("success")
    }else{
      setValidateStatusPc("error")
    }
  }




  const re = '/^[0-9\b]+$/;'

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
  if(type == 'credit'){
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
      if(type == 'credit'){
        setLoadingDeposit(false)
      }else{
        setLoadingWithdraw(false)
      }
      
  
    }else{
      notification.error({message : "Error fetching transactions ..." , duration :3});
    }
    
    }).catch((e)=> {
    //notification.error({message : "Error fetching transactions ..." , duration :3});
    setLoading(false)

     if(type == 'credit'){
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