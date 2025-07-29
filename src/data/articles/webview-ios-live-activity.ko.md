---
title: 'React Native WebView에서 iOS Live Activities 제어하기'
description: 'WebView에서 시작한 액션이 iOS Native의 Live Activities(Dynamic Island)로 이어지도록 구현하며, React Native와 iOS 브릿지 연동 흐름을 정리했습니다.'
thumbnail: '/images/munji_article1.png'
date: '2025-06-27'
tags: ['ReactNative', 'Webview', 'Frontend']
readTime: 5
featured: true
---

# React Native WebView에서 iOS Live Activities 제어하기

다 바이브 코딩 때문이야..이해하지 못하고 쓰니까 어려웠나봐요.
그래서 다시 차근차근 공부해보면서 오늘안에 해결해볼게요

저는 [Use The iOS Dynamic Island in Your React Native Apps: A Step-by-Step Guide](https://blog.stackademic.com/unleashing-ios-dynamic-islands-in-your-react-native-app-a-step-by-step-guide-eee3c5ed3059) 이 분의 블로그 글을 보며 세팅했습니다!

자세한 구현 코드를 원하시다면 해당 블로그를 참고 부탁드립니다. 저는 설계 과정을 이해하고자 정리해본 글입니다 ㅎㅎ!

## 구현 기능 정리

### 1️⃣ 앱 메인

React Native 기반으로 제작 (TS / RN → iOS Native bridge 통해 iOS 앱으로 빌드됨)

### 2️⃣ 웹뷰 화면

- RN 앱 안에 WebView로 웹 페이지 임베딩
- 사용자는 WebView 안에서 버튼 클릭 (ex: "타이머 시작")

### 3️⃣ Dynamic Island, Widget (iOS Native 기능)

- iOS에서 지원하는 특수 영역 (Live Activities API 등)
- 이건 100% Native에서 동작 (Swift, Obj-C / iOS SDK 기반)

## WebView → iOS Native → Live Activities 호출 어떻게?

```plain
React Native (JS 코드)
  |
  └ WebView (웹)
       |
       └ JavaScript Bridge (postMessage 등)
            |
            └ React Native 코드에서 메시지 수신
                  |
                  └ Native Module 호출 (Swift/Obj-C)
                        |
                        └ iOS Live Activities 실행 (Dynamic Island, Widget 업데이트)

```

1. 웹 페이지에서 JS로 다음처럼 보낼 수 있음

```typescript
window.ReactNativeWebView.postMessage(
  JSON.stringify({
    action: 'startTimer',
    duration: 1500,
  }),
);
```

2. React Native 에서 메시지 수신

```typescript
import React from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface WebViewMessage {
  action: 'startTimer' | 'stopTimer'; // 가능한 액션 타입
  duration?: number; // action이 startTimer일 경우에만 필요
}

const MyWebViewComponent = () => {
  // WebView 메시지 수신 핸들러
  // 즉, WebView에서 메시지가 올 때 실행되는 핸들러 함수
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      // WebView로부터 받은 데이터를 JSON 형식으로 파싱
      const message: WebViewMessage = JSON.parse(event.nativeEvent.data);
      // 메시지의 action이 'startTimer'이고 duration이 숫자라면 타이머 시작
      if (message.action === 'startTimer' && typeof message.duration === 'number') {
        startLiveActivity(message.duration);
      } else if (message.action === 'stopTimer') {
        stopLiveActivity();
      } else {
        console.warn('지원하지 않는 메시지입니다.', message);
      }
    } catch (error) {
      console.error('WebView 메시지 파싱 실패:', error);
    }
  };

  return (
    <WebView
      source={{ uri: 'https://...' }}
      onMessage={handleMessage} // 타입이 자동으로 추론됨
    />
  );
};

// 예시 함수들
const startLiveActivity = (duration: number) => {
  console.log(`타이머 ${duration}초 시작`);
};

const stopLiveActivity = () => {
  console.log('타이머 중지');
};


```

WebView → RN → Native 연결 준비 완료

3.  React Native에서 Native Module 호출
    RN에서는 Native Module 만들어서 iOS Native로 기능 전달해야 함.
    (이 부분이 `react-native-live-activities` 가 대신 해주고 있음)

```typescript
import LiveActivities from 'react-native-live-activities';
const startLiveActivity = async (duration: number) => {
  await LiveActivities.createActivity({
    name: 'Pomodoro',
    data: {
      remainingTime: duration,
      isRunning: true,
      taskName: '포모도로 집중',
    },
  });
};
```

- React Native 자체는 iOS native를 직접 다룰 수 없음. → Native Module 사용
- WebView는 React Native의 일부일 뿐이다. → postMessage 통해 통신
- **Dynamic Island, Widget, Live Activities 등은 iOS Native SDK를 통해 컨트롤**

## Xcode의 역할

이제 왜 Xcode가 필요한지 감이 올 거임
React Native 프로젝트 빌드할 때 iOS 프로젝트로 패키징 → Xcode 필요
iOS Native SDK 활용 (Live Activities, Widgets) → Swift 코드 → Xcode에서 관리
앱 배포, 인증, 시뮬레이터 테스트 → Xcode 필요

## 🚨 RCTBridgeModule.h file not found 에러

무려 5시간의 내 눈물을 훔쳤던 이 에러
분명 레퍼런스대로 천천히 했는데 브릿지 설정할 때 저 에러가 생겼음.

`원인`
Xcode가 React/RCTBridgeModule.h의 경로를 못 찾기 때문에 발생.
이 파일은 React Native가 설치된
node_modules/react-native/React/Base/RCTBridgeModule.h 요기에 존재해야되는데 하지만 Xcode의 Header Search Paths에 이 경로가 포함되지 않았거나, 타겟 설정이 잘못된 경우 해당 헤더를 찾을 수 없다~~!

`해결 방법 `
**1. Header Search Paths 설정**
![](https://velog.velcdn.com/images/imeureka/post/9dc1a317-a171-454b-a4fb-d6e6d6f2d275/image.png)

Xcode에서 프로젝트가 아니고 **타겟**(go2go_mobile) 설정으로 이동

"Build Settings" > "Header Search Paths" 항목 검색

아래 항목을 추가

```
$(SRCROOT)/../node_modules/react-native/React/**
```

🚨 주의: 위 항목은 recursive 옵션으로 설정

**2. Bridging Header가 Extension이 아닌 App 타겟에 있어야 함**

RCT_EXTERN_MODULE이 들어간 .m 파일은 메인 앱 타겟에서 빌드되어야 한다.
LiveActivityModule.m이 혹시 Widget Extension에 포함되어 있다면 go2go_mobile 앱 타겟으로 옮겨야 한다
![](https://velog.velcdn.com/images/imeureka/post/2ee3f690-1487-4248-a3af-beea4aae3b13/image.png)
위 두가지 방법을 실행하니 빌드 성공했다.

확인 방법:

- LiveActivityModule.m 파일 선택
- 오른쪽 "File Inspector" 탭 열기
- "Target Membership" 에서 go2go_mobile만 체크, TimerLiveActivityExtension은 체크 해제

![](https://velog.velcdn.com/images/imeureka/post/7fcbec10-775c-436c-9181-7931f76e9160/image.png)
임시로 해본 라이브액티비티 ㅎㅎ...

참고
[Use The iOS Dynamic Island in Your React Native Apps: A Step-by-Step Guide](https://blog.stackademic.com/unleashing-ios-dynamic-islands-in-your-react-native-app-a-step-by-step-guide-eee3c5ed3059)
