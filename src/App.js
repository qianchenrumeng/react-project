import React, { Component } from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { Frame } from './components'

import routes from './routes'

const navRoutes = routes.filter(route => route.inNav === true)

class App extends Component {
    render () {

        return (
            <Frame routes={navRoutes}>
                <Switch>
                    {/* 渲染的实际的路由 */}
                    {
                        routes.map(route => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.isExact}
                                    render={(props) => {
                                        //TODO，权限判断
                                        // console.log(props)
                                        return <route.components {...props} />
                                    }}
                                />
                            )
                        })

                    }
                    {/**渲染固定路由 */}
                    <Redirect to="/admin/dashboard" from="/admin" exact />
                    <Redirect to="/404" />
                </Switch>
            </Frame>


        );
    }
}

export default App;
