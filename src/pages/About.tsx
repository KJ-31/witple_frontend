import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Section = styled.section`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const TechItem = styled.li`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #667eea;
  font-weight: 500;
  color: #333;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>프로젝트 소개</Title>
      
      <Section>
        <SectionTitle>프로젝트 개요</SectionTitle>
        <Paragraph>
          Witple은 웹뷰와 PWA(Progressive Web App)를 지원하는 현대적인 React 애플리케이션입니다.
          모바일 환경에서 네이티브 앱과 같은 사용자 경험을 제공하면서도 웹의 유연성을 유지합니다.
        </Paragraph>
        <Paragraph>
          이 프로젝트는 TypeScript를 사용하여 타입 안정성을 보장하고, 
          styled-components를 통해 컴포넌트 기반 스타일링을 구현했습니다.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>주요 기능</SectionTitle>
        <Paragraph>
          • <strong>웹뷰 최적화:</strong> 모바일 앱 내 웹뷰에서 완벽하게 작동하는 반응형 디자인
        </Paragraph>
        <Paragraph>
          • <strong>PWA 지원:</strong> 오프라인 기능, 앱 설치, 푸시 알림 등 네이티브 앱 기능
        </Paragraph>
        <Paragraph>
          • <strong>Vercel 배포:</strong> 자동 CI/CD, 글로벌 CDN, 빠른 배포
        </Paragraph>
        <Paragraph>
          • <strong>FastAPI 연동:</strong> EKS 환경의 백엔드 API와 연동
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>기술 스택</SectionTitle>
        <TechList>
          <TechItem>React 18</TechItem>
          <TechItem>TypeScript</TechItem>
          <TechItem>Styled Components</TechItem>
          <TechItem>React Router</TechItem>
          <TechItem>Axios</TechItem>
          <TechItem>PWA</TechItem>
          <TechItem>Vercel</TechItem>
          <TechItem>FastAPI (Backend)</TechItem>
        </TechList>
      </Section>
      
      <Section>
        <SectionTitle>개발 환경</SectionTitle>
        <Paragraph>
          • <strong>프론트엔드:</strong> React + TypeScript + Styled Components
        </Paragraph>
        <Paragraph>
          • <strong>백엔드:</strong> FastAPI (별도 프로젝트)
        </Paragraph>
        <Paragraph>
          • <strong>배포:</strong> Vercel (Frontend) + AWS EKS (Backend)
        </Paragraph>
        <Paragraph>
          • <strong>개발 도구:</strong> ESLint, Prettier, Git
        </Paragraph>
      </Section>
    </AboutContainer>
  );
};

export default About;
