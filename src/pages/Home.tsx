import React from 'react';
import styled from 'styled-components';
import MessageTest from '../components/MessageTest';

const HomeContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Witple에 오신 것을 환영합니다!!!!!!!!!!!!!!</Title>
        <Subtitle>웹뷰와 PWA를 지원하는 현대적인 React 애플리케이션</Subtitle>
        <Button onClick={() => alert('버튼이 클릭되었습니다!')}>
          시작하기
        </Button>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureTitle>웹뷰 지원</FeatureTitle>
          <FeatureDescription>
            모바일 앱 내에서 웹뷰로 완벽하게 작동하는 반응형 디자인
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>PWA 기능</FeatureTitle>
          <FeatureDescription>
            Progressive Web App으로 네이티브 앱과 같은 사용자 경험 제공
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Vercel 배포</FeatureTitle>
          <FeatureDescription>
            Vercel을 통한 빠르고 안정적인 배포 및 자동 CI/CD
          </FeatureDescription>
        </FeatureCard>
      </Features>

      <MessageTest />
    </HomeContainer>
  );
};

export default Home;
