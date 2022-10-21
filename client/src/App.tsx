import React, { useState } from 'react';
import useInterval from './components/hooks/useInterval';
import { Col, Row, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import BatteryChart from './components/BatteryChart';
import CpuChart from './components/CpuChart';
const { Header, Content } = Layout;

function App() {
  // states for data from main process
  const [cpuPercentage, setCpuPercentage] = useState(0);
  const [memPercentage, setMemPercentage] = useState(0);
  const [batteryData, setBatteryData] = useState({ percentage: 1.0 });

  const getCpuPercentage = async () => {
    // try {
    //   let cpuData = await window.api.getCpuPercentage();
    //   setCpuPercentage(cpuData);
    //   console.log('CPU data from Electron: ' + cpuData);
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  const getMemPercentage = async () => {
    let memData = await window.api.getMemPercentage();
    setMemPercentage(memData);
  };

  const getAllData = async () => {
    await getCpuPercentage();
    await getMemPercentage();
  };

  useInterval(getAllData, 2000);

  return (
    <div className="App">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Content style={{ padding: '0 50px', width: '100%', height: '100%' }}>
          <Row>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>CPU Usage:</>
              <CpuChart />
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>MEM Usage:</>
              <p>{parseFloat((memPercentage / 1000).toFixed(2))} GB</p>
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
