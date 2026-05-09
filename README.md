# 💪 운동 루틴 트래커

나만의 운동 루틴을 등록하고 매일 완료 여부를 체크할 수 있는 React 웹 애플리케이션입니다.

---

## 🌐 배포 URL

> AWS S3 정적 호스팅으로 배포 (세션 4시간만 유효)
>
> **URL:** `http://<S3_BUCKET_NAME>.s3-website-us-east-1.amazonaws.com`

---

## 📋 시스템 소개

운동 루틴을 체계적으로 관리할 수 있는 트래커 앱입니다.  
루틴을 요일별로 등록하고, 오늘 할 운동 목록을 확인하며, 완료 체크를 통해 진행률을 추적할 수 있습니다.

---

## ✨ 기능 소개

| 기능         | 설명                                                |
| ------------ | --------------------------------------------------- |
| 루틴 추가    | 운동 이름, 분류, 세트/횟수/시간, 요일 설정          |
| 오늘의 루틴  | 오늘 요일에 해당하는 루틴만 표시                    |
| 완료 체크    | 버튼 클릭으로 완료/취소 토글                        |
| 완료율 표시  | 오늘 완료한 운동 비율을 진행 바로 표시              |
| 이번 주 현황 | 요일별 루틴 개수 한눈에 확인                        |
| 로컬 저장    | localStorage를 이용해 브라우저 새로고침 후에도 유지 |
| 루틴 삭제    | 불필요한 루틴 제거                                  |

---

## 🛠 기술 스택

- **Frontend:** React 18
- **상태 관리:** React Hooks (useState, useEffect)
- **데이터 저장:** localStorage
- **CI/CD:** GitHub Actions
- **배포:** AWS S3 정적 웹사이트 호스팅

---

## 📁 프로젝트 구조

```
workout-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # 앱 헤더
│   │   ├── StatsGrid.js       # 통계 카드 (전체/오늘/완료/완료율)
│   │   ├── WeekView.js        # 이번 주 요일별 현황
│   │   ├── AddRoutineForm.js  # 루틴 추가 폼
│   │   └── RoutineList.js     # 루틴 목록 + 카드
│   ├── App.js                 # 메인 컴포넌트 (상태 관리)
│   ├── App.css                # 전체 스타일
│   ├── index.js               # 앱 진입점
│   └── index.css              # 글로벌 스타일
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
└── package.json
```

---

## ⚙️ GitHub Actions CI/CD 환경

`main` 브랜치에 push하면 자동으로 빌드 후 AWS S3에 배포됩니다.

### 파이프라인 흐름

```
push to main
    ↓
Checkout code
    ↓
Setup Node.js 18
    ↓
npm ci (의존성 설치)
    ↓
npm run build (React 빌드)
    ↓
AWS 자격증명 설정
    ↓
S3 sync (build/ → S3 버킷)
    ↓
(선택) CloudFront 캐시 무효화
```

### GitHub Secrets 설정 방법

Repository → Settings → Secrets and variables → Actions → New repository secret

| Secret 이름                  | 설명                          |
| ---------------------------- | ----------------------------- |
| `AWS_ACCESS_KEY_ID`          | AWS Academy Access Key ID     |
| `AWS_SECRET_ACCESS_KEY`      | AWS Academy Secret Access Key |
| `AWS_SESSION_TOKEN`          | AWS Academy Session Token     |
| `S3_BUCKET_NAME`             | 배포할 S3 버킷 이름           |
| `CLOUDFRONT_DISTRIBUTION_ID` | (선택) CloudFront 배포 ID     |

> ⚠️ AWS Academy 키는 세션마다 갱신되므로, 새 세션 시작 시 Secrets를 업데이트해야 합니다.

---

## 🚀 로컬 실행 방법

```bash
# 1. 클론
git clone https://github.com/aprilily/projectanalysis.git
cd workout-tracker

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm start
# → http://localhost:3000 에서 확인
```

---

## 🎬 CI/CD 구축 시연 영상

> YouTube 링크: `https://youtu.be/EoXs326bpIQ`

---

## 📄 라이선스

MIT

## 과제2 AWS Amplify 호스팅

- Amplify URL: https://master.d3kuua1dkdtet5.amplifyapp.com/
- 시연 영상: https://youtu.be/EoXs326bpIQ
