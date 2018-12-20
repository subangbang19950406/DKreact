import React, { Component } from 'react';
import { Button, Card, Form, Input, Icon, Checkbox } from 'antd';
import { fetchPost } from './../../fetch/index.js';
import './index.less';
const FormItem = Form.Item;
class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this); // 提交
    }
    componentDidMount (){
        console.log(this.props, 'this.props');
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='Login'>
                <Card title="欢迎登陆" style={{width: 350, position: 'absolute', top: 200,right: '37%'}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} class="user"/>} placeholder='请输入用户名' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a style={{float: 'right'}} href=''>忘记密码</a>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                登陆
                            </Button>
                            {/* Or <a href="">register now!</a> */}
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
    handleSubmit (e) {
        e.preventDefault();
        const { history } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                fetchPost('http://localhost:3001/myBlogs/login.php', {
                    username: values.username,
                    password: values.password, 
                    remember: true
                }).then(rep => {
                    localStorage.setItem('userData', JSON.stringify(rep));
                    console.log(rep, 'userData');
                })
                var userData = values;
                localStorage.setItem('userData', JSON.stringify(userData));
                history.replace('/admin');
            }
        });
    }
}

export default Form.create()(Login);