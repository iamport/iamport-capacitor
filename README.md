
# iamport-capacitor
[ ![alt text](https://img.shields.io/badge/capacitor-latest-orange.svg?longCache=true&style=flat-square) ](https://github.com/ionic-team/capacitor)
[ ![alt text](https://img.shields.io/badge/query--string-v6.8.3-yellow.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

아임포트 캐패시터 모듈입니다.

## 목차
- [버전정보](manuals/VERSION.md)
- 지원정보
- 설치하기
- 설정하기
  - [IOS 설정하기](manuals/SETTING.md)
  - [안드로이드 설정하기](manuals/SETTING_ANDROID.md)
- 예제 코드
- 예제 프로젝트

## 버전정보
최신버전은 [v0.9.0](https://github.com/iamport/iamport-react-native/tree/master)입니다. 버전 히스토리는 [버전정보](manuals/VERSION.md)를 참고하세요.

## 지원정보

#### 지원기능
- 일반결제 및 정기결제([지원하는 PG사와 결제수단 확인하기](manuals/SUPPORT.md))
- 휴대폰 본인인증

#### 지원 UI 프레임워크
- 리액트JS
- 앵귤러JS
- 뷰JS

## 설치하기
아래 명령어를 통해 아임포트 캐패시터 모듈을 귀하의 캐패시터 프로젝트에 추가할 수 있습니다.

```
$ npm install iamport-react-native --save
```

## 설정하기
캐패시터 프로젝트에서 아임포트 캐패시터 모듈을 사용하려면, 각 디바이스 환경에 맞는 설정이 필요합니다. 아래 내용을 참고해 필요한 설정을 완료해주세요.

- [IOS 설정하기](manuals/SETTING_IOS.md)
- [안드로이드 설정하기](manuals/SETTING_ANDROID.md)

## 예제코드
아임포트 캐패시터 모듈은 캐패시터가 제공하는 모든 UI 프레임워크(`리액트JS`, `앵귤러JS` 그리고 `뷰JS`)에서 동작합니다.

- [리액트 예제코드](manuals/EXAMPLE_REACT.md)
- 앵귤러 예제코드 (준비중)
- 뷰 예제코드 (준비중)

## 예제 프로젝트
아임포트 캐패시터 모듈은 예제 프로젝트(`example`)을 포함하고 있습니다. 아래 과정을 통해 예제 프로젝트를 직접 실제 디바이스에 설치해 테스트해볼 수 있습니다.

iamport-capacitor 모듈을 clone받아 폴더 위치를 `example` 프로젝트로 이동합니다.

```
$ git clone https://github.com/iamport/iamport-capacitor.git
$ cd ./iamport-react-native/example
```

필요한 npm 모듈을 설치합니다.

```
$ npm install
```

앱을 빌드합니다.

```
$ npm run build 또는 ionic build
```

빌드한 내용을 네이티브 프로젝트에 카피합니다.

```
$ npx cap copy
```

네이티브 프로젝트를 오픈합니다.

```
$ npx cap open ios // Xcode 오픈
$ npx cap open android // Android Studio 오픈
```

프로젝트를 빌드합니다. 빌드에 성공하면 기기에 example 앱이 설치됩니다.