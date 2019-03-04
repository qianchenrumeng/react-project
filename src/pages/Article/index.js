import React, { Component } from 'react'
import {
    Card,
    Table,
    Button
} from 'antd'

import { getArticleList } from '../../requests'

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

//表格有几行几列
const columns = [
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
            return (
                <ButtonGroup>
                    <Button>修改</Button>
                    <Button>删除</Button>
                </ButtonGroup>
            )
        }
    }];

export default class Article extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }
    componentDidMount () {
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
    render () {
        return (
            <div>
                <Card
                    title="账号信息管理"
                    bordered={false}
                    style={{ margin: '16px' }}
                >
                    <Table
                        dataSource={this.state.dataSource}
                        columns={columns}
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
            </div>
        )
    }
}
