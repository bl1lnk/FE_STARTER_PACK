import React, { Component } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import ThemeConfigurator from './ThemeConfigurator';
import { connect } from "react-redux";
import { DIR_RTL } from 'constants/ThemeConstant';
import NavProfile from './NavProfile';

export class NavPanel extends Component {
	state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	render() {
		return (
      <>
      
        <Drawer
          title="Theme Config"
          placement={this.props.direction === DIR_RTL ? 'left' : 'right'} 
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ThemeConfigurator/>
        </Drawer>

        <NavProfile />
      </>
    );
	}
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default connect(mapStateToProps)(NavPanel);