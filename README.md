# THE FIN

포스트 프로덕션 스튜디오 THE FIN의 웹사이트입니다. 리무브, 뷰티 리터칭, 합성, 3D, VFX 서비스를 소개하고 전화 문의(010-5823-1350)로 이어지는 원페이지 사이트입니다.

## 구성

- `index.html` — 페이지 전체 마크업
- `styles.css` — 블랙 & 화이트 테마 스타일
- `script.js` — 스크롤 애니메이션, 모바일 메뉴, 전화번호 복사, 문의 폼(문자 전송) 동작
- `assets/favicon.svg` — 파비콘

빌드 도구나 서버 없이 정적 파일로만 동작합니다.

## 로컬 확인

```bash
# 저장소 루트에서
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

또는 `index.html`을 브라우저로 바로 열어도 됩니다.

## 배포

정적 파일이므로 GitHub Pages, Vercel, Netlify 등 어떤 정적 호스팅에도 그대로 올리면 됩니다.

## 커스터마이징 메모

- 연락처(전화번호)는 `index.html`과 `script.js` 상단의 `PHONE`/`PHONE_DISPLAY`에서 관리합니다. 번호가 바뀌면 두 곳 모두 수정하세요.
- 포트폴리오가 준비되면 `#portfolio` 섹션의 placeholder 타일을 실제 작업물(이미지/영상)로 교체하세요.
- 폰트는 [Pretendard](https://github.com/orioncactus/pretendard)를 CDN으로 불러옵니다.
