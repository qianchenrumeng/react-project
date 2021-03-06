import React, { Component, createRef } from 'react'

import './Edit.less'

import {
    Form,
    Card,
    Input,
    Button,
    message
} from 'antd';

import E from 'wangeditor'




const formItemLayouy = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
}

//装饰器写法
// @Form.create()
class NormalLoginForm extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
        this.state = {
            id: '111',
            username: '1',
            password: '1',
            phone: '',
            email: '',
            content: ''
        }
    }



    handleSubmit = () => {
        //e.preventDefault();
        //console.log(e)
        this.props.form.validateFields((err, values) => {
            if (err) {
                return message.error('请填写必填字段');
            }

            // const data = {
            //     ...values,
            //     //将时间转换成时间戳
            //     // createAt: values.createAt.format()
            // }

            //保存成功，上传到服务器，根据返回的情况进行处理
            //后续处理，跳转到别的页面或者留在本页面
            message.success('修改成功！')
            this.props.history.push(`/admin/article`)
        });
    }

    getData = () => {
        const {
            id,
            username,
            password,
            phone,
            email
        } = this.props.location.state
        this.setState({
            id,
            username,
            password,
            phone,
            email
        })

    }

    componentDidMount () {
        this.getData()
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        console.log(this.state.id)
        return (

            <Card
                title={`编辑${this.props.location.state.username}`}
                bordered={false}
                style={{ margin: '16px' }}
            >
                <Form className="login-form">
                    <Form.Item
                        label="id"
                        {...formItemLayouy}
                    >
                        {/* {console.log(this.state.id)} */}
                        {getFieldDecorator('id', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入id'
                                }
                            ],

                            initialValue: this.state.id
                        })(
                            <Input placeholder="id" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        {...formItemLayouy}
                    >

                        {
                            getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名'
                                    }
                                ],
                                initialValue: this.state.username
                            })(
                                <Input placeholder="用户名" />
                            )}
                    </Form.Item>

                    <Form.Item
                        label="用户密码"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户密码'
                                }],
                            initialValue: this.state.password
                        })(
                            <Input placeholder="用户密码" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="email"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入email'
                                }],
                            initialValue: this.state.email
                        })(
                            <Input placeholder="email" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号'
                                }
                            ],
                            initialValue: this.state.phone
                        })(
                            <Input placeholder="手机号" />
                        )}
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 4
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={this.handleSubmit}
                        >保存</Button>

                    </Form.Item>
                </Form>
            </Card>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm

