# 안드로이드 설정하기

아임포트 캐패시터 모듈 안드로이드 설정 안내입니다.

### 1. 아임포트 모듈 추가하기
`MainActivity.java` 파일(adnorid/app/src/main/java/[...]에 위치)에 아임포트 캐패시터 모듈을 아래와 같이 추가해주세요.

```java
...
import kr.iamport.capacitor.IamportCapacitor;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      ...
      add(IamportCapacitor.class); // 아임포트 캐패시터 모듈 추가
    }});
  }
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