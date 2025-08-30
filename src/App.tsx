import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import APIConnectionStatus from './components/APIConnectionStatus';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  padding-top: 60px;
  min-height: calc(100vh - 60px);
`;

function App() {
  useEffect(() => {
    // 캐시 무효화 로직
    const clearCache = () => {
      // Service Worker 캐시 무효화
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }

      // 브라우저 캐시 무효화
      if ('caches' in window) {
        caches.keys().then(names => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
    };

    // 앱 시작 시 캐시 무효화
    clearCache();

    // 페이지 포커스 시 캐시 무효화 (탭 전환 시)
    const handleFocus = () => {
      clearCache();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <Router>
      <AppContainer>
        <Header />
        <APIConnectionStatus />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
