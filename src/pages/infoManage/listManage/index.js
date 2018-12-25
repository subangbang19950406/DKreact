import React, { Component } from 'react'
import { Table, Form, Icon, Input, Button, Card, message, Modal, DatePicker, TimePicker } from 'antd'
import moment from 'moment';
import $ from 'jquery'
export default class ListManage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        const columns = [
            // {
            //     title: '设备号',
            //     dataIndex: 'code',
            //     key: 'code'
            // },
            {
                title: '初始设备号',
                dataIndex: 'ori_device_code',
                key: 'ori_device_code'
            },
            {
                title: '设备类型',
                dataIndex: 'device_type',
                key: 'device_type'
            },
            {
                title: '设备名称',
                dataIndex: 'device_name',
                key: 'device_name',
                onCell: (record, rowIndex) => {

                }
            },
            {
                title: '设备描述',
                dataIndex: 'device_desc',
                key: 'device_desc'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',

            },
            {
                title: '创建时间',
                dataIndex: 'create_data',
                key: 'create_data'
            },
            {
                title: '状态时间',
                dataIndex: 'status_data',
                key: 'status_data'
            },
            {
                title: '生效时间',
                dataIndex: 'eff_data',
                key: 'eff_data'
            },
            {
                title: '失效时间',
                dataIndex: 'exp_data',
                key: 'exp_data'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 100,
                render: () => {
                    return <a href="javascript:;">action</a>
                }
            },
        ];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        },
        {
            key: '3',
            name: 'bangbang',
            age: 40,
            address: 'fengtai',
        }];
        return (
            <div>
                <FilteTable />
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1600 }}
                    pagination={false}
                    bordered={true}
                />

            </div>
        )
    }
}

class FilteTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            flag: false
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.submitModal = this.submitModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.clearForm = this.clearForm.bind(this)
    }
    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        return (
            <div style={{ marginBottom: 40, marginTop: 30 }}>
                <Form layout="inline">
                    <Form.Item label="设备编号" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('ori_device_code')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('device_name')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleSearch}>查询</Button>
                        <Button type="dashed" style={{ marginRight: 20 }} onClick={this.handleAdd}>新增</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                        <Modal
                            title={null}
                            visible={this.state.visible}
                            onOk={this.submitModal}
                            onCancel={this.hideModal}
                            okText="提交"
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            // closable={this.state.flag}
                            confirmLoading={this.state.flag}
                        >
                            <AddData
                                wrappedComponentRef={(inst) => { this.AddForm = inst; }}
                                num={this.state.num}
                            />
                        </Modal>
                    </Form.Item>
                </Form>



            </div>
        )
    }

    handleSearch(e) {
        const { resetFields } = this.props.form;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.ori_device_code === undefined || values.device_name === undefined) {
                message.error("请分别输入设备编号和名称")
            } else {
                resetFields()//清空表单里的数据的
            }

        });
    }

    handleAdd(e) {
        e.preventDefault();

        this.setState({
            visible: true
        })
    }

    handleReset(e) {
        e.preventDefault();
    }

    clearForm(){
        console.log(document.querySelector("#ori_device_code"))
        // $(".name").val("棒棒")
        document.querySelector("#ori_device_code").value = "bangbang"    
    }
    //提交新增的数据到接口
    submitModal() {
        let num = 0;
        let flag = true;

        let addInfos = this.AddForm.props.form.getFieldsValue();
        console.log("addInfo", addInfos)
        this.clearForm();
        for (let info in addInfos) {
            if (addInfos[info] === undefined || addInfos.eff_time === null || addInfos.exp_time === null ||
                addInfos.eff_data === null || addInfos.exp_data === null) {
                flag = false
            } else {
                flag = true
            }
        }
        if (!flag) {
            message.error("请将各项信息输入完整")
            this.setState({
                visible: true
            })

        } else {//写接口内容
            
            this.setState({
                visible: false,
                num: 1,
            })
        }

    }

    hideModal() {
        this.setState({
            visible: false
        })
    }
}

FilteTable = Form.create()(FilteTable);


//放到新增出现的Modal里的子组件
class AddData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // subData: {device_name: ''}
        }
        // this.onchange = this.onchange.bind(this)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="inline">
                    <Form.Item label="设备编号：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('ori_device_code')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" onChange={this.onchange}/>
                        )}
                    </Form.Item>
                    <Form.Item label="设备类型：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('device_type')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('device_name')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备描述：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('device_desc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备状态：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('status')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="生效日期：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('eff_data')(
                            <DatePicker />

                        )}

                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 5 }}>
                        {getFieldDecorator('eff_time')(
                            <TimePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="失效时间：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('exp_data')(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 5 }}>
                        {getFieldDecorator('exp_time')(
                            <TimePicker />
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }

    onchange=(e) =>{
        const { resetFields,setFieldsValue } = this.props.form;
        console.log("测试")
        this.props.form.validateFields((err, values) => {
            console.log("测试")
                resetFields()//清空表单里的数据的
                setFieldsValue({
                    device_type: "subang"
                  });

        });
    }

}

AddData = Form.create()(AddData);