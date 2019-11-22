
  Pod::Spec.new do |s|
    s.name = 'IamportCapacitor'
    s.version = '0.0.1'
    s.summary = 'Capacitor plugin for Iamport'
    s.license = 'MIT'
    s.homepage = 'https://github.com/iamport/iamport-capacitor'
    s.author = 'Solee Choi'
    s.source = { :git => 'https://github.com/iamport/iamport-capacitor', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
    s.resources = ['ios/Resources/webview_source.html']
  end
