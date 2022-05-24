import React,{useState} from 'react'
import { Button, Card,Input,Modal, Form,  Descriptions, message} from 'antd';
import style_pwd from './index.module.css'
import UserService from 'services/UserService';

import NumberFormat from 'react-number-format';


function ChangePasswordModal({setVisible,visible, user}) {
    
  const [changePwdBtn, setChangePwdBTn] = useState(false)

 const handleCancel = () =>{
     setVisible(false);
 }



 const isConfirmPassword = (password1, password2) =>{
   
  if(password1 !== password2){
    return false
  }
  return true
}


 const onFinish = values => {
   console.log(values)
  let ok = isConfirmPassword(values.password, values.password2)
  if(ok){
    setChangePwdBTn(true)
     if(user){
        UserService.subChangePassword({
            "userId":user.id,
            "password":values.password
          }).then((resp) => {
                if(resp.code === 200){
              message.success(resp.data[0])
              setChangePwdBTn(false)
              setVisible(false)
            }
                }).catch((e)=> {
                  console.log(e);
                  setChangePwdBTn(false)
                  setVisible(false)
                }) 
     }else{
        UserService.changePassword({
            "currentPassword":values.oldpassword,
            "newPassword":values.password2
          }).then((resp) => {
                if(resp.code === 200){
              message.success(resp.data[0])
              setChangePwdBTn(false)
              setVisible(false)
            }
                }).catch((e)=> {
                  console.log(e);
                  setChangePwdBTn(false)
                  setVisible(false)
                }) 
             
     }





  }else{
    message.error("Password missmatch !")
  }
};



const onFinishFailed = errorInfo => {

};


  return (
    <Modal
    visible={visible}
    title=""
 
    onCancel={handleCancel}
    footer={null}

  >



<Card  style={{background:'transparent'}}>


  {user && ( <Card bordered={false}  style={{background:'#2f4553'}}>


{/*  <ul className={style_pwd.userInfo_UL}>
    <li>ID: {user.id}</li>
   <li>{user.username}</li>
   <li className='mt-2'> credit :&nbsp; </li>
 </ul> */}
 <Descriptions border={false} layout="vertical" bordered>

{/*    <Descriptions.Item label="Ticket Id"> ASJ8S0TDU</Descriptions.Item> */}
<Descriptions.Item label="ID">{user.id}</Descriptions.Item>
<Descriptions.Item label="Username"> {user.username}</Descriptions.Item>

<Descriptions.Item label="Credit" span={3}>
<NumberFormat
						displayType={'text'} 
						value={(Math.round(user.credit * 100) / 100).toFixed(2)} 
						suffix={'TND'} 
						thousandSeparator={true} 
					/>

</Descriptions.Item>

{/*    <Descriptions.Item label="">
<span id="total"><i>TOTAL: &nbsp; &nbsp;4 DT</i></span>
</Descriptions.Item> */}
</Descriptions>


 </Card>)}
 


 <Card bordered={false}  style={{background:'#2f4553'}}>
<Form
      style={{padding:50}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     {!user && (   <Form.Item
        label="Old password"
        name="oldpassword"
        rules={[{ required: true, message: 'Please input your password!' }]}
      ><Input.Password />
      </Form.Item>)}
        
      <Form.Item
        label="New password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        label="New password"
        name="password2"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

  

      <Form.Item style={{marginLeft:"50%"}}>
        <Button type="primary" htmlType="submit" className={style_pwd.addButton}  loading={changePwdBtn}>
          Confirm
        </Button>
         
      </Form.Item>
    </Form>
    </Card>
</Card>
</Modal>
  )
}

export default ChangePasswordModal