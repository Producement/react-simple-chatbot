import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot
        cache
        cacheName="test"
        url="/api/v1/chats/nextStep/1SLK9Bu1BAfttq--N1OM2t7ydp-X5Ja3A?stateId=93o2q"
      />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
