import React from 'react';
import { Layout } from 'antd';


const { Header, Content } = Layout;

const App = () => (
  <Layout className="app">
    <Layout className="app-background">
      <Content className="content">
      New Layout
      </Content>
    </Layout>
  </Layout>
);
export default App;