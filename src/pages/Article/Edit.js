import React, { Component, createRef } from 'react'

import './Edit.less'

import {
    Form,
    Card,
    DatePicker,
    Input,
    Button,
    message
} from 'antd';

import E from 'wangeditor'
//import moment from 'moment'



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

            //object，es6的方法
            const data = Object.assign({}, values, {
                // createAt: values.createAt.format()
            })
            //保存成功，上传到服务器，根据返回的情况进行处理
            //后续处理，跳转到别的页面或者留在本页面
            console.log(data)
        });
    }

    initEditor = () => {
        //依赖DOM
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            //html 变化之后的内容
            //console.log(html)
            this.setState({
                content: html
            }
            )
        }
        this.editor.create()
        //this.editor.txt.html(this.state.content)
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
        }, () => {
            this.editor.txt.html(this.state.content)
        })

    }

    componentDidMount () {
        this.initEditor()
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
                        label="日期"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('data', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择日期'
                                }],
                            //转换时间格式
                            // initialValue: moment(this.state.createAt)
                        })(
                            <DatePicker
                                showTime

                                style={{ width: '100%' }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('content', {
                            initialValue: this.state.content
                        })(
                            <div ref={this.editorRef} className="editor">

                            </div>
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

