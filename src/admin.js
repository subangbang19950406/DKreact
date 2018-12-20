import React from "react";
import {Router, Route, Link}from 'react-router-dom';
import NavLeft from "./component/navLeft/index.js";

import { Layout, Menu, Icon ,Breadcrumb,Card,Dropdown,Avatar} from 'antd';
import './style/common.less'
const { Header, Sider, Content , Footer,} = Layout;
const SubMenu = Menu.SubMenu;

export default class Admin extends React.Component{
	state = {
			collapsed: false,
			visible: false,
			};
			toggle = () => {
			this.setState({
				collapsed: !this.state.collapsed,
			});
			}
			handleMenuClick = (e) => {
			if (e.key === '3') {
				this.setState({ visible: false });
			}
	  }
	
	  handleVisibleChange = (flag) => {
		this.setState({ visible: flag });
	  }
	render(){
		const menu = (
			<Menu onClick={this.handleMenuClick}>
			  <Menu.Item key="1">用户信息</Menu.Item>
			  <Menu.Item key="2"><Link to="/">退出登录</Link></Menu.Item>
			</Menu>
		  );
		return (
			<Layout style={{ minHeight: '100vh' }}>
					<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					>
						<div className="logo"><p></p></div>
						<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
							<SubMenu
							key="sub1"
							title={<span><Icon type="user" /><span>房屋信息管理</span></span>}
							>
									<Menu.Item key="4"><Link to="/admin/houseList">房屋列表</Link> </Menu.Item>
									<Menu.Item key="5"><Link to="/admin/houseAudit">房屋审核</Link> </Menu.Item>
									<Menu.Item key="6"><Link to="/admin/qita">房屋其他</Link> </Menu.Item>
							</SubMenu>
							<SubMenu
							key="sub2"
							title={<span><Icon type="team" /><span>Team</span></span>}
							>
									<Menu.Item key="6">Team 1</Menu.Item>
									<Menu.Item key="8">Team 2</Menu.Item>
							</SubMenu>
							<SubMenu
							key="sub3"
							title={<span><Icon type="team" /><span>Team</span></span>}
							>
									<Menu.Item key="9">Team 1</Menu.Item>
									<Menu.Item key="10">Team 2</Menu.Item>
							</SubMenu>
							<SubMenu
							key="sub4"
							title={<span><Icon type="team" /><span>Team</span></span>}
							>
									<Menu.Item key="11">Team 1</Menu.Item>
									<Menu.Item key="12">Team 2</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: 0 ,marginBottom:30}}>
								<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
								/>
								<Dropdown
								overlay={menu}
								onVisibleChange={this.handleVisibleChange}
								visible={this.state.visible}
								className="dropDown"
							>	
								<div style={{color:"black",cursor:"pointer"}} className="ant-dropdown-link">
								<Avatar style={{marginTop:-9}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
								苏邦邦
								</div>
							</Dropdown>
						</Header>
						<Content style={{ margin: '0 15px' }}>
							<div style={{background:"white",marginBottom:15}}>
								<p style={{fontSize:13,margin:0,height:30,lineHeight:4,textIndent:25}}>房屋管理信息/房屋列表</p>
								<div style={{fontWeight:"bold",color:"black",fontSize:18,height:50,lineHeight:3,textIndent:25}}>房屋列表</div>
							</div>
							<div style={{ padding: 20, background: '#fff' }}>
									{this.props.children}
							</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							<p className="footer-p"><a href='#'>帮助</a><a href='#'>隐私</a><a href='#'>条款</a></p>
							copyright@ 2019东客网络技术有限公司
						</Footer>
					</Layout>
			</Layout>
			)	
	}
}