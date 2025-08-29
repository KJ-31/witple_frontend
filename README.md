# Witple Frontend

웹뷰와 PWA를 지원하는 현대적인 React 애플리케이션입니다.

## 🚀 주요 기능

- **웹뷰 최적화**: 모바일 앱 내 웹뷰에서 완벽하게 작동
- **PWA 지원**: Progressive Web App 기능 (오프라인, 앱 설치 등)
- **반응형 디자인**: 모든 디바이스에서 최적화된 UI
- **TypeScript**: 타입 안정성 보장
- **Vercel 배포**: 빠르고 안정적인 배포

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript, Styled Components
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **Backend**: FastAPI (별도 프로젝트, EKS 배포)

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── Header.tsx
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx
│   └── About.tsx
├── services/           # API 서비스
│   └── api.ts
├── utils/              # 유틸리티 함수
│   └── pwa.ts
├── App.tsx             # 메인 앱 컴포넌트
├── index.tsx           # 앱 진입점
└── index.css           # 전역 스타일

public/
├── manifest.json       # PWA 매니페스트
├── sw.js              # 서비스 워커
└── index.html         # HTML 템플릿
```

## 🚀 시작하기

### 개발 환경 요구사항

- **Node.js**: 18.17.0 이상
- **npm**: 8.0.0 이상

### 📋 팀원들을 위한 프로젝트 설정 가이드

#### 1. 프로젝트 클론

```bash
# 저장소 클론
git clone [repository-url]
cd witple_front

# 또는 이미 클론된 경우
git pull origin main
```

#### 2. Node.js 버전 설정

```bash
# nvm이 설치되어 있지 않다면 먼저 설치
# macOS/Linux: https://github.com/nvm-sh/nvm
# Windows: https://github.com/coreybutler/nvm-windows

# 프로젝트에서 지정된 Node.js 버전 사용
nvm use

# 또는 수동으로 버전 지정
nvm use 18.17.0

# Node.js 버전 확인
node --version  # v18.17.0이어야 함
npm --version   # 8.0.0 이상이어야 함
```

#### 3. 의존성 설치

```bash
# 패키지 설치 (자동으로 Node.js 버전 확인됨)
npm install

# 설치 중 오류가 발생하면 node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 4. 개발 서버 실행

```bash
# 개발 서버 시작
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

#### 5. 코드 품질 검사

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 타입 체크
npm run type-check
```

#### 6. 빌드 테스트

```bash
# 프로덕션 빌드
npm run build
```

### 🔧 문제 해결

#### Node.js 버전 문제

```bash
# nvm으로 Node.js 설치
nvm install 18.17.0
nvm use 18.17.0
```

#### 의존성 설치 오류

```bash
# 캐시 클리어 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 포트 충돌

```bash
# 3000번 포트가 사용 중인 경우
lsof -ti:3000 | xargs kill -9
npm start
```

#### 권한 문제 (macOS/Linux)

```bash
# npm 권한 문제 해결
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

### 📱 모바일 테스트

#### 로컬 네트워크에서 모바일 접속

```bash
# IP 주소 확인
ifconfig | grep "inet " | grep -v 127.0.0.1

# 모바일에서 접속: http://[IP주소]:3000
```

#### 브라우저 개발자 도구로 모바일 시뮬레이션

1. F12 또는 Cmd+Option+I (Mac) / Ctrl+Shift+I (Windows)
2. Toggle device toolbar 클릭 (📱 아이콘)
3. 모바일 기기 선택 (iPhone, Samsung 등)

### 🛠 VS Code 설정 (권장)

1. **필수 확장 프로그램 설치**:

   - Prettier - Code formatter
   - ESLint
   - TypeScript Importer
   - Auto Rename Tag

2. **설정 적용**:
   - 프로젝트를 VS Code로 열면 자동으로 추천 확장 프로그램 설치
   - 자동 포맷팅 및 린트 설정이 적용됨

### ✅ 프로젝트 실행 확인 체크리스트

- [ ] Node.js 18.17.0 설치 및 사용
- [ ] 프로젝트 클론 완료
- [ ] 의존성 설치 완료 (`npm install`)
- [ ] 개발 서버 실행 성공 (`npm start`)
- [ ] 브라우저에서 http://localhost:3000 접속 가능
- [ ] 린트 검사 통과 (`npm run lint`)
- [ ] 타입 체크 통과 (`npm run type-check`)
- [ ] 빌드 성공 (`npm run build`)

## 🌐 배포

### Vercel 배포

1. Vercel CLI 설치:

```bash
npm i -g vercel
```

2. 배포:

```bash
vercel
```

3. 환경 변수 설정:
   - `REACT_APP_API_URL`: 백엔드 API URL

## 📱 PWA 기능

- **오프라인 지원**: 서비스 워커를 통한 캐싱
- **앱 설치**: 홈 화면에 앱 추가 가능
- **푸시 알림**: 서비스 워커를 통한 알림 지원
- **반응형**: 모든 디바이스에서 최적화

## 🔧 환경 변수

`.env` 파일을 생성하여 다음 환경 변수를 설정하세요:

```env
REACT_APP_API_URL=https://your-backend-api.com
```

## 📋 스크립트

- `npm start`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm test`: 테스트 실행
- `npm run lint`: ESLint 검사
- `npm run lint:fix`: ESLint 자동 수정
- `npm run type-check`: TypeScript 타입 체크

## 🤝 백엔드 연동

FastAPI 백엔드와 연동하기 위해 `src/services/api.ts`에서 API 엔드포인트를 설정하세요.

## 👥 팀 개발 가이드

팀원들과 함께 개발할 때는 다음 가이드라인을 참고하세요:

- [기여 가이드라인](./CONTRIBUTING.md) - 코딩 컨벤션 및 Git 워크플로우
- [VS Code 설정](./.vscode/) - 통일된 개발 환경
- [Prettier 설정](./.prettierrc) - 코드 포맷팅 규칙

### 팀 개발 체크리스트

- [ ] Node.js 18.17.0 설치
- [ ] VS Code 확장 프로그램 설치
- [ ] 프로젝트 클론 및 의존성 설치
- [ ] 개발 서버 실행 확인
- [ ] 린트 및 타입 체크 통과

## 📄 라이선스

MIT License

## 👥 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
