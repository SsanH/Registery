const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Ethereal Email credentials for testing
const ETHEREAL_USER = 'liza99@ethereal.email';
const ETHEREAL_PASS = 'bs5rmw6RXcGH8Y281H';

const app = express();

app.use(require('cors')());
app.use(express.json());

// Email transporter configuration - Using Ethereal Email for testing
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: ETHEREAL_USER,
    pass: ETHEREAL_PASS
  }
});

// Function to send welcome email
const sendWelcomeEmail = async (email, username) => {
  try {
    // Get personalized message from ChatGPT
    const chatResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generate a short, warm welcome message for a new user named ${username}. Keep it under 50 words and make it personal and encouraging.`
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const personalizedMessage = chatResponse.data.choices[0].message.content;

    const mailOptions = {
      from: ETHEREAL_USER,
      to: email,
      subject: 'Welcome to Our Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3949ab;">Welcome, ${username}!</h2>
          <p>${personalizedMessage}</p>
          <p>We're excited to have you on board!</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Endpoint to get random text from ChatGPT
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

// Endpoint to send welcome email
app.post('/send-welcome-email', async (req, res) => {
  const { email, username } = req.body;
  
  if (!email || !username) {
    return res.status(400).json({ error: 'Email and username are required' });
  }

  try {
    const success = await sendWelcomeEmail(email, username);
    if (success) {
      res.json({ message: 'Welcome email sent successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to send welcome email' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
}); 