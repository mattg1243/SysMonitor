const si = require('systeminformation');
const os = require('os-utils');

const test = async () => {
  // try {
  //   const cpu = await si.cpuTemperature();
  //   console.dir(JSON.stringify(cpu));
  // } catch (err) {
  //   console.error(err);
  // }
  // using the os-utils module
  console.log('From os module\n');
  setInterval(() => {
    os.cpuUsage((v) => {
      console.log('-----------------');
      console.log('CPU Usage: ' + (v * 100).toFixed(2) + '%');
    });
    console.log('MEM Usage: ' + (os.freememPercentage() * 100).toFixed(2) + '%');
    si.battery((v) => {
      console.log('Battery:  ' + v.percent.toFixed(2) + '%');
    });
  }, 750);
};
test();
