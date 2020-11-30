package kr.iamport.capacitor;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONObject;

@NativePlugin(
        requestCodes={IamportCapacitor.REQUEST_CODE}
)
public class IamportCapacitor extends Plugin {
    Intent intent;

    static final int REQUEST_CODE = 6018;
    static final int REQUEST_CODE_FOR_NICE_TRANS = 4117;
    static final int RESULT_CODE_FOR_BACK = 4783;
    static final String WEBVIEW_PATH = "file:///android_asset/html/webview_source.html";

    @PluginMethod()
    public void startIamportActivity(final PluginCall call) {
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                intent = new Intent(getContext(), IamportActivity.class);
                String type = call.getString("type");
                JSONObject params = call.getData();
                intent.putExtra("type", type);
                intent.putExtra("params", params.toString());

                getActivity().startActivityForResult(intent, REQUEST_CODE);
            }
        });
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE) {
          if (resultCode == RESULT_CODE_FOR_BACK) {
              // 뒤로가기 버튼 눌렀을때
              notifyListeners("IMPBack", null);
          } else {
              // 정상적으로 결제 프로세스 종료됐을때
              Bundle extras = data.getExtras();
              String url = extras.getString("url");

              JSObject ret = new JSObject();
              ret.put("url", url);
              notifyListeners("IMPOver", ret);
          }
      }
    }
}
