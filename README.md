# THE FIN

포스트 프로덕션 스튜디오 THE FIN의 웹사이트입니다. 리무브, 매치무브, 뷰티 리터칭, 합성, 3D, VFX, AI 기반 작업을 소개하고 전화 문의(010-5823-1350)로 이어집니다.

## 구성

- `index.html` — 랜딩(로고 + 서비스/포트폴리오 링크)
- `about.html` — 스튜디오 소개와 연혁
- `services.html` — 제공 서비스 7종
- `portfolio.html` — 작업물 그리드, 카테고리 필터, 영상 모달
- `contact.html` — 전화번호
- `styles.css` — 블랙 미니멀 테마 스타일
- `script.js` — 헤더/모바일 메뉴, 스크롤 리빌, 포트폴리오 필터 및 영상 모달
- `assets/logo.png`, `assets/favicon.svg` — 로고와 파비콘
- `assets/work/` — 포트폴리오 썸네일 (16:9)

빌드 도구나 서버 없이 정적 파일로만 동작합니다.

## 로컬 확인

```bash
# 저장소 루트에서
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## 배포

정적 파일이므로 GitHub Pages, Vercel, Netlify 등 어떤 정적 호스팅에도 그대로 올리면 됩니다.

## 포트폴리오 추가하기

`portfolio.html`의 `#project-grid` 안에 카드를 하나 복사해 붙여넣고 값만 바꾸면 됩니다.

```html
<article class="project-card reveal" data-category="drama" data-video-id="유튜브ID">
  <button type="button" class="project-media" aria-label="작품명 영상 재생">
    <img src="assets/work/파일명.jpg" alt="작품명" width="1280" height="720" loading="lazy">
    <span class="project-works">VFX · COMP · 3D</span>
  </button>
  <div class="project-meta">
    <h3>작품명</h3>
    <p class="project-sub">아티스트 / 방송사</p>
    <p class="project-info"><span class="project-cat">DRAMA</span>2026.08</p>
  </div>
</article>
```

- **작업 종류**가 여러 개면 `.project-works`에 ` · `로 이어 붙이면 됩니다 (`VFX · COMP · 3D`).
- **영상이 없는 작품**은 `data-video-id`를 빼고 `<button class="project-media">`를 `<div class="project-media">`로 바꾸세요. (`portfolio.html`의 드라마 카드 참고)
- **카테고리**는 `data-category` 값으로 `drama` / `mv` / `film` / `ad` 중 하나를 씁니다. 필터 버튼은 실제 존재하는 카테고리만 자동 생성되므로 버튼을 따로 추가할 필요가 없습니다. 새 카테고리를 쓰려면 `script.js`의 `LABELS`에 항목을 추가하세요.
- **썸네일**은 원본 비율 그대로 `assets/work/`에 넣으면 됩니다. 영상 스틸(16:9)이든 세로 포스터든 이미지 비율대로 표시됩니다. 다만 `<img>`의 `width`/`height` 속성은 실제 픽셀 크기로 적어주세요 — 로딩 중 레이아웃이 밀리는 것을 막아줍니다.

## 커스터마이징 메모

- 전화번호는 각 HTML의 `tel:` 링크와 표시 텍스트에 들어 있습니다. 번호가 바뀌면 전체 파일에서 함께 수정하세요.
- 폰트는 [Pretendard](https://github.com/orioncactus/pretendard)를 CDN으로 불러옵니다.
