import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input, Radio } from 'antd';
import { Router, Route, Link } from 'react-router-dom';
import $ from 'jquery'
import { fetchPost } from './../../../fetch/fetch.js'
const RadioGroup = Radio.Group;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
export default class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibles: false,
            flag: false,//Modal框按钮,
            dataList: []
        }
        this.showModal = this.showModal.bind(this)
        this.showModals = this.showModals.bind(this)
    }
    componentDidMount() {
        // const data = [
        //     {
        //         id: '0',
        //         userName: 'Jack',
        //         sex: '1',
        //         state: '1',
        //         interest: '1',
        //         birthday: '2000-01-01',
        //         address: '北京市海淀区奥林匹克公园',
        //         time: '09:00'
        //     },
        //     {
        //         id: '1',
        //         userName: 'Jack',
        //         sex: '1',
        //         state: '1',
        //         interest: '1',
        //         birthday: '2000-01-01',
        //         address: '北京市海淀区奥林匹克公园',
        //         time: '09:00'
        //     }
        // ]
        // data.map((item, index) => {
        //     item.key = index;
        // })
        // this.setState({
        //     dataSource: data
        // })
        this.questRender()

    }
    render() {
        const columns = [
            {
                title: '房屋地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '详情',
                key: 'detial',
                dataIndex: 'detial',
                // render(sex) {
                //     return sex == 1 ? '男' : '女'
                // }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render(state) {
                    let config = {
                        '00A': '待审核',
                        '00B': '审核通过',
                        '00C': '审核未通过',
                    }
                    return config[state];
                }
            },
            {
                title: '创建时间',
                key: 'createDate',
                dataIndex: 'createDate'
            },
            {
                title: "操作",
                key: "action",
                render: (text, item) => {
                    // return <Button size="small" onClick={this.handleChakan.bind(this,item)}>删除</Button>
                    if (item.status == "00A") {
                        return <div>
                            <Button size="small" onClick={this.showModal.bind(this, item)}>审核</Button>
                            <Modal
                                title="页面审核"
                                visible={this.state.visible}
                                onOk={this.submitModal}
                                onCancel={this.hideModal}
                                okText="提交结果"
                                cancelText="取消"
                                mask={this.state.flag}
                                maskClosable={this.state.flag}
                                // closable={this.state.flag}
                                confirmLoading={this.state.flag}
                            >
                                <OpenModal wrappedComponentRef={(inst) => { this.cityForm = inst; }} />
                            </Modal>
                        </div>


                    } else if (item.status == "00C") {
                        return <div>
                            <Button size="small" onClick={this.showModals.bind(this, item)}>查看</Button>
                            <Modal
                                title="查看详情"
                                visible={this.state.visibles}
                                mask={this.state.flag}
                                onCancel={this.hideModal}
                                // cancelText="取消"
                                // okText="确定"
                                maskClosable={this.state.flag}
                                // closable={this.state.flag}
                                confirmLoading={this.state.flag}
                                footer={null}
                            >
                                <OpenModals />
                            </Modal>
                        </div>
                    }
                }
            }
        ]
        const rowCheckSelection = {
            type: "checkbox",
            // selectedRowKeys:selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {//参数1当前选中的为哪一行，参数2选中的为哪些行，为对象
                console.log(selectedRowKeys)
                console.log(selectedRows)
                this.setState({//存储起来
                    selectedRowKeys: selectedRowKeys,//告诉文本框选中的为哪些行，把它勾上,会变成一个数组
                    selectedRows: selectedRows  //为选中的那些行，可以遍历查看各行的信息
                })
            }
        }
        return (
            <div>

                <div style={{ height: 100, paddingTop: 20 }}>
                    <FilterForm />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataList}
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


    //点击审核出现   此处调接口
    showModal(item) {
        // console.log("刘念")
        console.log(item)
        this.setState({
            visible: true,
        });
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query", {
            houseId: item.houseId,
            houseVerifyId: item.houseVerifyId,
        }).then(res=>{
            console.log(res)
            if(res.code=="0"){
                let arr1 = [];
                res.data.rows.map((row, ind) => {
                    let obj = {
                        address: row.houseBaseInfoDto.detailAddress,
                    }
                    arr1.push(obj)
                this.setState({
                    
                })
            }else{
                message.warning("当前信息有问题,请与后台人员联系")
            }
        })

    }

    //点击查看出现的  此处调接口
    showModals(item) {
        console.log(item)
        this.setState({
            visibles: true,
        });


    }


    //点击提交审核  此处调接口
    submitModal = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        if (cityInfo.radio == undefined || cityInfo.textarea == undefined) {
            return message.error("请勾选审核状态和输入说明")
        } else {
            this.setState({
                visible: false,
            });
        }
    }


    hideModal = () => {
        this.setState({
            visible: false,
            visibles: false
        });
    }
    // handleChakan = (item) => {
    //     console.log(item)
    // }

    questRender = () => {
        // fetchPost('https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page', {
        //     "pageInfo": {
        //         "pageNo": "1",
        //         "pageSize": "20"
        //     }
        // }).then(rep => {
        //     console.log(rep)
        // })
        // var data2 = {
        //     "pageInfo": {
        //         "pageNo": "1",
        //         "pageSize": "20"
        //     }
        // };
        // var jsonStr = JSON.stringify(data2);
        // $.ajax({
        //     url: "https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page",
        //     type: "post",
        //     data: jsonStr,
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     crossDomain: true,
        //     headers: { "Content-Type": "application/json" },
        //     dataType: "json",
        //     success: function (res) {

        //             this.setState({
        //                 dataList:res.data.rows
        //             })
        //     }
        // })
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
            "pageInfo": {
                "pageNo": "1",
                "pageSize": "20"
            }
        }).then(res => {
            if (res.code == "0") {
                let arr = [];
                res.data.rows.map((row, ind) => {
                    let obj = {
                        address: row.houseBaseInfoDto.detailAddress,
                        status: row.status,
                        createDate: row.createDate,
                        houseId: row.houseId,
                        houseVerifyId: row.houseVerifyId,
                    }
                    arr.push(obj)
                })
                this.setState({
                    dataList: arr
                })
            }
        })
    }
}

