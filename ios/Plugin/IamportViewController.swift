//
//  IamportViewController.swift
//  Plugin
//
//  Created by deedee on 14/11/2019.
//  Copyright © 2019 Max Lynch. All rights reserved.
//

import Foundation
import Capacitor
import UIKit
import WebKit

class IamportViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {
    weak var delegate:IamportDelegate?
    var webView: WKWebView!
    var userCode: String!
    var data: String = ""
    var appScheme: String = ""
    var triggerCallback: String = ""
    var redirectUrl: String!
    var loadingFinished: Bool = false
    
    convenience init(call: CAPPluginCall) {
        self.init()
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.onDidReceiveData(_:)), name: Notification.Name(CAPNotifications.URLOpen.name()), object: nil)
        
        self.userCode = call.getString("userCode") ?? "iamport"

        let data = call.getObject("data") ?? [:]
        self.data = self.objectToString(data: data)
        
        let appScheme = data["app_scheme"]
        if (appScheme != nil) {
            self.appScheme = appScheme as! String
        }
        self.triggerCallback = call.getString("triggerCallback") ?? ""
        self.redirectUrl = call.getString("redirectUrl") ?? "http://localhost/iamport"
    }
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        view = webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let iamportBundle = Bundle(for: IamportCapacitor.self)
        let WEBVIEW_PATH = iamportBundle.url(forResource: "webview_source", withExtension: "html");
        if WEBVIEW_PATH != nil {
            let myRequest = URLRequest(url: WEBVIEW_PATH!)
            webView.load(myRequest)
        }
    }
    
    @available (iOS 8.0, *)
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let navigationUrl = navigationAction.request.url!
        let url = navigationUrl.absoluteString;
        print(url);
        if (self.isOver(url: url)) {
            self.webView.stopLoading()
            self.webView.removeFromSuperview()
            self.webView.navigationDelegate = nil
            self.webView = nil
            
            self.dismiss(animated: true)
            delegate?.onOver(type: url)
            
            decisionHandler(.cancel)
        } else if (self.isUrlStartsWithAppScheme(url: url)) {
            self.openThirdPartyApp(url: url)
            decisionHandler(.cancel)
        } else {
            decisionHandler(.allow)
        }
    }
    
    /* 종료 여부 판단 */
    func isOver(url: String) -> Bool {
        return url.hasPrefix(self.redirectUrl);
    }
    
    func isUrlStartsWithAppScheme(url : String) -> Bool {
        let splittedScheme = url.components(separatedBy: "://");
        let scheme = splittedScheme[0];
        return scheme != "http" && scheme != "https" && scheme != "about:blank" && scheme != "file";
    }
    
    func openThirdPartyApp(url: String) {}
    
    func objectToString(data: [String: Any]) -> String {
        do {
            let data = try JSONSerialization.data(withJSONObject: data, options: .prettyPrinted)
            return String(data: data, encoding: String.Encoding.utf8) ?? ""
        } catch {
            return ""
        }
    }
    
    @objc func onDidReceiveData(_ notification: Notification) {}
}
