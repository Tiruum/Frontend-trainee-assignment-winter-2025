import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import { FormPage, ItemPage, ListPage } from '@/pages/index.ts';
import { DefaultLayout } from './layouts/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<DefaultLayout />}>
          <Route path="/form/:id" element={<FormPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
