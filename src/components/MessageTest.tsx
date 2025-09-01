import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { messageAPI } from '../services/api';

const TestContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 500px;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Status = styled.div<{ $success?: boolean }>`
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  background: ${props => (props.$success ? '#d4edda' : '#f8d7da')};
  color: ${props => (props.$success ? '#155724' : '#721c24')};
  border: 1px solid ${props => (props.$success ? '#c3e6cb' : '#f5c6cb')};
`;

const MessageList = styled.div`
  margin-top: 20px;
`;

const MessageItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #f8f9fa;
`;

const MessageTest: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // 메시지 목록 불러오기
  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getMessages();

      // 응답 데이터 형태 확인 및 안전한 처리
      console.log('📄 API 응답:', response);
      console.log('📄 응답 데이터:', response.data);

      let messageList = [];
      if (Array.isArray(response.data)) {
        messageList = response.data;
      } else if (response.data && Array.isArray(response.data.messages)) {
        messageList = response.data.messages;
      } else if (response.data && Array.isArray(response.data.data)) {
        messageList = response.data.data;
      } else {
        console.warn('⚠️ 예상하지 못한 응답 형태:', response.data);
        messageList = [];
      }

      setMessages(messageList);
      setStatus({
        type: 'success',
        message: `메시지 목록을 불러왔습니다. (${messageList.length}개)`,
      });
    } catch (error: any) {
      console.error('❌ 메시지 목록 불러오기 실패:', error);
      setStatus({
        type: 'error',
        message: `메시지 목록 불러오기 실패: ${error.message}`,
      });
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // 메시지 저장
  const saveMessage = async () => {
    if (!message.trim()) {
      setStatus({ type: 'error', message: '메시지를 입력해주세요.' });
      return;
    }

    try {
      setLoading(true);
      const response = await messageAPI.saveMessage(message);
      console.log('💾 저장 응답:', response);

      setMessage('');
      setStatus({ type: 'success', message: '메시지가 저장되었습니다!' });
      loadMessages(); // 목록 새로고침
    } catch (error: any) {
      console.error('❌ 메시지 저장 실패:', error);
      setStatus({
        type: 'error',
        message: `메시지 저장 실패: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // 메시지 삭제
  const deleteMessage = async (id: string) => {
    try {
      await messageAPI.deleteMessage(id);
      setStatus({ type: 'success', message: '메시지가 삭제되었습니다.' });
      loadMessages(); // 목록 새로고침
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: `메시지 삭제 실패: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <TestContainer>
      <Title>📝 백엔드 연결 테스트 - 메시지 저장</Title>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        💡 현재 백엔드가 다운 상태입니다. 메시지 저장 기능을 테스트하려면 백엔드
        서버를 먼저 실행해주세요.
      </p>

      <Input
        type="text"
        placeholder="테스트 메시지를 입력하세요..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && saveMessage()}
      />

      <Button onClick={saveMessage} disabled={loading}>
        {loading ? '저장 중...' : '메시지 저장'}
      </Button>

      <Button onClick={loadMessages} disabled={loading}>
        {loading ? '로딩 중...' : '목록 새로고침'}
      </Button>

      {status && (
        <Status $success={status.type === 'success'}>{status.message}</Status>
      )}

      <MessageList>
        <h4>저장된 메시지 ({messages.length}개)</h4>
        {messages.length === 0 ? (
          <p>저장된 메시지가 없습니다.</p>
        ) : (
          messages.map((msg, index) => (
            <MessageItem key={msg.id || index}>
              <div>{msg.content || msg.message || '내용 없음'}</div>
              <small>ID: {msg.id || `temp-${index}`}</small>
              {msg.id && (
                <Button
                  onClick={() => deleteMessage(msg.id)}
                  style={{
                    marginTop: '5px',
                    padding: '5px 10px',
                    fontSize: '12px',
                  }}
                >
                  삭제
                </Button>
              )}
            </MessageItem>
          ))
        )}
      </MessageList>
    </TestContainer>
  );
};

export default MessageTest;
