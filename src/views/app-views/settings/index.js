import React,{useEffect, useState} from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Form, Button,Card, Input, Tag, Row, Col, message  } from 'antd';
import{DeleteOutlined} from '@ant-design/icons'
import Flex from 'components/shared-components/Flex'
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import SettingService from 'services/SettingService';
import Loading from 'components/shared-components/Loading';


const Settings = () => {
  const [settings , setSettings] = useState([]);
  const [wining_percentage, setWinning_percentage] = useState([]) 
  const [wRounds, setWRounds] = useState([])
  const [loading , setLoading] = useState(true);
  const [updateWinPercView, setUpdateWinPercView] = useState(0)
  const [form] = Form.useForm();

  const [btnForm, setBtnForm] =useState(false)

  const[inputVisible, setInputVisible] = useState(false);
  const [inputValue, SetInputValue] = useState("");
  useEffect(()=> {
	
    SettingService.AllSetting().then((resp)=> {
      setSettings(resp.data);
      setWinning_percentage(resp.data.wining_percentage)
      setLoading(false);
	  setWRounds(resp.data.wining_rounds)

    })
    .catch((e) => {
      setLoading(false);
      console.log(e);
	
    })
  },[updateWinPercView])



  if(loading){
    return <Loading cover='content'/>
  }

/*   const fieldsArray= [{"name":"99","fieldKey":"56" }, {"name":"100","fieldKey":"66" },{"name":"100","fieldKey":"7" }] */
 



const updateWining_percentage_field = (index, name, value,e, type) =>{

	let newOBJ = {};

	 if(type === 'name'){
		let strE =e.target.value
		let val = wining_percentage[index][name] ? wining_percentage[index][name] : value
		newOBJ[strE] = val
		wining_percentage[index] = newOBJ
		setWinning_percentage(wining_percentage)
	
	
	 }

	 if(type ==='value'){
		 let nam = Object.keys(wining_percentage[index]) ? Object.keys(wining_percentage[index]) : name
		newOBJ[nam] =parseInt(e.target.value)
		
		wining_percentage[index] = newOBJ
		setWinning_percentage(wining_percentage)
		console.log('changing value of object',wining_percentage);
	 }


	 settings.wining_percentage = wining_percentage
	
  }
 
  
const addWinPercentageField  =()=>{
  setWinning_percentage([...wining_percentage, {"0":0}])
}



/* tags */
const showInput = () =>{
	setInputVisible(true); 
}
const handleInputChange = (e) =>{
	SetInputValue(e.target.value)
}
const handleInputConfirm = (e) =>{
	if(inputValue && wRounds.indexOf(inputValue) === -1){
	
	   setWRounds(prevArray =>[...prevArray, parseInt(inputValue)])
	   console.log('hello');
	}
}

const deleteWinPercentHandler = (index) =>{
	const list = [...wining_percentage];
	list.splice(index, 1);
	setWinning_percentage(list)
  }
  
  const calculate100percent = (obj) =>{
	let result = 0;
	obj.map((value, index)=>{
		let keyname = Object.keys(value)
		result = result + value[keyname]
	})
	return result
}


const  RoundsCloseHandler = (value, index) =>{

		let newRounds = wRounds;
		var idx = wRounds.indexOf(value)
		if (idx >= 0) {
			newRounds.splice(idx, 1);
		}
     setWRounds(newRounds)
}

const onFinishHandler = (values) =>{
	//update burns
	if(values.burn_jackpot){
		settings.burn_jackpot = values.burn_jackpot
	}
	if(values.burn_sold){
		settings.burn_sold = values.burn_sold
	}
	
	//update banks
	if(values.jackpot1){
		settings.banks.jackpot1 = values.jackpot1
	}
	if(values.jackpot2){
		settings.banks.jackpot2 = values.jackpot2
	}
	if(values.jackpot3){
		settings.banks.jackpot1 = values.jackpot3
	}
 settings.banks.map((bank, index)=>{
	let keyName = Object.keys(bank)

	 if(values.[keyName]){
	
		settings.banks.[index][keyName] = values.[keyName]
	}  
})
	settings.wining_rounds = wRounds
	setSettings(settings)
	let verif100 = calculate100percent(wining_percentage)
	if(verif100 !== 100){
		message.error(`excepted 100% received ${verif100} %`);
		return
	}
	// send request
	setBtnForm(true)
	SettingService.update(settings).then((resp) => {
		if (resp.code === 200) {
			message.success('update  with success! ');
		
			setUpdateWinPercView(updateWinPercView+1) 
		}
		setBtnForm(false)
	  }).catch((e)=> {
		console.log(e);
		setBtnForm(false)
	  }) 
	  
}
	return (
		<>
			<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Settings</h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={()=>form.resetFields()} >Discard</Button>
								<Button type="primary"   onClick={()=>form.submit()} loading={btnForm}htmlType="submit"   >
									 change
								</Button>
							</div>
						
						</Flex>
					</div>
				</PageHeaderAlt>
        <Form form={form} onFinish={values=>onFinishHandler(values)} >

		<Card title="BURN" className='mt-5'>
			<Form.Item name="burn_jackpot" label="jackpot" >
			<Input  defaultValue={settings.burn_jackpot} value={settings.burn_jackpot} />
			</Form.Item>
			<Form.Item name="burn_sold" label="sold"  className="ml-3">
          	<Input defaultValue={settings.burn_sold}  value={settings.burn_sold}/>
        </Form.Item>
		</Card>

		 <Card title="BANKS">
				<Row>
					{settings.banks.map((value, index)=>{
							let keyName =  Object.keys(value)
						return(
							<Col span={6} order={4} key={index}>
								<Form.Item name={keyName}  label={keyName}  className='m-2'>
									<Input  defaultValue={(parseFloat(value[keyName])).toFixed(2)}  value={parseFloat(value[keyName])} />
								</Form.Item>
								
						  </Col>)

					})}
				
			</Row>
		 </Card>
          <Card title="Wining Rounds" >

            
                <TweenOneGroup
                  enter={{
                  opacity: 0,
                  type: 'from',
                  duration: 100,
                  onComplete: e => {
                  e.target.style = '';          
                },
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
              >
                {
                  wRounds.map((vlaue)=> {
                    return (
                      <Tag className="m-2" color="orange" closable onClose={()=>RoundsCloseHandler(vlaue)}> <span>{vlaue}</span></Tag>
                    )
                  })
                }
              </TweenOneGroup>

				{inputVisible && (
			<Input
			//ref={saveInputRef}
			type="number"
			style={{ width: 78 }}
			value={inputValue}
			onChange={handleInputChange}
			onPressEnter={handleInputConfirm}
			onKeyPress={(event) => {
				if (!/[0-9]/.test(event.key)) {
					event.preventDefault();
				}
				}}
			/>
		)}
		{!inputVisible && (
		<Tag onClick={showInput} className="site-tag-plus">

			<PlusOutlined /> New Round Number
		</Tag>
	
		)}

          {/* *************************** */}
         
          </Card>
			
			
          <Card title="Winning percentage">
				<Row>
					{wining_percentage.map((field, index)=>{
							var keyNames = Object.keys(field)
					return(
						<Col span={5} order={4}>
							<Card style={{background:'#2f4553',textAlign:'center'}} className='m-1'>
								<Form.Item name={'percentage'+keyNames+index+field[keyNames]} className='m-0 p-0 mb-1'>
									<Input
									defaultValue={keyNames}
									value={keyNames}
									onChange={(e)=>updateWining_percentage_field(index, keyNames, field[keyNames],e,'name')}
									/>
								</Form.Item>
								<Form.Item name={'percentage'+field[keyNames]+index+1+'val'} className='m-0 p-0'>
										<Input
											prefix={'%'}
											defaultValue={field[keyNames]}
											onChange={(e)=>updateWining_percentage_field(index, keyNames, field[keyNames],e,'value')}
											value={field[keyNames]}
										/>
								</Form.Item>
								<DeleteOutlined  style={{color:'red'}} onClick={()=>deleteWinPercentHandler(index)} />
							</Card>
					</Col>
					
					)
					
					})}
				
				</Row>
				<Button type="dashed" className="w-100"  onClick={() => {addWinPercentageField();}}>
						<PlusOutlined /> Add field
				</Button>
	
          </Card>
        
        </Form>
		</>
	)
}

export default Settings
