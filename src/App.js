import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import BasicEditor from './components/BasicEditor';
import linkEditor from './components/LinkEditor';

const { Header, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router className="App">
        <Layout>
          <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            trigger={null}
            collapsible
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/basicEditor">基础编辑器</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/linkEditor">带链接的文本编辑器</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              
                <Route path="/basicEditor" component={BasicEditor}/>
                <Route path="/linkEditor" component={linkEditor}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
