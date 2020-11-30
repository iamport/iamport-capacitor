
# iamport-capacitor
[ ![alt text](https://img.shields.io/badge/capacitor-latest-orange.svg?longCache=true&style=flat-square) ](https://github.com/ionic-team/capacitor)
[ ![alt text](https://img.shields.io/badge/query--string-v6.8.3-yellow.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

아임포트 캐패시터 모듈입니다.

## 버전정보
최신버전은 [v0.11.0](https://github.com/iamport/iamport-capacitor/tree/master)입니다. 버전 히스토리는 [버전정보](manuals/VERSION.md)를 참고하세요.

## 지원정보

아임포트 캐패시터 모듈은 `일반결제`, `정기결제` 그리고 `휴대폰 본인인증` 기능을 모두 제공합니다. 또한 아이오닉이 제공하는 UI프레임워크(`리액트JS`, `앵귤러 JS`)에서 모두 연동 가능합니다. 지원하는 PG사와 결제수단에 대한 자세한 내용은 [지원정보](manuals/SUPPORT.md)를 참고하세요.

## 설치하기
아래 명령어를 통해 아임포트 캐패시터 모듈을 귀하의 캐패시터 프로젝트에 추가할 수 있습니다.

```
$ npm install iamport-capacitor --save
```

앱을 빌드하고 빌드한 내용을 네이티브 코드에 카피합니다.

```
$ npm run build 또는 ionic build
$ npx cap copy
```

## 설정하기
캐패시터 프로젝트에서 아임포트 캐패시터 모듈을 사용하려면, 각 디바이스 환경에 맞는 설정이 필요합니다. 아래 내용을 참고해 필요한 설정을 완료해주세요.

- [IOS 설정하기](manuals/SETTING_IOS.md)
- [안드로이드 설정하기](manuals/SETTING_ANDROID.md)

## 예제코드

- [리액트 예제코드](manuals/EXAMPLE_REACT.md)
- [앵귤러 예제코드](manuals/EXAMPLE_ANGULAR.md)
- 뷰 예제코드 (준비중)

## 예제 프로젝트

- [리액트 예제 프로젝트](example/README.md)
- [앵귤러 예제 프로젝트](exampleForAngular/README.md)
- 뷰 예제 프로젝트 (준비중)
