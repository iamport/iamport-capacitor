//
//  IamportNiceViewController.swift
//  Plugin
//
//  Created by deedee on 14/11/2019.
//  Copyright © 2019 Max Lynch. All rights reserved.
//

import Foundation
import WebKit

class IamportNiceViewController: IamportPaymentViewController {
    var NICE_TRANS_URL: String = "https://web.nicepay.co.kr/smart/bank/payTrans.jsp"
    
    override func triggerBankPay(url: String) {
        // user_key 추출해 callbackparam2값으로 전달
        let queryItems = URLComponents(string: url)?.queryItems
        let userKey: String = (queryItems?.filter({$0.name == "user_key"}).first!.value)!
        NICE_TRANS_URL = NICE_TRANS_URL + "?callbackparam2=" + userKey
    }
    
    @objc override func onDidReceiveData(_ notification: Notification) {
        let object: NSObject = notification.object as! NSObject
        let url: URL = object.value(forKey: "url") as! URL
        let urlString: String = url.absoluteString

        // bankpaycode값과 bankpayvalue값을 추출해 각각 bankpay_code와 bankpay_value값으로 전달
        let queryItems = URLComponents(string: urlString)?.queryItems
        let bankpayCode: String = (queryItems?.filter({$0.name == "bankpaycode"}).first!.value)!
        let bankpayValue: String = (queryItems?.filter({$0.name == "bankpayvalue"}).first!.value)!

        NICE_TRANS_URL = NICE_TRANS_URL + "&bankpay_code=" + bankpayCode + "&bankpay_value=" + bankpayValue
        let requestUrl: URL = URL(string: NICE_TRANS_URL)!
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"

        webView.load(request)
    }
}
