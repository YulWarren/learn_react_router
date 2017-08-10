// 路由配置是一组指令，用来告诉router如何匹URL以及匹配后如何执行代码。
import React from 'react'
import {Router,Route,Link} from 'react-router'

const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to='/inbox'>Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})

const Inbox = React.createClass({
    render() {
        return(
            <div>
                <h2>Inbox</h2>
                {this.props.children || 'welcome to your inbox'}
            </div>
        )
    }
})

const Message = React.createClass({
    render() {
        return <h3>Message: {this.props.params.id} </h3>
    }
})

React.render((
    <Router>
        <Route path='/' component={App}>
            <Route path='about' component={About} />
            <Route path='inbox' component={Inbox}>
                <Route path='message/:id' component={Message} />
            </Route>
        </Route>
    </Router>
), document.body)

// 添加首页
// 当URL为／时， App的render中的this.props.children还是undefined，不过可以用IndexRoute来设置一个默认页面

import {IndexRoute} from 'react-router'

const Dashboard = React.createClass({
    render() {
        return <div>welcome to the App!</div>
    }
})

React.render((
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Dashboard} />
            <Route path='about' component={About} />
            <Route path='inbox' component={Inbox}>
                <Route path='message/:id' component={Message} />
            </Route>
        </Route>
    </Router>
), document.body)

// 让UI从URL中解耦
React.render((
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Dashboard} />
            <Route path='about' component={About} />
            <Route path='inbox' component={Inbox}>
                {/* use /message/:id to replace message/:id add Redirect */}
                <Route path='/message/:id' component={Message} />
                <Redirect from='message/:id' to='/message/:id' />
            </Route>
        </Route>
    </Router>
), document.body)

// enter and leave hook

// 在路由跳转中，onLeave hook会在所有将离开的路由中触发，从最下层的子路由开始直到最外层的父路由；onEnter hook会从最外层的父路由开始直到最下层子路由结束

// 替换的配置方式
const routerConfig = [
    {
        path: '/',
        component: App,
        indexRoute: {component: Dashboard},
        childRoutes: [
            {path: 'about', component: About},
            {path: 'inbox', 
            component: Inbox,
            childRoutes: [
                {path: '/message/:id', component: Message},
                {path: '/message/:id',
                onEnter: function (nextState, replaceState) {
                    replaceState(null, '/messages/' + nextState.params.id)
                }
                }
            ]
            }
        ]
    }
]

React.render(<Router routes={routerConfig} />, document.body)