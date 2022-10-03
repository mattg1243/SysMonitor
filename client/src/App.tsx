import React from 'react';
import { Col, Divider, Row, Layout, Menu } from 'antd';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import data from './mockData';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Content style={{ padding: '0 50px', width: '100%', height: '100%' }}>
          <Row>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              CPU
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              MEM
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              BAT
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
