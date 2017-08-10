import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Route,
  Link,
  HashRouter
} from 'react-router-dom';

import {Layout, Menu} from 'antd';

import BasicEditor from './components/BasicEditor';
import linkEditor from './components/LinkEditor';
import InlineStyle from './components/InlineStyle';
import BlockStyle from './components/BlockStyle';

const {Sider, Content} = Layout;

class App extends Component {
  render() {
    return (
      <HashRouter className="App">
        <Layout>
          <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            trigger={null}
            collapsible
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['100']}>
              <Menu.Item key="1">
                <Link to="/basicEditor">基础编辑器</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/linkEditor">带链接的文本编辑器</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/inlineStyle">行内样式文本编辑器</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/blockStyle">块级样式文本编辑器</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              
                <Route path="/basicEditor" component={BasicEditor}/>
                <Route path="/linkEditor" component={linkEditor}/>
                <Route path="/inlineStyle" component={InlineStyle}/>
                <Route path="/blockStyle" component={BlockStyle}/>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
