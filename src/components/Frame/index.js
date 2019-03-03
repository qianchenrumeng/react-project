import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Menu, Icon
} from 'antd';

import './Frame.less'

//装饰器模式的写法
@withRouter
export default class Frame extends Component {
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }
    render () {
        // console.log(this.props)
        return (
            <div className="ra-layout">
                <div className="ra-header">
                    <h1>header</h1>
                </div>
                <div className="ra-main">
                    <div className="ra-side">
                        <Menu
                            mode="inline"
                            onClick={this.onMenuClick}
                            defaultSelectedKeys={[this.props.routes[0].path]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.routes.map(route => {
                                    return <Menu.Item key={route.path}> <Icon type={route.iconType} />{route.title}</Menu.Item>
                                })
                            }
                        </Menu>
                    </div>

                    <div className="ra-content">
                        {this.props.children}
                    </div>
                </div>
            </div>

        )
    }
}

