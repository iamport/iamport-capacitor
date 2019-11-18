package kr.iamport.capacitor;

import android.app.Activity;
import android.os.Build;
import android.webkit.WebView;

public class IamportCertificationWebViewClient extends IamportWebViewClient {

    public IamportCertificationWebViewClient(Activity activity, String params) {
        super(activity, params);
    }

    /* WebView가 load되면 IMP.init, IMP.request_pay를 호출한다 */
    public void onPageFinished(WebView view, String url) {
        if (!loadingFinished && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) { // 무한루프 방지
            // setCustomLoadingPage(view);

            view.evaluateJavascript("IMP.init('" + userCode + "');", null);
            view.evaluateJavascript("IMP.certification(" + data + ", " + triggerCallback + ");", null);

            loadingFinished = true;
        }
    }
}
