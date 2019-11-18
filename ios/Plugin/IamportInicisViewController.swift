//
//  IamportInicisViewController.swift
//  Plugin
//
//  Created by deedee on 14/11/2019.
//  Copyright © 2019 Max Lynch. All rights reserved.
//

import Foundation
import WebKit

class IamportInicisViewController: IamportPaymentViewController {
    @objc override func onDidReceiveData(_ notification: Notification) {
        let object: NSObject = notification.object as! NSObject
        let url: URL = object.value(forKey: "url") as! URL
        let urlString: String = url.absoluteString
        
        let query = urlString.components(separatedBy: self.appScheme + "://?")[1]
        webView.evaluateJavaScript("window.location.href='" + self.redirectUrl + "?" + query + "'")
    }
}
