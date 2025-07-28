const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(require('cors')());
app.use(express.json());

// Endpoint to get random text from ChatGPT for toast messages
app.get('/random-text', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Generate a short, inspiring welcome message for a new user who just registered. Make it motivational, friendly, and under 30 words. Include an emoji or two to make it more engaging.'
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const randomText = response.data.choices[0].message.content;
    res.json({ message: randomText });
  } catch (error) {
    console.error('Error getting random text:', error);
    res.json({ message: '🎉 Welcome to our platform! We\'re excited to have you here! ✨' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
}); 