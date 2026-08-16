# Devlog 에이전트 가이드

## 프로젝트

- Next.js 14 App Router, TypeScript, Tailwind CSS, Contentlayer, `next-intl` 기반 블로그다.
- UI: `src/`, 콘텐츠: `content/{ko,en,ja}/`, 번역 메시지: `messages/{ko,en,ja}.json`
- `src` 모듈은 `@/*` 별칭으로 가져온다.

## 명령어

- 개발: `pnpm dev`
- 린트: `pnpm lint`
- 빌드: `pnpm build`

소스 변경 후 `pnpm lint`를 실행한다.  

## 규칙

- Server Component를 우선하고, 필요할 때만 `"use client"`를 사용한다.
- 기존 패턴과 컴포넌트를 재사용하며, 관련 없는 파일은 수정·포맷하지 않는다.
- `Post` frontmatter에는 `title`, `date`, `tags`가 필요하고, `Page`에는 `title`이 필요하다.
- 로케일 UI 변경 시 해당 메시지 파일도 함께 확인한다.
- `.next/`, `.contentlayer/`, `next-env.d.ts`는 생성물이므로 직접 수정·커밋하지 않는다.
- 요청 없이는 커밋, 푸시, 배포, 의존성·시크릿 설정 변경을 하지 않는다.
