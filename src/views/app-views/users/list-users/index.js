import React, {useState, useEffect} from 'react'
import { Card, Table, Input, Button, Menu, Tag, Popconfirm, message } from 'antd';
import {EyeInvisibleOutlined, SearchOutlined, PlusCircleOutlined,EyeOutlined,EditOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import AddTransaction from 'views/app-views/transactions/addTransaction';


import ChangePasswordModal from '../changePasswordModal/ChangePasswordModal';
import UserService from 'services/UserService';





const UserList = () => {

	const [visible, setVisible] = useState(false);


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
	

	
	const modifierStatus = row => {

		setUserPerRow(row)
	}

	const changeStatusHandler = ( userId , status ) =>{
	
	  
		UserService.ChangeStatus({
		  "userId": userId,
		  "active": status
		}).then((resp) => {
			  if(resp.code === 200){
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

	useEffect(()=>{
	
		setLoading(true)
		  UserService.users({}).then((resp) => {
			if (resp.code === 200) {
			 
			
				console.log('users',resp.data);
			
				
				 setUsers(resp.data)
				 setUsersBackup(resp.data)
				setLoading(false)
			
			}
		  }).catch((e)=> {
			console.log(e);
			setLoading(false)
		  }) 
	
	},[userListUpdate,updateViewInStatusChange ])
	

	return (
		<Card>
     
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
				
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
