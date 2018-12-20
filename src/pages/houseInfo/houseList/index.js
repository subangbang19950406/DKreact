import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message,Input,Radio } from 'antd';
import {Router, Route, Link}from 'react-router-dom';
// import axios from './../../../fetch/axios.js'
// import Utils from './../../../untils/index1.js'
const RadioGroup = Radio.Group;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
export default class HouseList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            flag:false//Modal框按钮
        }
        this.showModal=this.showModal.bind(this)
    }
  componentDidMount(){
    const data = [
        {
            id:'0',
            userName:'Jack',
            sex:'1',
            state:'1',
            interest:'1',
            birthday:'2000-01-01',
            address:'北京市海淀区奥林匹克公园',
            time:'09:00'
        },
        {
            id: '1',
            userName: 'Tom',
            sex: '2',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
        },
        {
            id: '2',
            userName: 'Lily',
            sex: '2',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
        },
    ]
    data.map((item,index)=>{
        item.key = index;
    })
    this.setState({
      dataSource: data
    })
  }
    render(){
      const columns = [
        {
            title:'id',
            key:'id',
            dataIndex:'id'
        },
        {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render(state){
                let config  = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time'
        },
        {
          title:"操作",
          key:"action",
          render:(text,item)=>{
            // return <Button size="small" onClick={this.handleChakan.bind(this,item)}>删除</Button>
            return <div>
                            <Button size="small" onClick={this.showModal.bind(this,item)}>删除{item.id}</Button>
                             <Modal
                            title="页面审核"
                            visible={this.state.visible}
                            onOk={this.hideModal}
                            onCancel={this.hideModal}
                            okText="提交结果"
                            cancelText="取消"
                            mask={this.state.flag}
                            >
                            <OpenModal />
                            </Modal>
                </div>
            
            
         }
        }
    ]
    const rowCheckSelection={
      type:"checkbox",
      // selectedRowKeys:selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{//参数1当前选中的为哪一行，参数2选中的为哪些行，为对象
        console.log(selectedRowKeys)
        console.log(selectedRows)
          this.setState({//存储起来
            selectedRowKeys:selectedRowKeys,//告诉文本框选中的为哪些行，把它勾上,会变成一个数组
            selectedRows: selectedRows  //为选中的那些行，可以遍历查看各行的信息
          })
      }
    }
      return (
        <div>
            
            <div style={{height:100,paddingTop:20}}>
                 <FilterForm/>
            </div>
            <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        rowSelection={rowCheckSelection}
                        // onRow={(record,index) => {//点击的行，record为选中的那行的信息
                        //   return {
                        //     onClick: () => {
                        //       this.onRowClick(record,index);
                        //     }
                        //   }
                        // }}
                  />
            
        </div>
      )
    }
        // onRowClick=(record,index)=>{
    //   let selectKey = [index];
    //   console.log(record.userName+record.id)
    //   this.setState({
    //     selectedRowKeys:selectKey,//选的key值
    //     selectedItem:record//代表选的哪一项
    //   })
    // }
    showModal (item) {
        console.log(item)
    this.setState({
        visible: true,
    });
    }
    hideModal = () => {
    this.setState({
        visible: false,
    });
    }
    handleChakan=(item)=>{
    console.log(item)
    }
}

// class Search extends React.Component{
    
// }
// Search = Form.create({})(Search);
class FilterForm extends React.Component{
    

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="房屋地址：" style={{marginLeft:30 }}>
                            {getFieldDecorator('username')(
                                <Input style={{ width: 350}} placeholder='请输入' />
                            )}
                </FormItem>
                <FormItem label="房屋状态：" style={{marginLeft:30 }}>
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 350 }}
                                placeholder="请选择"
                            >
                                <Option value="1">已验证</Option>
                                <Option value="2">未验证</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleSearch}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
    handleSearch=()=> {
        // e.preventDefault();
        const { history } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                
            }
        });
    }
    handleReset=()=>{//重置按钮

    }
}
FilterForm = Form.create({})(FilterForm);
class OpenModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: 2,
        }
        this.onChange=this.onChange.bind(this)
    }
    render(){
        return (
            <div>
                    <p><img src=""/><img src=""/></p>
                    <p>房屋地址：软件大道</p>
                    <p>房屋面积：123.4</p>
                    <p>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                        审核结果：
                            <Radio value={1}>审核通过</Radio>
                            <Radio value={2}>审核未通过</Radio>
                        </RadioGroup>  
                    </p>   
                    <p>审核说明：<TextArea rows={4} placeholder="请输入说明"/></p>
            </div>
        )
    }
    onChange(e){
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }
}