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
import moment from 'moment'



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
            id: '',
            title: '',
            name: '',
            date: '',
            reading: '',
            news: ''
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
            const date = Object.assign({}, values, {
                date: values.date.format()
            })
            //保存成功，上传到服务器，根据返回的情况进行处理
            //后续处理，跳转到别的页面或者留在本页面
            console.log(date)
            message.success('修改成功！')
            this.props.history.push(`/admin/settings`)
        });
    }

    initEditor = () => {
        //依赖DOM
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            //html 变化之后的内容
            //console.log(html)
            this.setState({
                news: html
            }
            )
        }
        this.editor.create()
        //this.editor.txt.html(this.state.content)
    }

    getData = () => {
        const {
            id,
            title,
            name,
            date,
            reading,
            news
        } = this.props.location.state
        this.setState({
            id,
            title,
            name,
            date,
            reading,
            news
        }, () => {
            this.editor.txt.html(this.state.news)
        })

    }

    componentDidMount () {
        this.initEditor()
        this.getData()
    }

    render () {
        const { getFieldDecorator } = this.props.form;
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
                        label="标题"
                        {...formItemLayouy}
                    >

                        {
                            getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入标题'
                                    }
                                ],
                                initialValue: this.state.title
                            })(
                                <Input placeholder="标题" />
                            )}
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入作者'
                                }],
                            initialValue: this.state.name
                        })(
                            <Input placeholder="作者" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="阅读量"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('reading', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入阅读量'
                                }],
                            initialValue: this.state.reading
                        })(
                            <Input placeholder="reading" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="日期"
                        {...formItemLayouy}
                    >
                        {getFieldDecorator('date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择日期'
                                }],
                            //转换时间格式
                            initialValue: moment(this.state.date)
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
                        {getFieldDecorator('news', {
                            initialValue: this.state.news
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

