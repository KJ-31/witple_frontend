import React from 'react';
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
