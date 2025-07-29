---
title: 'React 성능 최적화 : 이미지 포맷, 번들 사이즈,  코드스플리팅 전략'
description: 'LCP 점수가 26.3초… 성능 지옥에서 벗어나기 위한 눈물의 리팩토링 기록입니다. WebP 변환, CDN 도입, 코드 스플리팅까지, LCP와 FCP 점수를 어떻게 줄였는지 공유합니다.'
thumbnail: '/images/article_sodong0.png'
date: '2024-09-14'
tags: ['React', 'Lighthouse', '이미지 최적화']
readTime: 5
featured: true
---

## LCP(Largest Contentful Paint)란?

![](https://velog.velcdn.com/images/imeureka/post/9d13c96d-e0d6-40cf-b936-a99e84008d60/image.png)

> Lighthouse는 초 단위로 LCP를 표시합니다. LCP는 표시 영역에서 가장 큰 콘텐츠 요소가 화면에 렌더링될 때 측정됩니다. 이는 페이지의 기본 콘텐츠가 사용자에게 표시되는 시점에 근접합니다.

### Lighthouse에서 LCP 점수를 결정하는 방법

[크롬의 추적도구](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool/)를 통해 점수를 추출한다.
보통 2.5초 내외를 good인 상태로 보고 있다. 많은 회사들은 LCP를 1초로 정하기도 한다고 한다.

### LCP 점수를 개선하는 방법 (1)

대부분의 성능 개선 작업은 LCP에 영향을 미친다. 병목들을 찾아서 하나씩 개선하면 LCP가 개선되는걸 확인하실 수 있다. LCP가 이미지인 경우 타이밍은 4단계로 나눌 수 있다.

| LCP 단계                 | 설명                                                                                                      |
| :----------------------- | --------------------------------------------------------------------------------------------------------- |
| TTFB(time to first byte) | 사용자가 페이지 로드를 시작한 시점부터 브라우저가 HTML 문서 응답의 첫 바이트를 수신할 때까지의 시간입니다 |
| 로드 지연                | TTFB와 브라우저가 LCP 리소스 로드를 시작하는 시점 사이의 델타입니다.                                      |
| 로드 시간                | LCP 리소스 자체를 로드하는 데 걸리는 시간                                                                 |
| 렌더링 지연              | LCP 요소가 완전히 렌더링될 때까지 LCP 리소스 로드가 완료되는 시점 사이의 델타입니다.                      |

우선 맨 처음으로 작업한 것은 번들 사이즈 확인이였다. 그 결과
![](https://velog.velcdn.com/images/imeureka/post/fb949eb9-3568-4003-b305-fa625ffca52d/image.png)

무분별하게 쓴 svgr을 통한 svg 컴포넌트가 엄청난 용량을 차지하고 있었다. yarn svgr을 통해 나는 원본 svg를 제거함으로써 용량이 가벼워진다는 생각을 하고 있었는데, svg내부에 이미지 태그가 있다면 결국 그 이미지 태그를 가져와야함으로 컴포넌트화의 장점만 지니게 된 것이다.
![](https://velog.velcdn.com/images/imeureka/post/d08ed868-2a7d-4cb1-9d0d-30b95009ce2b/image.png)![](https://velog.velcdn.com/images/imeureka/post/e629087f-d567-4aa8-a0ee-c393500e129b/image.png)

- **svg 파일을 컴포넌트화시킨다고 해서 파일크기의 변화는 없다 **
  ㄴ SVG는 XML 형식이고, 그 XML 태그들이 JSX 또는 TSX 파일에 그대로 포함되기 떄문

- 그럼 yarn svgr은 그저 컴포넌트화 시키기 위한 장점 뿐?
  ㄴ유연한 SVG 조작, SVG 이미지를 JSX 내에서 직접 사용할 수 있습니다. 이로 인해 동적인 스타일링, props 활용, 이벤트 핸들링이 가능

결론적으로, TSX로 변환했다고 해서 파일 크기가 자동으로 줄어드는 것이 아니라, 변환된 코드도 여전히 원본 SVG의 정보를 거의 그대로 포함하기 때문에 크기가 유사한 것이다.

-> SVG를 먼저 최적화한 후 변환하는 방식이 파일 크기를 줄이는 데 도움이 될 것이다.
그래서 어떨 때 svg, img를 쓰는게 맞는 걸까를 찾아보게 되었고, **png랑 svg 선택 할 떈 단순한 아이콘에는 svg이 좋지만 복잡한아이콘일수록 svg 추출하면 용량이 이것처럼 커진다는 점**을 알게 되었다.
이러한 이유로 home화면에 무분별하게 쓰인 svg 컴포넌트를 svg -> png 이미지 변경 작업을 성능 개선 첫 번째 작업으로 진행하였다.
그 결과 LCP 26.3초 -> 18.3초로 변화될 수 있었다.

### LCP 점수를 개선하는 방법 (2)

그 후에 이제, 소동 페이지 또한 LCP가 굉장히 안좋게 나왔는데 light house 검사 결과, 이미지 렌더링 특히 아무래도 3d 캐릭터를 사용하는 사이트이다보니 고화질 이미지가 사용되어 자원의 로드가 느렸다.

| LCP 단계                                                                                          | LCP 시간                                                                                          |
| :------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/imeureka/post/39906aea-ccba-4628-9c01-501929257e1f/image.png) | ![](https://velog.velcdn.com/images/imeureka/post/b37f6fd0-2872-4326-9362-013df5304ebe/image.png) |

![](https://velog.velcdn.com/images/imeureka/post/63d4456f-648d-4196-8b9e-261f3d3465fc/image.png)

> 모든 페이지의 LCP 값은 아래와 같은 4개의 하위 부분으로 나눌 수 있다. 그 사이에 겹치는 부분이나 차이가 없다. 이러한 시간의 총합은 전체 LCP 시간이 된다.

LCP를 최적화할 때 이러한 하위 부분을 개별적으로 최적화하는 것이 좋다.
예를 들어 이전의 네트워크 폭포식 구조에서 이미지를 더 많이 압축하거나 보다 최적의 형식 (예: AVIF 또는 WebP)으로 전환하여 **이미지의 파일 크기를 줄이면 리소스 로드 시간은 줄어들지만 시간이 요소 렌더링 지연 하위 부분으로 이동하므로 실제로는 LCP를 개선하지 못한다.**

![](https://velog.velcdn.com/images/imeureka/post/5376bd4d-705d-47d0-822d-f220ae28cb56/image.png)
처음엔 이렇게 프리로드 시켜줘야겠다 이미지들을! 생각하고 index.html에 무식하게 프리로드 시켜주었지만, 개선되지 않아 이유를 생각하였다. 당연하게도 미리 로드하려는 이미지들이 HTML에서 <link rel="preload">로 설정되었더라도, 해당 리소스들이 페이지 렌더링 과정에서 실제로 사용되고 있는지 확인이 필요하다. 이미지들이 자바스크립트로 동적으로 로드되고 있기 때문에 이는 소용 없는 개선 방안이였다.
그래서 우선 webp로 최적화를 시켜주었다.
![](https://velog.velcdn.com/images/imeureka/post/402c3819-18f0-447b-9141-ad63d4108b1b/image.png)

![](https://velog.velcdn.com/images/imeureka/post/7d52261a-0a13-4adb-86f0-4a67e6cd1d50/image.png)
그 결과, 전체적인 로드시간, 로드지연이 줄어든 것을 확인 할 수 있다. 하지만 렌더링 지연도 그만큼 늘어나 전체적으로 드라마틱한 효과는 없었다.

이후 멘토링을 통해 얻은 새로운 접근법은 cloudflare images optimization을 적용하는 것이다. 고화질 이미지는 resize가 필수! 그리고 cdn까지 간단하게 해결할 수 있는 것이 해당 cloudflare images이다. 그래서 이 과정을 리팩토링하고 있다.

### FCP 점수를 개선하는 방법

이후 라우트 기반 코드 스플리팅을 통해 번들 사이즈 최적화를 진행하였다.
![](https://velog.velcdn.com/images/imeureka/post/4dbf0e65-4604-495a-a900-63ed3ae0be1c/image.png)

이후 성능점수가 6점 정도 올랐고 특히 FCP가 감소된 것을 확인 할 수 있었다.

![](https://velog.velcdn.com/images/imeureka/post/a50b6ad0-b5a2-489b-84bf-2c664567853c/image.png)
