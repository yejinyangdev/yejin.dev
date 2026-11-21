# yejin.dev

Next.js 기반의 개인 기술 블로그

## 스택

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS, next-themes (다크 모드)
- 포스트: Markdown(frontmatter) + unified/remark/rehype

## 실행

```bash
pnpm install
pnpm dev
```

## 컨벤션

- **파일/폴더명**
  - 파일명은 kebab-case (post-list.tsx)
  - 컴포넌트는 PascalCase
  - 운영 환경에 따른 대소문자 이슈를 줄이기 위해 파일명은 전반적으로 kebab-case로 통일
- **상수/설정**
  - `constants/` 에서 경로, 메시지, 사이트 정보 등 관리

## 렌더링 방식

- **콘텐츠 구조**
  - content/posts/{slug}/index.mdx
  - frontmatter는 gray-matter로 파싱
  - frontmatter에 `tags: ["Troubleshooting", "Architecture"]` 형태로 태그를 추가하면 홈 필터와 글 목록에 자동 반영
  - 기본 태그는 `Troubleshooting`, `Architecture`, `Workflow`, `Product`로 운영하고, 첫 회고 글 작성 시 `Retrospective` 추가
  - 홈에서는 태그 하나를 선택해 글을 필터링하며, 태그 없는 글도 전체 목록에 표시
  - 본문은 Markdown 문자열로 관리
- **흐름**
  - 빌드/요청 시 `getPostBySlug(slug)` 로 Markdown 파일 읽기
  - → unified 파이프라인으로 HTML 문자열 생성
  - → 서버에서 HTML 생성 후 클라이언트에는 `dangerouslySetInnerHTML` 로 전달

```
  마크다운 문자열
    → remark-parse (mdast)
    → remark-gfm (GFM 확장)
    → remark-breaks (단일 줄바꿈을 `<br>` 로 처리)
    → remarkImagePath (상대 경로 이미지 → /posts/{slug}/...)
    → remark-rehype (hast, allowDangerousHtml)
    → rehype-raw (raw HTML 노드 해석)
    → rehype-slug / rehypeCollectToc (헤딩 ID 및 목차 생성)
    → rehype-highlight (서버 코드 하이라이트, 언어 미지정 시 자동 감지)
    → rehype-stringify (HTML 문자열)
    → 최종 HTML
 ```
- **이미지**
  - 본문 내 상대 경로(`./xxx.png`)는 remark 단계에서 `/posts/{slug}/xxx.png` 로 변환
  - 실제 파일은 `app/posts/[slug]/[file]/route.ts`(GET)에서 읽어 응답
  - 각 포스트 폴더의 `cover.*` 파일은 썸네일로 자동 사용

## 추가 메모

- **렌더링 전략**: MDX 컴포넌트를 런타임에서 직접 렌더링하지 않고, 빌드/요청 시 HTML 문자열로 변환하여 런타임 복잡도와 hydration 비용을 최소화
- **코드 하이라이트**: 서버에서 완성하며, 클라이언트에서 본문 DOM을 다시 탐색하거나 하이라이트하지 않습니다. 테마 CSS는 루트 레이아웃에서 불러옵니다.
- **글 모델**: `PostSummary`는 목록 정보이고 `Post`는 여기에 본문을 더한 모델입니다. frontmatter는 `PostMetadata`로 읽은 뒤 중복 없이 변환합니다.
- **목차**: 공통 링크는 `PostTocLinks`, 모바일 UI는 `MobilePostToc`, 다이얼로그·스크롤 복원은 `useTocSheet`가 담당합니다.
- **보안**: 개인 블로그 용도이며 콘텐츠 소스가 제한적이기 때문에 `dangerouslySetInnerHTML` 사용 (필요 시 `rehype-sanitize` 로 sanitize 단계 추가 가능)

## 구조 요약

- `app/` — 라우트, 레이아웃, 페이지 (App Router)
- `components/` — UI 컴포넌트 (layout, posts, icons 등)
- `content/posts/` — Post 소스 (폴더 단위 관리)
- `lib/` — 파일 기반 posts 조회, Markdown 변환 등 입출력·콘텐츠 처리
- `domain/` — React·파일 시스템에 의존하지 않는 글 모델
- `application/` — 태그 집계·필터링 등 순수한 글 탐색 유스케이스
- `hooks/` — 스크롤 감지 등 브라우저와 연결되는 공용 React 훅
- `constants/` — 전역 설정 및 고정 값

## 글 탐색 구조

- `lib/posts.ts`는 파일에서 글을 읽고, 홈에서 목록용 데이터만 `PostBrowser`에 전달합니다.
- `usePostBrowser`는 선택 상태를 관리하고 `application/browse-posts.ts`에 탐색 계산을 맡깁니다.
- `PostBrowser`는 태그 필터와 결과 목록을 조합합니다. 태그 UI는 `PostTagFilter`, 글 UI는 `PostList`가 담당합니다.
- `useHorizontalScrollHint`는 스크롤 영역과 내용의 크기를 관찰합니다. 태그·글 데이터에 의존하지 않습니다.
- 의존성은 화면/React 훅 → application → domain 방향이며, domain/application에서는 React·DOM·파일 시스템을 사용하지 않습니다.

탐색 로직 테스트는 별도 테스트 라이브러리 없이 TypeScript로 컴파일한 뒤 Node의 테스트 러너로 실행합니다.

```bash
pnpm exec tsc application/browse-posts.test.ts --outDir /tmp/yejin-post-browser-tests --module commonjs --target ES2020 --esModuleInterop --strict --skipLibCheck
node --test /tmp/yejin-post-browser-tests/application/browse-posts.test.js
```
