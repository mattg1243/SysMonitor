import React, { useState } from 'react';
import useInterval from './components/hooks/useInterval';
import { Col, Row, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import BatteryChart from './components/BatteryChart';
import CpuChart from './components/CpuChart';
import MemChart from './components/MemChart';
const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" title="SysInfo" />
        </Header>
        <Content style={{ padding: '0 50px', width: '100%', height: '100%' }}>
          <Row>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>CPU Usage:</>
              <CpuChart />
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>MEM Usage:</>
              <MemChart />
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>BAT: </>
              <BatteryChart />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
