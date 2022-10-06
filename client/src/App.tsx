import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
// a custom hook i found made by Dan Abramov
function useInterval(callback, delay) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  // states for data from main process
  const [cpuPercentage, setCpuPercentage] = useState(0);
  const [memPercentage, setMemPercentage] = useState(0);
  const [batteryData, setBatteryData] = useState({});

  const getCpuPercentage = async () => {
    let cpuData = await window.api.getCpuPercentage();
    setCpuPercentage(cpuData);
    console.log('CPU data from Electron: ' + cpuData);
  };

  const getMemPercentage = async () => {
    let memData = await window.api.getMemPercentage();
    setMemPercentage(memData);
  };

  const getBatData = async () => {
    let batData = await window.api.getBatPercentage();
  };

  const getAllData = async () => {
    await getCpuPercentage();
    await getMemPercentage();
  };

  useInterval(getAllData, 500);

  return (
    <div className="App">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Content style={{ padding: '0 50px', width: '100%', height: '100%' }}>
          <Row>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>CPU:</>
              <p>%{parseFloat(cpuPercentage.toFixed(2))}</p>
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>MEM Free:</>
              <p>{parseFloat((memPercentage / 1000).toFixed(2))} GB</p>
            </Col>
            <Col span={8} style={{ height: '100%', textAlign: 'center' }}>
              <>BAT: </>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
