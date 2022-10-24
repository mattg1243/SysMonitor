import IPCHandlers from '../../src/IPCHandlers';

describe('IPC Handler Functions', () => {
  it('Gets CPU data', async () => {
    const result = await IPCHandlers.getCpuData();
    expect(typeof result).toBe('number');
    expect(result).toBeLessThan(101);
    expect(result).toBeGreaterThan(0);
  });
  it('Gets Memory data', async () => {
    const result = await IPCHandlers.getMemData();
    expect(typeof result).toBe('number');
    expect(result).toBeLessThan(101);
    expect(result).toBeGreaterThan(0);
  });
  it('Gets Battery data', async () => {
    const result = await IPCHandlers.getBatData();
    expect(typeof result).toBe('number');
    expect(result).toBeLessThan(101);
    expect(result).toBeGreaterThan(0);
  });
});
