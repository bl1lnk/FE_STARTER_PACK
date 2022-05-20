/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag,DatePicker, Statistic, notification  } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment-timezone'; 
import utils from 'utils'
import TransactionService from 'services/TransactionService';
import { currency } from 'configs/EnvironmentConfig';


const { Option } = Select
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm"';


function onOk(value) {

}




const paymentStatusList = ['debit', 'credit']




 const now = new Date();

const Transactions = () => {

	const [list, setList] = useState([])
	const [backUpList, setBackUpList] = useState([])
	
	/// time date 
	let now = moment()
	
	const [firstDayOfMonth, setFirstDayOfMonth]= useState(moment().clone().startOf('month').tz('Africa/Tunis').set("hour", '8').format('YYYY-MM-DD hh:mm'))
	const [lastDayOfMonth, setLastDayOfMonth] = useState(moment().clone().endOf('month').tz('Africa/Tunis').set("hour", '8').format('YYYY-MM-DD hh:mm'))

	const [totalCredit, setTotalCredit] = useState(0)
	const [totalDebit, setTotalDebit] = useState(0)
	const [updateShowTot, setUpdateShowTot] = useState(0)
	// table loading
	const [loading, setLoading] = useState(false)

	const handleShowStatus = value => {
	
			if(value !== 'All'){
				const key =  'type'
				const data = utils.filterArray(backUpList, key, value)
		
				setList(data) 
			}else{
				setList(backUpList)
			}
	}

	const RangePickerChangeHandler = (value, dateString) =>{

		setFirstDayOfMonth(dateString[0])
		setLastDayOfMonth(dateString[1])
		
		
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item>
				<Flex alignItems="center">
					<PlusCircleOutlined />
					<span className="ml-2">Add to remark</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Sender',
			dataIndex: 'Sender',
			
			sorter: (a, b) => utils.antdTableSorter(a, b, 'Sender')
		},
		{
			title: 'Receiver',
			dataIndex: 'Receiver',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'Receiver')
		},
		{
			title: 'Transacted dAt',
			dataIndex: 'transactAt',
			render: transactAt => (
				<div>
					{moment(transactAt).format('MMMM d, YYYY, HH:MM')}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'transactAt')
		},
		{
			title: 'Transaction type',
			dataIndex: 'type',
			render:value => (
				<div>
					 { value == 'credit' ? (      <Tag color="green">{value}</Tag>):<Tag color="gold">{value}</Tag>}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'type')
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			render:value => (
				<div>
						{value} {currency}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
		}
	];
	


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : backUpList
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setUpdateShowTot(updateShowTot+1)
		
	}


	const calculateTotal= (data)=>{
		let totcredit = 0;
		let totdebit =0;
		data.map((txn)=>{
			if(txn.type == 'credit'){
				setTotalCredit(totalCredit+txn.amount)
				totcredit += txn.amount
		
			} else if(txn.type=='debit'){
				totdebit += txn.amount
			}else{
				console.error('error:calculateTotal')
			}
			setTotalDebit(totdebit)
			setTotalCredit(totcredit)		
		})
	}

	useEffect(()=>{
		setLoading(true)
		TransactionService.getAllTransactions({
			"start" : firstDayOfMonth,
			"end" : lastDayOfMonth
		}).then((resp) => {

			
			if (resp.status === 'success') {
				setList(resp.data)
				setBackUpList(resp.data)
		
				calculateTotal(resp.data)
				setLoading(false)
			}else{
				notification.error({message : "Error fetching transactions ..." , duration :3});
			}
			
		  }).catch((e)=> {
			notification.error({message : "Error fetching transactions ..." , duration :3});
			setLoading(false)
		  })
	},[firstDayOfMonth, lastDayOfMonth])


	//total credit total debit
	useEffect(()=>{
			if(list){
				calculateTotal(list)
			}

	},[updateShowTot,firstDayOfMonth,lastDayOfMonth])

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">All Transactions </Option>
							{paymentStatusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</div>

                    <div className="ml-3">
          
                     
                        <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['Start Time', 'End Time']}
                        onChange={RangePickerChangeHandler}
                        onOk={onOk}
						defaultValue={[moment(lastDayOfMonth, dateFormat), moment(firstDayOfMonth, dateFormat)]}
                        />
                     </div>
				
                

				</Flex>
			
			</Flex>
			<Card style={{background:"#213743"}}>
				<Flex alignItems="left" justifyContent="left" mobileFlex={false} > 
				<span style={{marginLeft:50}}>
					<Statistic prefix="Total Credit : " value={totalCredit} suffix={"TND"} valueStyle={{fontSize:'15px', fontWeight:700}}  loading={loading}/>
				</span>
				<span style={{marginLeft:50}}>
				<Statistic prefix="Total Debit :" value={totalDebit} suffix={"TND"}valueStyle={{fontSize:'15px',fontWeight:700}} loading={loading} />
				</span>
				</Flex>
			</Card>
			
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					loading={loading}
				/>
			</div>
		</Card>
	)
}

export default Transactions
