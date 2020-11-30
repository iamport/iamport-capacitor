package kr.iamport.capacitor;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import kr.iamport.capacitor.iamportcapacitor.R;

public class IamportActivity extends Activity {
    WebView webview;
    IamportWebViewClient webViewClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Application application = getApplication();
        String packageName = application.getPackageName();

        Integer identifier = application.getResources().getIdentifier("iamport_activity", "layout", packageName);
        setContentView(identifier);

        webview = (WebView) findViewById(R.id.webview);
        WebSettings settings = webview.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);

        webview.loadUrl(IamportCapacitor.WEBVIEW_PATH);
        webview.setWebChromeClient(new IamportWebChromeClient());

        Bundle extras = getIntent().getExtras();
        String type = extras.getString("type");
        String params = extras.getString("params");
        switch (type) {
            case "nice": { // 나이스 && 실시간 계좌이체
                webViewClient = new IamportNiceWebViewClient(this, params);
                break;
            }
            case "certification": { // 휴대폰 본인인증
                webViewClient = new IamportCertificationWebViewClient(this, params);
                break;
            }
            default: { // 결제
                webViewClient = new IamportPaymentWebViewClient(this, params);
                break;
            }
        }
        webview.setWebViewClient(webViewClient);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        webview.clearHistory();
        webview.clearCache(true);
        webview.destroy();
        webview = null;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == IamportCapacitor.REQUEST_CODE_FOR_NICE_TRANS) {
            webViewClient.bankPayPostProcess(requestCode, resultCode, data);
        }
    }

    @Override
    public void onBackPressed() {
        // 뒤로가기 버튼 눌렀을때
        if (webview.canGoBack()) {
            // 뒤로 갈 수 있으면, 뒤로 보낸다
            webview.goBack();
        } else {
            // 뒤로 갈 수 없는 경우, 액티비티를 종료한다
            setResult(IamportCapacitor.RESULT_CODE_FOR_BACK, null);
            finish();
        }
    }
}
