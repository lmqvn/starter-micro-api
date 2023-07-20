const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Parse JSON request body using body-parser
app.use(bodyParser.json());

app.post('/execute', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Missing data field in the request body.' });
  }

  // Sanitize the input (remove potentially dangerous characters)
  const sanitizedData = data.replace(/[&|;$<>()'"`\\]/g, '');

  // Execute the command (e.g., 'whoami')
  exec(sanitizedData, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing the command:', error.message);
      return res.status(500).json({ error: error.message });
    }

    // Return the command output
    return res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
