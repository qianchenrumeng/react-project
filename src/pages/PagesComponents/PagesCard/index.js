import React, {
    Component,
    Fragment
} from 'react'

import {
    Card,
    Table,
    Modal,
} from 'antd'



export default class PagesCard extends Component {

    constructor() {
        super()
        this.state = {
            clickDeleteArticleId: null,
            clickArticleTitle: null,
            confirmLoading: false,
            editModalVisible: false,
        }
    }
    //删除成功事件
    handleDeleteButtonClick = () => {
        this.props.handleDeleteButtonClick();
    }
    handleCancelDelete = () => {
        this.props.handleCancelDelete();
    }

    render () {



        //console.log(this.columns)
        return (
            <Fragment>
                <Card
                    title={this.props.tableTitle}
                    bordered={false}
                    style={{ margin: '16px' }}
                >
                    <Table
                        dataSource={this.props.dataSource}
                        columns={this.props.columns}
                        loading={this.props.isLoading}
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
                    title={`确认删除${this.props.clickArticleTitle}吗?`}
                    visible={this.props.editModalVisible}
                    onOk={this.handleDeleteButtonClick}
                    onCancel={this.handleCancelDelete}
                    okText="确认删除本条"
                    cancelText="谢谢提醒，点错了"
                    confirmLoading={this.state.confirmLoading}
                >
                    此操作不可逆
                </Modal>
            </Fragment >
        )
    }
}
