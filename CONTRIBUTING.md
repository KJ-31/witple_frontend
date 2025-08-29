# 기여 가이드라인

## 🚀 개발 환경 설정

### 필수 요구사항

- Node.js 18.17.0 이상
- npm 8.0.0 이상

### 초기 설정

```bash
# Node.js 버전 확인 및 설치
nvm use 18.17.0

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 📝 코딩 컨벤션

### 파일 명명 규칙

- 컴포넌트: PascalCase (예: `UserProfile.tsx`)
- 유틸리티: camelCase (예: `apiUtils.ts`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)

### 컴포넌트 구조

```typescript
// 1. Import 문
import React from 'react';
import styled from 'styled-components';

// 2. Styled Components
const Container = styled.div`
  // 스타일
`;

// 3. Props 인터페이스
interface ComponentProps {
  title: string;
  onClick?: () => void;
}

// 4. 컴포넌트
const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return <Container onClick={onClick}>{title}</Container>;
};

// 5. Export
export default Component;
```

### 커밋 메시지 규칙

```
type(scope): description

feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 보조 도구 변경
```

예시:

- `feat(auth): 로그인 기능 추가`
- `fix(api): API 호출 에러 수정`
- `style(components): Header 컴포넌트 스타일 개선`

## 🔄 Git 워크플로우

### 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/기능명`: 새로운 기능 개발
- `fix/버그명`: 버그 수정
- `hotfix/긴급수정명`: 긴급 수정

### 작업 흐름

1. `develop` 브랜치에서 `feature/기능명` 브랜치 생성
2. 기능 개발 및 테스트
3. `develop` 브랜치로 Pull Request 생성
4. 코드 리뷰 후 머지
5. 배포 준비 시 `main` 브랜치로 머지

## 🧪 테스트

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 특정 파일 테스트
npm test -- --testPathPattern=ComponentName

# 커버리지 확인
npm test -- --coverage
```

### 테스트 작성 규칙

- 컴포넌트 테스트: `ComponentName.test.tsx`
- 유틸리티 테스트: `utils.test.ts`
- API 테스트: `api.test.ts`

## 📦 빌드 및 배포

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

### 배포 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] 린트 에러 없음
- [ ] 타입 체크 통과
- [ ] 빌드 성공
- [ ] 코드 리뷰 완료

## 🐛 버그 리포트

버그를 발견했을 때는 다음 정보를 포함해주세요:

- 버그 설명
- 재현 단계
- 예상 동작
- 실제 동작
- 환경 정보 (브라우저, OS 등)
- 스크린샷 (필요시)

## 💡 기능 제안

새로운 기능을 제안할 때는 다음을 포함해주세요:

- 기능 설명
- 사용 사례
- 구현 방법 (선택사항)
- 우선순위

## 📞 연락처

- 기술적 질문: 팀 채널
- 긴급 이슈: 팀 리드에게 직접 연락
