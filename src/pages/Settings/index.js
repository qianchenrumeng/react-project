import React, { Component } from 'react'
import { PagesCard } from '../PagesComponents'

import {
    Button,
    Popover,
    notification
} from 'antd'


import {
    getNews,
    deleteById
} from '../../requests'

const ButtonGroup = Button.Group

export default class Settings extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,

        }
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            }, {
                //显示出来的列名
                title: '标题',
                //传入数据时候对象的属性名
                dataIndex: 'title',
                key: 'title',
            }, {
                title: '作者',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: '阅读量',
                dataIndex: 'reading',
                key: 'reading',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    // console.log(record)
                    return (
                        <ButtonGroup >
                            <Popover content={`点击修改${record.username}`}>
                                <Button
                                    size="small"
                                    type="primary"
                                    onClick={this.toEdit.bind(this, record)}
                                >修改</Button>
                            </Popover>
                            <Popover content={`点击删除${record.username}`}>
                                <Button
                                    size="small"
                                    type="danger"

                                    onClick={this.handleArticleDelete.bind(this, record)}
                                >删除</Button>
                            </Popover>
                        </ButtonGroup>
                    )
                }
            }];
    }

    toEdit (record) {
        console.log(record)
        const {
            id,
            title,
            name,
            date,
            reading,
            news
        } = record
        this.props.history.push(`/admin/settings/edit/${id}`, {
            id,
            title,
            name,
            date,
            reading,
            news
        })
    }
    //删除事件
    handleArticleDelete = (record) => {
        //测试是否成功绑定事件
        //console.log(id)
        // deleteById(id)
        //     .then(res => {
        //         console.log(res)
        //     })
        // console.log(record)
        this.setState({
            editModalVisible: true,
            deleteArticleId: record.id,
            clickArticleTitle: record.title
        })

    }
    handleDeleteButtonClick = () => {
        // console.log("yes")
        this.setState({
            confirmLoading: true
        }, () => {
            //console.log("qwe")
            deleteById(this.state.clickDeleteArticleId)
                .then(resp => {
                    if (resp.data.res_code === 200) {
                        // console.log(resp.data)
                        this.handleCancelDelete()
                        notification.success({
                            message: resp.data.res_data.errorMesage
                        })
                        this.getData()

                    } else {
                        //处理错误
                    }
                })
                .catch(err => console.log(err))
        })
    }
    //取消删除
    handleCancelDelete = () => {
        this.setState({
            editModalVisible: false,
            confirmLoading: false
        })
    }

    getData () {
        getNews()
            .then(resp => {
                console.log(resp)
                if (resp.data.code === 200) {

                    this.setState({
                        isLoading: false,
                        dataSource: resp.data.data
                    })
                } else {
                    //真实项目中别的返回码
                }

            })
            .catch(error => {
                //真实项目中的错误处理
            })
    }

    componentDidMount () {
        this.getData()
    }

    render () {
        return (
            <PagesCard
                columns={this.columns}
                dataSource={this.state.dataSource}
                isLoading={this.state.isLoading}
                editModalVisible={this.state.editModalVisible}
                clickArticleTitle={this.state.clickArticleTitle}
                handleDeleteButtonClick={this.handleDeleteButtonClick}
                handleCancelDelete={this.handleCancelDelete}
                // confirmLoading={this.state.confirmLoading}
                tableTitle="账号信息管理"
            ></PagesCard>
        )
    }
}
