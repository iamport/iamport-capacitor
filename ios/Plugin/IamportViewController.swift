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
    var isFinished: Bool = false
    
    convenience init(call: CAPPluginCall) {
        self.init()
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.onDidReceiveData(_:)), name: Notification.Name.capacitorOpenURL, object: nil)
        
        self.userCode = call.getString("userCode") ?? "iamport"

        let data = call.getObject("data") ?? [:]
        self.data = self.objectToString(data: data)
        
        let appScheme = data["app_scheme"]
        if (appScheme != nil) {
            self.appScheme = appScheme as! String
        }
        self.triggerCallback = call.getString("triggerCallback") ?? ""
        self.redirectUrl = call.getString("redirectUrl") ?? "http://detectchangingwebview/iamport/capacitor"
    }
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        view = webView

        // 스와이프 다운 제스처 추가
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:)))
        webView.addGestureRecognizer(panGesture)
    }
    @objc func handlePanGesture(_ gesture: UIPanGestureRecognizer) {
        if gesture.state == .ended {
            let velocity = gesture.velocity(in: webView)
            if velocity.y > 1000 { // 스와이프 다운 감지 임계값
                self.dismiss(animated: true) // 모달 닫기
                delegate?.onBack() // onBack() 함수 호출
            }
        }
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
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        if self.isFinished == false {
           delegate?.onBack()
        }

    }
    @available (iOS 8.0, *)
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let navigationUrl = navigationAction.request.url!
        let url = navigationUrl.absoluteString;
        if (self.isOver(url: url)) {
            self.isFinished = true
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
