rm target.apk
eas build --local --output bundle.aab -pandroid
java -jar bundletool.jar build-apks --mode=universal --bundle=bundle.aab --output=my_app.apks --ks=keystore.jks --ks-key-alias=c2628875035d0d29d3f5a3cbac8420c1 --ks-pass=pass:50f8d3a8d00936aacad18e0d629abbc5 --key-pass=pass:799fcd0f90dab625aa32a9ea28f2c252 
unzip -p my_app.apks *.apk > target.apk
rm my_app.apks