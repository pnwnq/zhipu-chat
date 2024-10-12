const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3001; // 选择一个合适的端口

const APP_ID = 'app-aLnd4J1p'; // 你的应用 ID

app.use(cors()); // 允许跨域请求

app.get('/getAccessToken', async (req, res) => {
  try {
    // 假设新的 API 只需要应用 ID
    const response = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APP_ID}`, {
      method: 'POST'
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).send('Error fetching access token');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
