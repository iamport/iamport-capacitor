package kr.iamport.capacitor;

import android.app.Activity;
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
            if (resultCode == Activity.RESULT_CANCELED) {
                return;
            }
            Bundle extras = data.getExtras();
            String url = extras.getString("url");

            JSObject ret = new JSObject();
            ret.put("url", url);
            notifyListeners("IMPOver", ret);
        }
    }
}
