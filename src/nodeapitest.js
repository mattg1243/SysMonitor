const si = require('systeminformation');
const os = require('os-utils');
const nos = require('node-os-utils');

const test = async () => {
  // try {
  //   const cpu = await si.cpuTemperature();
  //   console.dir(JSON.stringify(cpu));
  // } catch (err) {
  //   console.error(err);
  // }
  // using the os-utils module
  console.log('From os module\n');
  setInterval(async () => {
    const memFree = (await nos.mem.free()).freeMemMb / 1000;
    const cpuPerc = await nos.cpu.free();
    console.log('mem - ' + memFree + ' GB');
    console.log('cpu - ' + cpuPerc + ' %');
    console.log(' ------- ')

    // os.cpuUsage(async (v) => {
    //   console.log('-----------------');
    //   console.log('CPU Usage: ' + (v * 100).toFixed(2) + '%');
    // });
    // console.log('MEM Usage: ' + (await nos.mem.free().freeMemMb) + '%');
    // si.battery((v) => {
    //   console.log('Battery:  ' + v.percent.toFixed(2) + '%');
    // });
  }, 750);
};
test();
