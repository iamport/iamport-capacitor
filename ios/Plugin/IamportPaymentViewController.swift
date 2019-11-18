//
//  IamportPaymentViewController.swift
//  Plugin
//
//  Created by deedee on 14/11/2019.
//  Copyright © 2019 Max Lynch. All rights reserved.
//

import Foundation
import UIKit
import WebKit

class IamportPaymentViewController: IamportViewController {
    var BANKPAY: String = "kftc-bankpay"
    
    @available(iOS 8.0, *)
    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!){
        if (!loadingFinished) {
            webView.evaluateJavaScript("IMP.init('" + self.userCode + "');")
            webView.evaluateJavaScript("IMP.request_pay(" + self.data + ", " + self.triggerCallback + ");")
            
            self.loadingFinished = true
        }
    }
    
    override func openThirdPartyApp(url: String) {
        let splittedUrl = url.components(separatedBy: "://")
        let scheme = splittedUrl[0]
        let path = splittedUrl[1]
        
        if (scheme.hasPrefix(self.BANKPAY)) {
            triggerBankPay(url: url)
        }
        
        let appUrl = URL(string: self.getAppUrl(url: url, scheme: scheme, path: path))!
        let Application = UIApplication.shared
        if (Application.canOpenURL(appUrl)) {
            Application.open(appUrl, options: [:], completionHandler: nil)
        } else {
            let marketUrl = URL(string: self.getMarketUrl(url: url, scheme: scheme))!
            Application.open(marketUrl, options: [:], completionHandler: nil)
        }
    }
    
    func getAppUrl(url: String, scheme: String, path: String) -> String {
        return scheme == "itmss" ? "https://" + path : url
    }
    
    func getMarketUrl(url: String, scheme: String) -> String {
        switch (scheme) {
        case self.BANKPAY: // 뱅크페이
            return "https://itunes.apple.com/kr/app/id398456030";
        case "ispmobile": // ISP/페이북
            return "https://itunes.apple.com/kr/app/id369125087";
        case "hdcardappcardansimclick": // 현대카드 앱카드
            return "https://itunes.apple.com/kr/app/id702653088";
        case "shinhan-sr-ansimclick": // 신한 앱카드
            return "https://itunes.apple.com/app/id572462317";
        case "kb-acp": // KB국민 앱카드
            return "https://itunes.apple.com/kr/app/id695436326";
        case "mpocket.online.ansimclick": // 삼성앱카드
            return "https://itunes.apple.com/kr/app/id535125356";
        case "lottesmartpay": // 롯데 모바일결제
            return "https://itunes.apple.com/kr/app/id668497947";
        case "lotteappcard": // 롯데 앱카드
            return "https://itunes.apple.com/kr/app/id688047200";
        case "cloudpay": // 하나1Q페이(앱카드)
            return "https://itunes.apple.com/kr/app/id847268987";
        case "citimobileapp": // 시티은행 앱카드
            return "https://itunes.apple.com/kr/app/id1179759666";
        case "payco": // 페이코
            return "https://itunes.apple.com/kr/app/id924292102";
        case "kakaotalk": // 카카오톡
            return "https://itunes.apple.com/kr/app/id362057947";
        case "lpayapp": // 롯데 L.pay
            return "https://itunes.apple.com/kr/app/id1036098908";
        case "wooripay": // 우리페이
            return "https://itunes.apple.com/kr/app/id1201113419";
        case "nhallonepayansimclick": // NH농협카드 올원페이(앱카드)
            return "https://itunes.apple.com/kr/app/id1177889176";
        case "hanawalletmembers": // 하나카드(하나멤버스 월렛)
            return "https://itunes.apple.com/kr/app/id1038288833";
        case "shinsegaeeasypayment": // 신세계 SSGPAY
            return "https://itunes.apple.com/app/id666237916";
        default:
            return url;
        }
    }
    
    func triggerBankPay(url: String) {}
}
