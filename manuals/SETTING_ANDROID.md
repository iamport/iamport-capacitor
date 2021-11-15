# 안드로이드 설정하기

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
