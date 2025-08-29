import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { checkAPIConnection } from '../services/api';

const StatusContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const StatusDot = styled.div<{ $isConnected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.$isConnected ? '#10b981' : '#ef4444')};
  animation: ${props => (props.$isConnected ? 'pulse' : 'none')} 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const APIConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await checkAPIConnection();
        setIsConnected(connected);
        
        // 디버깅 정보 출력
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 API 연결 상태:', connected);
          console.log('🌐 현재 호스트:', window.location.hostname);
          console.log('🔗 API URL:', `${window.location.hostname}:8000`);
        }
      } catch (error) {
        setIsConnected(false);
        console.error('❌ API 연결 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();

    // 30초마다 연결 상태 확인
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <StatusContainer style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
        <StatusDot $isConnected={false} />
        API 연결 확인 중...
      </StatusContainer>
    );
  }

  return (
    <StatusContainer
      style={{
        backgroundColor: isConnected ? '#d1fae5' : '#fee2e2',
        color: isConnected ? '#065f46' : '#991b1b',
      }}
    >
      <StatusDot $isConnected={isConnected || false} />
      {isConnected ? '백엔드 연결됨' : '백엔드 연결 실패'}
    </StatusContainer>
  );
};

export default APIConnectionStatus;
