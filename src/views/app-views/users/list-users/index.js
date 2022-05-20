import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Alert, Tag, Popconfirm, message } from 'antd';
import UsersListData from "./user-list.data.json"
import { SwapOutlined , EyeInvisibleOutlined, SearchOutlined, PlusCircleOutlined,EyeOutlined,EditOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import AddTransaction from 'views/app-views/transactions/addTransaction';
import { ROLE_COMERCIAL, ROLE_MASTER } from 'redux/constants/Auth';
import {useSelector } from "react-redux";
import ChangePasswordModal from '../changePasswordModal/ChangePasswordModal';
import UserService from 'services/UserService';



const { Option } = Select

const UserList = () => {

	const [visible, setVisible] = useState(false);
	const [visibleStatus, setVisibleStatus] = useState(false);

	const [updateViewInStatusChange, setUpdateViewInStatusChange] = useState(0)

	let history = useHistory();

	

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [userPerRow, setUserPerRow] = useState(null)

	const [users, setUsers] = useState([])
	const [usersBackup, setUsersBackup] = useState([])
	

	const [userListUpdate, setUserListUpdate] = useState(1)


	//table loading
	const [loading, setLoading] = useState(false)

	const changePasswordHandle = (row) =>{
		setUserPerRow(row)
		setVisible(true)
	}
	const getStatusStatus = status => {
	if(status == true) {
		return <><Tag color="lime">Active</Tag>
		</>
	}else{
		return <><Tag color="red">Blocked</Tag>

		</>
	}
	return null
}
	const dropdownMenu = row => (
		
		<Menu>
			<Menu.Item onClick={() => changePasswordHandle(row)}>
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Edit Password</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => modifierStatus(row)}>
				<Flex alignItems="center">
					<Popconfirm
						title="Are you sure you want to change this user status ?"
						onConfirm={() => changeStatusHandler(row.id , !row.isActive)}
						onCancel={() => {}}
						okText="Yes"
						cancelText="No"
					>
					
						<span className="ml-2">{selectedRows.length > 0 ? `Disable Account (${selectedRows.length})` :  row.isActive ? (<><EyeInvisibleOutlined />  Disable</>) : (<><EyeOutlined />   Enable</>)  }</span>
					</Popconfirm>
					
				</Flex>
			</Menu.Item>
		
			<Menu.Item >
				<Flex alignItems="center">
					{/* <SwapOutlined /> */}
				 	<AddTransaction  user={row} setUserListUpdate={setUserListUpdate} userListUpdate={userListUpdate} />		
				</Flex>
			</Menu.Item>
		
		
			
		</Menu>
	);
	
	const addUser = () => {
		history.push(`/app/users/add-user`)
	}
	
	const viewDetails = row => {
		history.push(`/app/apps/users/edit-user/${row.id}`)
	}
	
	const modifierStatus = row => {
	
		setVisibleStatus(true)
		setUserPerRow(row)
	}

	const changeStatusHandler = ( userId , status ) =>{
		let statusString
	  
		UserService.ChangeStatus({
		  "userId": userId,
		  "active": status
		}).then((resp) => {
			  if(resp.code == 200){
			message.success(resp.data[0])
			setUpdateViewInStatusChange(updateViewInStatusChange+1)
		  }
			  }).catch((e)=> {
				console.log(e);
			  }) 
		
	  }

	
	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
		},
		{
			title: 'Username',
			dataIndex: 'username',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'username')
		},
        {
			title: 'Balance',
			dataIndex: 'credit',
			render : (credit , elm) => ( 
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(credit * 100) / 100).toFixed(2)} 
						suffix={'TND'} 
						thousandSeparator={true} 
					/>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'credit')
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: isActive => (
				<div>
					 {isActive  && (<Tag color="lime">Active</Tag>) }
					 {!isActive  && (<Tag color="red">Blocked</Tag>) }
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'isActive')
		},

		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}

	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? users : usersBackup
		const data = utils.wildCardSearch(searchArray, value)
		setUsers(data)
	
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'isActive'
			const data = utils.filterArray(UsersListData, key, value)
			setUsers(data)
		} else {
			setUsers(usersBackup)
		}
	}

	useEffect(()=>{
	
		setLoading(true)
		  UserService.users({}).then((resp) => {
			if (resp.code == 200) {
			 
			
				console.log('users',resp.data);
			
				/* let data = resp.data
				let ArrayUsers= []
				 resp.data.map(value=>{
					ArrayUsers.push(value)
					if(value.subUsers){
						value.subUsers.map(val=>{
							ArrayUsers.push(val)
						})
					}

					if(value.subUsers.subUsers){
						value.subUsers.subUsers.map(val=>{
							ArrayUsers.push(val)
						})
					}					
				 }) */
				 
			/* 
				 setUsers(ArrayUsers)
				 setUsersBackup(ArrayUsers) */
				 setUsers(resp.data)
				 setUsersBackup(resp.data)
				setLoading(false)
			
			}
		  }).catch((e)=> {
			console.log(e);
			setLoading(false)
		  }) 
	
	},[ChangePasswordModal,userListUpdate,updateViewInStatusChange ])
	

	return (
		<Card>
     
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
					{/* 	<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"

						>
							<Option value="All">Users </Option>
							{usersStatus.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select> */}
					</div>
				</Flex>
				<div>
					<Button onClick={addUser} type="primary" icon={<PlusCircleOutlined />} block>Add User</Button>
				</div>
				<ChangePasswordModal  visible={visible} setVisible={(v)=>setVisible(v)} user={userPerRow}/>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={users} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/* 	sortDirections='descend' */
				
					loading = {loading}
					
				/>
			</div>
		</Card>
	)
}

export default UserList
