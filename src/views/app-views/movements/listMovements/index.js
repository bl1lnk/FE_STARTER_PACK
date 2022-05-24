/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, DatePicker,notification, Statistic  } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import { SearchOutlined,  } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import moment from 'moment-timezone'; 
import utils from 'utils'

import MovementService from "services/TransactionService"
import { currency } from 'configs/EnvironmentConfig';


//DUMMY DATA



const { Option } = Select
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm"';

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}






const Movements = () => {
	/*  */

	const [startTimeOfTheDay, setStartTimeOfTheDay]= useState(moment().clone().startOf('day').tz('Africa/Tunis').set("hour", '8').format('YYYY-MM-DD hh:mm'))
	const [endTimeOfTheDay, setEndTimeOfTheDay] = useState(moment().clone().endOf('month').tz('Africa/Tunis').format('YYYY-MM-DD hh:mm'))

	const [list, setList] = useState([])
	const [backUpList, setBackUpList] = useState([])


	const [totalCredit, setTotalCredit] = useState(0)
	const [totalDebit, setTotalDebit] = useState(0)
	const [totalMov, setTotalMov] = useState(0)
	const [updateShowTot, setUpdateShowTot]= useState(0)
	//table loading
	const [loading, setLoading] = useState(false)
	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(OrderListData, key, value)
			setList(data)
		} else {
			setList(OrderListData)
		}
	}


	const tableColumns = [
	
		{
			title: 'User',
			dataIndex: 'username',
			sorter: (a, b) => utils.antdTableSorter(a,b, 'username')
		},
		{
			title: 'In',
			dataIndex: 'in',
			render:value => (
				<div>
						{value} {currency}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'in')
		},
		{
			title: 'Out',
			dataIndex: 'out',
			render:out => (
				<div>
						{out} {currency}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'out')
		},
		{
			title: 'Movement',
			dataIndex: '',
			render:data => (
				<div>
						{data.in - data.out} {currency}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'movement')
		}
	];
	
;

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : backUpList
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setUpdateShowTot(updateShowTot+1)

	}

	const RangePickerChangeHandler = (value, dateString) =>{
		setStartTimeOfTheDay(dateString[0])
		setEndTimeOfTheDay(dateString[1])
		
	}

	const calculateTotal= (data)=>{
		let totcredit = 0;
		let totdebit =0;
		data.map((txn)=>{
	
				totcredit += txn.in
				console.log('addeing to creidt', txn.amount, 'result:', totalCredit)
				totdebit += txn.out
		})
			
		setTotalDebit(totdebit)
		setTotalCredit(totcredit)	
		setTotalMov(totcredit-totdebit)	
	}

	useEffect(()=>{
		setLoading(true)
		MovementService.getPlayersTransactions({
			"start" : startTimeOfTheDay,
			"end" : endTimeOfTheDay
		}).then((resp) => {

			if (resp.status === 'success') {
				setList(resp.data)
				setBackUpList(resp.data)
				setLoading(false)
				calculateTotal(resp.data)  
			}else{
			  notification.error({message : "Error fetching transactions ..." , duration :3});
			}
			
		  }).catch((e)=> {
			console.log(e);
			setLoading(false)
		  })
	},[startTimeOfTheDay, endTimeOfTheDay])

	useEffect(() => {
			if(list){
				calculateTotal(list)  
			}
	}, [updateShowTot,startTimeOfTheDay,endTimeOfTheDay])
	
	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
				

                    <div className="ml-3">
          
                     
                        <RangePicker
                          showTime={{ format: 'HH:mm' }}
						  format="YYYY-MM-DD HH:mm"
						  placeholder={['Start Time', 'End Time']}
						  onChange={RangePickerChangeHandler}
						  onOk={onOk}
						  defaultValue={[moment(startTimeOfTheDay, dateFormat), moment(endTimeOfTheDay, dateFormat)]}
                        />
                     </div>
				</Flex>
			</Flex>

			<Card style={{background:"#213743"}}>
				<Flex alignItems="left" justifyContent="left" mobileFlex={false} > 
				<span style={{marginLeft:50}}>
					<Statistic prefix="Total Credit : " value={totalCredit} suffix={"TND"} valueStyle={{fontSize:'15px', fontWeight:700}} loading={loading}/>
				</span>
				<span style={{marginLeft:50}}>
				<Statistic prefix="Total Debit :" value={totalDebit} suffix={"TND"}valueStyle={{fontSize:'15px',fontWeight:700}}    loading={loading}/>
				</span>

				<span style={{marginLeft:50}}>
				<Statistic prefix="Total Movement :" value={totalMov} suffix={"TND"}valueStyle={{fontSize:'15px',fontWeight:700}}   loading={loading} />
				</span>
				</Flex>
			</Card>
			

			<div className="table-responsive" >
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id'   
					align="center"
					loading={loading}
				/>
			</div>
		</Card>
	)
}

export default Movements
