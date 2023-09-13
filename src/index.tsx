import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './providers/AuthProvider';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Loader, Space, Title } from '@mantine/core';

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
  <React.StrictMode>
    <Suspense fallback={
      <div style={{ width: "100%", height: "100%", backgroundColor: "#12B886", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <Loader size={128} color='white'/>
        <Space h={"lg"} />
        <Title order={4} color='white'>Aguarde / Hold on</Title>
      </div>
    }>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>
  );