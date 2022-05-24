import React, { useState, useRef, useEffect} from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {useSelector, connect, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { 
  PrinterOutlined, 
  LockOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { setUser, signOut } from 'redux/actions/Auth';
import ChangePasswordModal from "../../views/app-views/users/changePasswordModal/ChangePasswordModal";
import { currency } from "configs/EnvironmentConfig";
import { useHistory } from "react-router-dom";





const menuItem = [

]




export const NavProfile = ({signOut}) => {

  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch()

  /* print variables && functions */
  const componentRef = useRef();
  const handle = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent : ()=> {
   
      }
   
    
  });
/*   print variable end here */



 

  const subString_ROLE = (rolestring)=>{
    return rolestring.substr(5);
  }

 

 
  const authVariables = useSelector((state) => state.auth);

   const {code, user ,credit, role} = authVariables;
  
  const profileImg = "/img/avatars/thumb-1.jpg";



  const profileMenu = (
    
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">{user && user }</h4>
            <span className="text-muted"><b> </b>{user &&  subString_ROLE(role)} </span>
            <div>
            <span className="text-muted"  style={{fontSize:10}}><b> </b>{code} </span>
            </div>
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
          <Menu.Item key={menuItem.length + 2} onClick={()=>{handle()}}>
            <span >
              <PrinterOutlined className="mr-3"/>
              <span className="font-weight-normal" > User code </span>
            </span>
          </Menu.Item>


          <Menu.Item key={menuItem.length + 3} onClick={() => {signOut(); history.push('/auth/login');}}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal" >Sign Out</span>
            </span>
          </Menu.Item>
         
        </Menu>
      </div>
    </div>
  );
  return (
    <>
    <div>
 
    <h3 style={{marginTop:15,marginLeft:5 }}>  {credit} {currency}</h3>
    <ChangePasswordModal visible={visible} setVisible={setVisible} />
    </div>


    
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
 
      <Menu className="d-flex align-item-center" mode="horizontal">

        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
    

 
    </>
  );
}

export default connect(null, {signOut})(NavProfile)
