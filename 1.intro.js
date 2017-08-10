// 不使用 react router:
import React from 'react';
import {render} from 'react-dom'

const About = React.createClass({/*..*/});
const Inbox = React.createClass({/*..*/});
const Home = React.createClass({/*..*/});

const App = React.createClass({
    gerInitialState() {
        return {
            route: window.location.hash.substr(1)
        }
    },
    componentDidMount() {
        window.addEventListener("hashChange", () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },
    render() {
        let Child
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/inbox':Child = Inbox; break;
            default: Child = Home;
        }
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child />
            </div>
        )
    }
})

React.render(<App />, document.body)

// 使用react router
import React from 'react'
import {render} from 'react-dom'

import {Router, Route, Lind} from 'react-router'

const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {/*use this.props.children to replace <Child>  */}
                {this.props.children}
            </div>
        )
    }
})

React.render((
    <Router>
        <Route path='/' component={App}>
            <Route path='/about' component={About} />
            <Route path='/inbox' component={Inbox} />
        </Route>
    </Router>
), document.body)

// if unlike JSX you can do like this:
const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'about', component: About},
        {path: 'inbox', component: Inbox}
    ]
}

React.render(
    <Router routes={routes} />,
    document.body
)
