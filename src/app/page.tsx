'use client'
import { IMessage } from "@/interfaces";
import { Box, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ThreePIcon from '@mui/icons-material/ThreeP';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import { sendMessageToBot } from "@/services/chatService";



export default function Home() {

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');



const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: IMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await sendMessageToBot({ message: input });
      const botMessage: IMessage = {
        sender: 'bot',
        text: response.bot || 'Sorry, I did not understand that.',
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.log('API error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }
  };


  return (
     <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" align="center">AI Support Chat</Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2,p:5 }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ mb: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <div>
                {msg.sender === 'user' ? <ThreePIcon color="primary"/> : <SmartToyIcon color="secondary" />}                
              </div>
              <Typography
                variant="body1"
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
                  color: msg.sender === 'user' ? 'white' : 'black',
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box display="flex">
          <TextField
            fullWidth
            placeholder="Type your message ..."
            value={input}
            sx={{borderRadius:'850px'}}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}
