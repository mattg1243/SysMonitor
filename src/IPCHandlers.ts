import * as os from 'node-os-utils';
import * as si from 'systeminformation';

export default class IPCHandlers {
  static getCpuData = async () => {
    try {
      const result = await new Promise(async (resolve, reject) => {
        resolve(await os.cpu.free());
      });
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };

  static getMemData = async () => {
    try {
      const result = await new Promise(async (resolve, reject) => {
        // console.log('free mem: ' + (await os.mem.free()).freeMemMb / 1000 + ' GB');
        resolve((100 * (await os.mem.free()).freeMemMb) / (await os.mem.free()).totalMemMb);
      });
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };

  static getBatData = async () => {
    try {
      const result = await new Promise(async (resolve, reject) => {
        si.battery((v) => {
          resolve(parseFloat(v.percent.toFixed(2)));
          console.log('watching');
        });
      });
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };
}
