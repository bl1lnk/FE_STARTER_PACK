/* eslint-disable no-unused-vars */
import React, {useState,useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag,DatePicker, Descriptions, Row, notification, Statistic  } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import { EyeOutlined, FundProjectionScreenOutlined, SearchOutlined, BorderlessTableOutlined,TrophyOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment-timezone'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import TransactionService from "services/TransactionService"
import { currency } from 'configs/EnvironmentConfig';
const { Option } = Select
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm"';

function onChange(value, dateString) {

}

function onOk(value) {

}




const PlayerTransactions = () => {
	const childRef = useRef();

/* 	const dateFormat = 'YYYY-MM-DD HH:mm';
	const time =  moment().tz('Africa/Tunis').format('LLLL') */


	const [startTimeOfTheDay, setStartTimeOfTheDay]= useState(moment().clone().startOf('day').tz('Africa/Tunis').set("hour", '8').format('YYYY-MM-DD hh:mm'))
	const [endTimeOfTheDay, setEndTimeOfTheDay] = useState(moment().clone().endOf('month').tz('Africa/Tunis').format('YYYY-MM-DD hh:mm'))

	const [list, setList] = useState([])
	const [backUpList, setBackUpList] = useState([])

    


	const [visible_OTM, setvisible_OTM] = useState(false)
	const [oldTicketInformation,setOldTicketInformation] = useState({})

	//table loading
	const [loading, setLoading] = useState(false)

	const [totalWinnedRounds, setTotalWinnedRounds] = useState(0)
	const [totalRounds, setTotalRounds]= useState(0)
	

	

	

	const tableColumns = [
		{
			title: 'Ticket code',
			dataIndex: 'code',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'code'),
		},
		{
			title: 'Ticket Price',
			dataIndex: 'played',
			render: value => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(value * 100) / 100).toFixed(2)} 
						suffix ={currency} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'played')
		},
		{
			title: 'Win Prize',
			dataIndex: 'winned',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price * 100) / 100).toFixed(2)} 
						suffix ={' TND'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'winned')
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: status => (
				<>
				  { status == 'WAITING' && <Tag color="gold">Not played</Tag>}
				  { status == 'OVER' && <Tag color="red"> Played</Tag>}
				  { status == 'COMPLETED' && <Tag color="green">Paid</Tag>}
				  { status == 'PLAYED' && <Tag color="pink">In Play</Tag>}
				</>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
			/* defaultSortOrder  :'descend' */
		}
		

	];
	


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : backUpList
		const data = utils.wildCardSearch(searchArray, value)
	
		setList(data)
	
	}

	
	const RangePickerChangeHandler = (value, dateString) =>{
			setStartTimeOfTheDay(dateString[0])
			setEndTimeOfTheDay(dateString[1])
			
		}

		
		const calculateTotal= (data)=>{
			/* let totalRounds = 0;
			let totalWins =0;
			data.map((txn)=>{
		
				totalRounds += txn.rounds
			
				totalWins += (txn.winned * txn.bet)
			})
			setTotalWinning(totalWins)
			setTotalRounds(totalRounds)	
		 */
		}

		
	useEffect(()=>{
		setLoading(true)
		TransactionService.getPlayersTransactions({
		    "start" : startTimeOfTheDay,
    		"end" : endTimeOfTheDay
		}).then((resp) => {

			if (resp.status === 'success') {
				setList(resp.data.playedTickets)
				setBackUpList(resp.data.playedTickets) 
				setTotalRounds(resp.data.played)
				setTotalWinnedRounds(resp.data.winned)
				setLoading(false)
			
			}else{
			  notification.error({message : "Error fetching transactions ..." , duration :3});
			}
			
		  }).catch((e)=> {
			notification.error({message : "Error fetching transactions ..." , duration :3});
			setLoading(false)
			console.log(e);
		  })
	},[startTimeOfTheDay, endTimeOfTheDay])

	

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
					<Statistic value={totalRounds}   prefix={"In:"} suffix={currency} valueStyle={{fontSize:'15px', fontWeight:700}} loading={loading} />
				</span>
				<span style={{marginLeft:50}}>
				<Statistic  value={totalWinnedRounds}  prefix={"Out:"} suffix={currency} valueStyle={{fontSize:'15px',fontWeight:700}} loading={loading} />
				</span>
				<span style={{marginLeft:50}}>
				<Statistic  value={totalRounds-totalWinnedRounds}  prefix={"Profit:"} suffix={currency} valueStyle={{fontSize:'15px',fontWeight:700}} loading={loading} />
				</span>
     {/*    <span style={{marginLeft:50}}>
				<Statistic prefix="Movement :" value={10} suffix={"TND"}valueStyle={{fontSize:'15px',fontWeight:700}}  />
				</span> */}
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

export default PlayerTransactions
