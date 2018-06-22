AWS.config.region = 'ap-northeast-1'; // Region
AWSCognito.config.region = 'ap-northeast-1'; // Region

var data = { UserPoolId: 'ap-northeast-1_rkq6Y7eAY',
    ClientId: '1o4i0521aqpdaq7b2uu4d4gfe5'   //create-userのクライアントID
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
    cognitoUser.getSession(function(err, sessresult) {
        if (sessresult) {
            console.log('You are now logged in.');
            cognitoUser.getUserAttributes(function(err, attrresult) {
                if (err) {
                    alert(err);
                    return;
                }
                $("#username").html("Username: " + cognitoUser.username);

                for (i = 0; i < attrresult.length; i++) {
                    if (attrresult[i].getName()=="email"){
                        $("#email").html("EMail: " + attrresult[i].getValue());
                    }
                }
/* この部分もmain.jsの冒頭と同様。フェデレーティッドアイデンティティを使用する場合に必要。
                // Add the User's Id Token to the Cognito credentials login map.
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'ap-northeast-1:53759361-5b32-4610-8f78-679203f78813',
                    Logins: {
                        'arn:aws:cognito-identity:ap-northeast-1:567403292509:identitypool/ap-northeast-1:53759361-5b32-4610-8f78-679203f78813': sessresult.getIdToken().getJwtToken()
                    }
                });
*/
            });
        } else {
            var url = "login.html";
            $(location).attr("href", url);
        }
    });
} else {
    var url = "login.html";
    $(location).attr("href", url);
}
