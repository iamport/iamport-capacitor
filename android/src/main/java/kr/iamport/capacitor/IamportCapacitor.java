package kr.iamport.capacitor;

import android.app.Instrumentation;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import org.json.JSONObject;

@CapacitorPlugin(name = "IamportCapacitor")
public class IamportCapacitor extends Plugin {

    Intent intent;

    static final int REQUEST_CODE = 6018;
    static final int REQUEST_CODE_FOR_NICE_TRANS = 4117;
    static final int RESULT_CODE_FOR_BACK = 4783;
    static final String WEBVIEW_PATH = "file:///android_asset/html/webview_source.html";

    @PluginMethod
    public void startIamportActivity(final PluginCall call) {
        getActivity()
            .runOnUiThread(
                new Runnable() {
                    @Override
                    public void run() {
                        intent = new Intent(getContext(), IamportActivity.class);
                        String type = call.getString("type");
                        JSONObject params = call.getData();
                        intent.putExtra("type", type);
                        intent.putExtra("params", params.toString());
                        startActivityForResult(call, intent, "payResult");
                    }
                }
            );
    }

    @ActivityCallback
    private void payResult(PluginCall call, ActivityResult result) {
        int resultCode = result.getResultCode();
        Log.d("log", "payResult:" + resultCode);
        if (resultCode == RESULT_CODE_FOR_BACK) {
            // 뒤로가기 버튼 눌렀을때

            notifyListeners("IMPBack", null);
        } else {
            // 정상적으로 결제 프로세스 종료됐을때
            Intent data = result.getData();

            Bundle extras = data.getExtras();
            String url = extras.getString("url");

            JSObject ret = new JSObject();
            ret.put("url", url);
            notifyListeners("IMPOver", ret);

            //plugin
            call.resolve(ret);
        }
    }
    //
    //    @Override
    //    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
    //        super.handleOnActivityResult(requestCode, resultCode, data);
    //
    //        if (requestCode == REQUEST_CODE) {
    //          if (resultCode == RESULT_CODE_FOR_BACK) {
    //              // 뒤로가기 버튼 눌렀을때
    //              notifyListeners("IMPBack", null);
    //          } else {
    //              // 정상적으로 결제 프로세스 종료됐을때
    //              Bundle extras = data.getExtras();
    //              String url = extras.getString("url");
    //
    //              JSObject ret = new JSObject();
    //              ret.put("url", url);
    //              notifyListeners("IMPOver", ret);
    //          }
    //      }
    //    }
}
