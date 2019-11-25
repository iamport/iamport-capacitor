# example

아임포트 캐패시터 모듈 `리액트-타입스크립트` 예제 프로젝트입니다.

### 예제 프로젝트 실행하기
아래 과정을 통해 예제 프로젝트를 직접 실제 디바이스에 설치해 테스트 해볼 수 있습니다.

iamport-capacitor 모듈을 clone받아 폴더 위치를 `example` 프로젝트로 이동합니다.

```
$ git clone https://github.com/iamport/iamport-capacitor.git
$ cd ./iamport-capacitor/example
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
