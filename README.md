Cognitoを使ったサンプルコード

参考：https://qiita.com/Yuki_BB3/items/4286545e8b889ec13088
参考：https://qiita.com/Yuki_BB3/items/ee8330830951acd907de


１．ユーザープール名：user-identityをデフォルトで作成（パスワード条件はゆるくしとく）

２．アプリクライアント：create-userを作成（"Generate client secret"はオフに）

６．コードで使用するため、ユーザープール名：user-identityのプール IDと Identity Pool ARN を控えておく。



必要なモジュール。

必要なjsファイルの取得
./js 配下のmain.js以外の5ファイルが必要になるので準備する。


aws-cognito-sdk.min.js (https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/aws-cognito-sdk.min.js)
amazon-cognito-identity.min.js (https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/amazon-cognito-identity.min.js)
jsbn.js (http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js)
jsbn2.js (http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js)
sjcl.js (https://github.com/bitwiseshiftleft/sjcl/blob/master/sjcl.js)

