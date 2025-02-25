# 📝 MBTI 테스트 웹사이트

## 📌 프로젝트 개요
이 프로젝트는 사용자가 MBTI 테스트를 진행하고, 결과를 저장하고 확인할 수 있는 **간단한 웹 애플리케이션**입니다.  
회원가입과 로그인 기능을 제공하며, `db.json`을 사용하여 데이터를 관리합니다.

## 🛠 주요 기능

### 1️⃣ 회원가입 & 로그인
- **회원가입**: 사용자가 아이디와 비밀번호를 입력하여 계정을 생성할 수 있습니다.
- **로그인**: `axios`를 사용하여 `db.json`에서 사용자 정보를 확인하고, 인증 후 로그인됩니다.
- **로그아웃**: 버튼 클릭 시 사용자 정보를 삭제하고 로그아웃됩니다.

### 2️⃣ MBTI 테스트
- 여러 개의 질문을 통해 사용자의 MBTI 유형을 분석합니다.
- 테스트를 완료하면 결과가 저장되며, 이후 로그인 시 자신의 MBTI 유형을 확인할 수 있습니다.

### 3️⃣ 결과 페이지 (`TestPageResult`)
- 사용자의 MBTI 결과를 화면에 표시합니다.
- 저장된 데이터는 `db.json`을 통해 유지됩니다.

### 4️⃣ 데이터 관리 (`db.json`)
- **JSON Server**를 사용하여 회원 정보 및 MBTI 결과를 저장합니다.
- `GET`, `POST`, `PATCH` 요청을 통해 데이터를 주고받습니다.

---

## 📂 폴더 구조
```
src/                  # 소스 코드 폴더
├── components/       # UI 컴포넌트 (버튼, 입력 필드 등)
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── TestForm.jsx
│
├── pages/            # 페이지별 컴포넌트 (홈, 로그인, 테스트, 결과 등)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── TestPage.jsx
│   ├── TestResultPage.jsx
│
├── shard/  
│   ├── Router.jsx
├── utils/  
│   ├── mbtiCalculator.js
├── api/              # axios 요청 관리
│   ├── authApi.js
│   ├── testApi.js
│
├── App.jsx            # 메인 App 컴포넌트
├── index.jsx          # React 앱 진입점

```

---

# TIL 및 트러블 슈팅 블로그 링크
https://tigulmoa.tistory.com/entry/20250225-%EA%B0%9C%EC%9D%B8-%EA%B3%BC%EC%A0%9C-TIL
