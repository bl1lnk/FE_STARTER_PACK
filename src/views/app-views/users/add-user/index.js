import React,{useState} from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message, Row, Col,Card, Input, Select, InputNumber } from 'antd';
import Flex from 'components/shared-components/Flex'
import UserService from 'services/UserService';

const AddUser = () => {
	 const [username, setUsername] = useState(null)
	 const [password, setPassword] = useState(null)
	const [adnBtnLoading, setAdnBtnLoading] = useState(false)
	const [form] = Form.useForm();

	const rules = {
		username: [
			{
				required: true,
				message: 'Please enter username',
			}
		],
		balance: [
			{
				required: true,
				message: 'Please enter Balance',
			}
		],
		password: [
			{
				required: true,
				message: 'Please enter password',
			}
		]
		
	}

	const formReset = () =>{
		form.resetFields();
		setUsername(null)
		setPassword(null)
	}

	const AddUserHandler= ()=>{
		setAdnBtnLoading(true)
		UserService.addUser({
			"username" : username,
			"password" : password
		}).then((resp) => {
			if (resp.code == 200) {
				message.success('User added with success ! ');
				setAdnBtnLoading(false)
			}
		  }).catch((e)=> {
			console.log(e);
			setAdnBtnLoading(false)
			
		  })
	}

	return (
		<>
			<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Add New User</h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={formReset}>Discard</Button>
								<Button type="primary" onClick={AddUserHandler} htmlType="submit" /* loading={submitLoading} */ loading={adnBtnLoading}>
									ADD
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<Card className={"mt-5"}>
					<Form  name="form" form={form}>
						<Form.Item name="username" label="Username" rules={rules.username}>
							<Input placeholder="Username"  onChange={(e)=>setUsername(e.target.value)} value={username} />
						</Form.Item>

						<Form.Item name="password" label="Password" rules={rules.password} onChange={(e)=>setPassword(e.target.value)} value={password}>
							<Input.Password placeholder="Password" />
						</Form.Item>
					</Form>
			</Card>
		</>
	)
}

export default AddUser
