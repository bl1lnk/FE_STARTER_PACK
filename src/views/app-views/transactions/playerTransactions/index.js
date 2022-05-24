import React, {useState,useEffect} from 'react'
import { Card, Table, Input, Button, Tag,DatePicker,  notification, Statistic  } from 'antd';
import {FundProjectionScreenOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment-timezone'; 
import utils from 'utils'
import TransactionService from "services/TransactionService"
import PrintOldTicketModal from './PrintOldTicketModal';
import { currency } from 'configs/EnvironmentConfig';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm"';






const PlayerTransactions = () => {


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
	

	


	

	const oldTicketHandler = (value) =>{
		setOldTicketInformation(value)
		setvisible_OTM(true)
	}
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
				  { status === 'WAITING' && <Tag color="gold">Not played</Tag>}
				  { status === 'OVER' && <Tag color="red"> Played</Tag>}
				  { status === 'COMPLETED' && <Tag color="green">Paid</Tag>}
				  { status === 'PLAYED' && <Tag color="pink">In Play</Tag>}
				</>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
			/* defaultSortOrder  :'descend' */
		},
		{
			title: '',
			dataIndex: '',
			render: (value, code) => (
				
				<div>
			{/* 	<Child ref={childRef}  key={value.code} user={value} />
				
				<Button onClick={() => childRef.current.Print(value)}><PrinterOutlined /></Button>	 */}
				<PrintOldTicketModal  visibleOTM={visible_OTM} setVisibleOTM={setvisible_OTM}  ticket ={oldTicketInformation} currency={currency}/>
				<Button onClick={()=>oldTicketHandler(value)}><FundProjectionScreenOutlined /></Button>
			  </div>
		
			),
			
		},
		

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
