import React,{useState,useRef} from 'react'
import { Button, Card, Row, Col, Input,Modal, Badge,Form, Timeline, Descriptions, message, Divider} from 'antd';
import style_pwd from './index.module.css'
import UserService from 'services/UserService';
import { currency } from 'configs/EnvironmentConfig';
import NumberFormat from 'react-number-format';


function ChangePasswordModal({setVisible,visible, user}) {
    
const [loading, setLoading] = useState(false)


const bet =5

const rounds = 500
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


 // PRINTER VARIABLES 

 const componentRef = useRef();

 const handlePrint= () =>{
 }

 const isConfirmPassword = (password1, password2) =>{
   
  if(password1 != password2){
    return false
  }
  return true
}


 const onFinish = values => {
   console.log(values)
  let ok = isConfirmPassword(values.password, values.password2)
  if(ok){

     if(user){
        UserService.subChangePassword({
            "userId":user.id,
            "password":values.password
          }).then((resp) => {
                if(resp.code == 200){
              message.success(resp.data[0])
            }
                }).catch((e)=> {
                  console.log(e);
                }) 
     }else{
        UserService.changePassword({
            "currentPassword":values.oldpassword,
            "newPassword":values.password2
          }).then((resp) => {
                if(resp.code == 200){
              message.success(resp.data[0])
            }
                }).catch((e)=> {
                  console.log(e);
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
    onOk={handleOk}
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
        <Button type="primary" htmlType="submit" className={style_pwd.addButton} >
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