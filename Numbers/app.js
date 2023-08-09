const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const numbers = [];

  try {
    for (const url of urls) {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.numbers) {
        numbers.push(...data.numbers);
      }
    }

    return res.json({ numbers });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve numbers' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