// class Search extends React.Component{

// }
// Search = Form.create({})(Search);
class FilterForm extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="房屋地址：" style={{ marginLeft: 30 }}>
                    {getFieldDecorator('username')(
                        <Input style={{ width: 350 }} placeholder='请输入' />
                    )}
                </FormItem>
                <FormItem label="房屋状态：" style={{ marginLeft: 30 }}>
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 350 }}
                                placeholder="请选择"
                            >
                                <Option value="1">已通过</Option>
                                <Option value="2">待通过</Option>
                                <Option value="3">未通过</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleSearch}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
    handleSearch = () => {
        // e.preventDefault();
        const { history } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {

            }
        });
    }
    handleReset = () => {//重置按钮

    }
}
FilterForm = Form.create({})(FilterForm);
class OpenModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 2,
            bangbang: "邦邦"
        }
        // this.onChange = this.onChange.bind(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/* onSubmit={this.tijiao} */}
                <Form className="login-form">
                    <p><img src="" /><img src="" /></p>
                    <p>房屋地址：{this.state.dataTf}</p>
                    <p>房屋面积：123.4</p>
                    {/* <p>
                        <RadioGroup onChange={this.onChange}  >
                            审核结果：
                            <Radio value={1}>审核通过</Radio>
                            <Radio value={2}>审核未通过</Radio>
                        </RadioGroup>
                    </p> */}
                    <FormItem>
                        {getFieldDecorator('radio', {
                            rules: [{ required: true, message: '请勾选审核结果' }],
                        })(
                            <RadioGroup>
                                审核结果：
                            <Radio value={1}>审核通过</Radio>
                                <Radio value={2}>审核未通过</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {/* <p>审核说明：<TextArea rows={4} placeholder="请输入说明"
                        
                    /></p> */}
                    <FormItem>
                        {getFieldDecorator('textarea', {
                            rules: [{ required: true, message: '请填入审核信息' }],
                        })(
                            <TextArea rows={4} placeholder="请输入说明" />
                        )}
                    </FormItem>
                    {/* <Button type="primary" htmlType="submit" style={{ width: '30%',marginLeft:"300" }}>
                                保存
                    </Button> */}
                </Form>
            </div>
        )
    }
    // onChange(e) {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //         value: e.target.value,
    //     });
    // }
    // tijiao = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         console.log(values)
    //         if (!err) {
    //             console.log('棒棒 ', values);
    //         }
    //     });
    // }
}
OpenModal = Form.create({})(OpenModal);


class OpenModals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <p><img src="" /><img src="" /></p>
                <p>房屋地址：软件大道</p>
                <p>房屋面积：123.4</p>
                <p>
                    审核结果：<span style={{ color: "red" }}>未通过</span>
                </p>
            </div>
        )
    }
}