import React, {
    Component,
    Fragment
} from 'react'

import {
    Card,
    Table,
    Button,
    Popover,
    Modal,
    notification
} from 'antd'

import {
    getArticleList,
    deleteById
} from '../../requests'

const ButtonGroup = Button.Group



// const dataSource = Array.from(Array(48).keys()).map(item => {
//     return {
//         id: item,
//         name: '胡彦斌',
//         pwd: 32,
//         email: 'qweqweqweqweqwe',
//         phone: '15121210202',
//         userId: '7452565'
//     }
// })



export default class Article extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            editModalVisible: false,
            confirmLoading: false,
            clickDeleteArticleId: null,
            clickArticleTitle: null
        }

        //表格有几行几列
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            }, {
                //显示出来的列名
                title: '用户名',
                //传入数据时候对象的属性名
                dataIndex: 'username',
                key: 'username',
            }, {
                title: '用户密码',
                dataIndex: 'password',
                key: 'password',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    // console.log(record)
                    return (
                        <ButtonGroup >
                            <Popover content={`点击修改${record.username}`}>
                                <Button size="small" type="primary">修改</Button>
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
    //删除事件
    handleArticleDelete = (record) => {
        //测试是否成功绑定事件
        //console.log(id)
        // deleteById(id)
        //     .then(res => {
        //         console.log(res)
        //     })
        //console.log(record)
        this.setState({
            editModalVisible: true,
            deleteArticleId: record.id,
            clickArticleTitle: record.username
        })

    }

    //删除成功事件
    handleDeleteButtonClick = () => {
        // console.log("yes")
        this.setState({
            confirmLoading: true
        }, () => {
            //console.log("qwe")
            deleteById(this.state.clickDeleteArticleId)
                .then(resp => {
                    if (resp.data.res_code === 200) {
                        console.log(resp.data)
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

        getArticleList()
            .then(resp => {
                if (resp.data.res_code === 200) {
                    //console.log(resp.data.res_body)
                    this.setState({
                        isLoading: false,
                        dataSource: resp.data.res_body
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
            <Fragment>
                <Card
                    title="账号信息管理"
                    bordered={false}
                    style={{ margin: '16px' }}
                >
                    <Table
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        loading={this.state.loading}
                        rowKey={record => record.id}
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['5', '10', '15'],
                            hideOnSinglePage: true
                        }}
                    />
                </Card>
                <Modal
                    title={`确认删除${this.state.clickArticleTitle}吗?`}
                    visible={this.state.editModalVisible}
                    onOk={this.handleDeleteButtonClick}
                    onCancel={this.handleCancelDelete}
                    okText="确认删除本条"
                    cancelText="谢谢提醒，点错了"
                    confirmLoading={this.state.confirmLoading}
                >
                    此操作不可逆
                </Modal>
            </Fragment>
        )
    }
}
