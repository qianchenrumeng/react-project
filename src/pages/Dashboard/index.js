import React, { Component, createRef } from 'react'

import {
    Card,
    Row,
    Col,
    Button
} from 'antd'

import {
    getTable
} from "../../requests"

import echarts from 'echarts'

export default class Dashboard extends Component {
    constructor() {
        super()
        this.readingQuantityRef = createRef()
        this.state = {
            tableType: 1,
            type: 'line'
        }
    }

    setreadingQuantityOptions = (data) => {
        const xAxisData = data.map(item => item.month)
        const seriesData = data.map(item => item.reading)

        this.readingQuantity.setOption({
            xAxis: {
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '阅读量',
                type: this.state.type,
                data: seriesData
            }]
        })
    }

    handleReadingQuantitiMonthsChange = (tableType) => {
        console.log(tableType)
        this.setState({
            tableType
        }, () => {
            this.getReadingQuantity()
        })
    }

    handleReadingQuantitiEchartsChange (type) {
        this.setState({
            type
        }, () => {
            this.getReadingQuantity()
        })
    }

    getReadingQuantity = () => {
        getTable(this.state.tableType)
            .then((resp) => {
                if (resp.data.code === 200) {
                    this.setreadingQuantityOptions(resp.data.data)

                    // console.log(this.tableType + "one")
                }
            })
    }

    componentDidMount () {
        this.readingQuantity = echarts.init(this.readingQuantityRef.current);
        this.getReadingQuantity()
    }

    render () {
        return (
            <Card
                style={{ margin: '16px' }}
            >
                <Button.Group>
                    {/* {console.log(this.tableType)} */}
                    <Button
                        type={this.state.tableType === 1 ? 'primary' : 'default'}
                        onClick={this.handleReadingQuantitiMonthsChange.bind(this, 1)}
                    > 今年</Button>
                    <Button type={this.state.tableType === 2 ? 'primary' : 'default'}
                        onClick={this.handleReadingQuantitiMonthsChange.bind(this, 2)}
                    >去年</Button>
                    <Button
                        type={this.state.tableType === 3 ? 'primary' : 'default'}
                        onClick={this.handleReadingQuantitiMonthsChange.bind(this, 3)}
                    >前年</Button>
                </Button.Group>

                <Button.Group
                    style={{ marginLeft: '16px' }}
                >
                    <Button
                        type={this.state.type === 'line' ? 'danger' : 'default'}
                        onClick={this.handleReadingQuantitiEchartsChange.bind(this, 'line')}
                    > 折线图</Button>
                    <Button
                        type={this.state.type === 'bar' ? 'danger' : 'default'}
                        onClick={this.handleReadingQuantitiEchartsChange.bind(this, 'bar')}
                    > 柱状图</Button>
                </Button.Group>
                <Row>


                    <Col span={16}>
                        <div
                            ref={this.readingQuantityRef}
                            style={{ height: 300 }}
                        ></div>
                    </Col>
                </Row>
            </Card>
        )
    }
}
