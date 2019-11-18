//
//  IamportCertificationViewController.swift
//  Plugin
//
//  Created by deedee on 14/11/2019.
//  Copyright © 2019 Max Lynch. All rights reserved.
//

import Foundation
import UIKit
import WebKit

class IamportCertificationViewController: IamportViewController {
    
    @available(iOS 8.0, *)
    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!){
        if (!loadingFinished) {
            webView.evaluateJavaScript("IMP.init('" + self.userCode + "');")
            webView.evaluateJavaScript("IMP.certification(" + self.data + ", " + self.triggerCallback + ");")
            
            self.loadingFinished = true
        }
    }
}
