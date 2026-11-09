# 안드로이드 설정하기

> [!WARNING]
> **이 저장소는 더 이상 유지보수되지 않습니다 (Deprecated).**
>
> 아래 포트원 공식 문서를 참고해 주세요.
>
> - **포트원 V2 (권장)**: [모바일 SDK 레퍼런스](https://developers.portone.io/sdk/ko/v2-mobile-sdk/readme?v=v2) · [결제 연동 시작하기](https://developers.portone.io/opi/ko/integration/start/v2/readme?v=v2)
> - **포트원 V1 (기존 아임포트)**: [모바일 SDK 레퍼런스](https://developers.portone.io/sdk/ko/v1-mobile-sdk/readme?v=v1)

아임포트 캐패시터 모듈 안드로이드 설정 안내입니다.

### 1. 아임포트 모듈 추가하기
capacitor v3 부터는 BridgeActivity를 통해 플러그인 추가 할 필요가 없습니다.
https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading

```java
import kr.iamport.capacitor.IamportCapacitor;

public class MainActivity extends BridgeActivity {
}
```

### 2. 아임포트 액티비티 추가하기
`AndroidManifest.xml` 파일(android/app/src/main에 위치)에 아임포트 액티비티를 아래와 같이 추가해주세요.

```html
<manifest>
  <application>
    ...
    <!-- 아임포트 액티비티 추가 -->
    <activity
        android:name="kr.iamport.capacitor.IamportActivity"
        android:label="IamportActivity"
    >
    </activity>
    ...
  </application>
</manifest>
```
