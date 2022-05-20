import React,{useState} from "react";
import { Menu, Dropdown, Avatar, Spin, } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined, 
  LockOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import JwtAuthService from "services/JwtAuthService";



const menuItem = [
	{

	}
]

export const NavProfile = ({signOut}) => {

  const [loadingSignout, setLoadingSignout] = useState(false)
  const [visible, setVisible] = useState(false)
  const history = useHistory();
  
  const signoutHandler =() =>{
    setLoadingSignout(true)
    history.push('/auth/login')
    
    JwtAuthService.signOut().then(()=>{
      signOut()
      setLoadingSignout(false)
    }).catch((e)=>{
      console.log(e);
      setLoadingSignout(false)
    })
  
  }
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">Charlie Howard</h4>
            <span className="text-muted">Frontend Developer</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
              
            );
          })}
         <Menu.Item key={menuItem.length + 1} onClick={()=> setVisible(true)}>
            <span >
              <LockOutlined className="mr-3"/>
              <span className="font-weight-normal" >Change Password</span>
            </span>
          </Menu.Item>
        


          <Menu.Item key={menuItem.length + 3} onClick={()=>signoutHandler()}>
            <span>
              {!loadingSignout  ? (<> <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span></>):(<Spin />)}
             
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
