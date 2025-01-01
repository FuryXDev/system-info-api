const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3000;

app.use(express.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const getSystemInfo = async () => {
  const systemInfo = await si.system();
  const osInfo = await si.osInfo();
  const cpu = await si.cpu();
  const memory = await si.mem();
  const disk = await si.diskLayout();
  const network = await si.networkInterfaces();

  return { systemInfo, osInfo, cpu, memory, disk, network };
};

app.get('/status', async (req, res) => {
  try {
    const systemInfo = await si.system();
    const uptime = process.uptime();
    res.json({
      status: "Server is running!",
      uptime: `${Math.floor(uptime / 60)} minutes`,
      timestamp: new Date().toISOString(),
      systemInfo: systemInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve system information." });
  }
});

app.get('/resources', async (req, res) => {
  try {
    const { cpu, memory, disk } = await getSystemInfo();
    
    const cpuLoad = await si.currentLoad();
    const swapUsed = (memory.swaptotal - memory.swapfree) / (1024 * 1024 * 1024); 
    const swapTotal = memory.swaptotal / (1024 * 1024 * 1024);

    if (cpuLoad.currentLoad !== undefined && memory.used !== undefined && memory.total !== undefined && disk.length > 0) {
      res.json({
        cpu_usage: cpuLoad.currentLoad.toFixed(2) + '%',  
        memory_usage: ((memory.used / memory.total) * 100).toFixed(2) + '%',
        total_memory: (memory.total / (1024 * 1024 * 1024)).toFixed(2) + ' GB', 
        free_memory: (memory.free / (1024 * 1024 * 1024)).toFixed(2) + ' GB', 
        swap_usage: (swapUsed / swapTotal * 100).toFixed(2) + '%', 
        disk_space: disk.map(d => ({
          device: d.device,
          size: (d.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
          used: d.used ? (d.used / (1024 * 1024 * 1024)).toFixed(2) + ' GB' : 'N/A'
        })),
      });
    } else {
      res.status(500).json({ error: "Invalid data received from system information." });
    }
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Failed to retrieve resource information." });
  }
});

app.get('/processes', async (req, res) => {
  try {
    const processes = await si.processes();
    res.json(processes.list);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve processes." });
  }
});

app.get('/network', async (req, res) => {
  try {
    const networkInterfaces = await si.networkInterfaces();
    const networkStats = await si.networkStats();
    
    res.json({
      interfaces: networkInterfaces,
      network_stats: networkStats
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve network information." });
  }
});

app.get('/gpu', async (req, res) => {
  try {
    const gpu = await si.graphics();
    res.json(gpu);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve GPU information." });
  }
});

app.get('/bandwidth', async (req, res) => {
  try {
    const netStats = await si.networkStats();
    res.json(netStats.map(stat => ({
      iface: stat.iface,
      rx_bytes: stat.rx_bytes, 
      tx_bytes: stat.tx_bytes 
    })));
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve bandwidth information." });
  }
});

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution et accessible sur http://localhost:${port}. Prêt à recevoir des requêtes ! 🚀`);
});
