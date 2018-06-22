/*AWS.config.region = 'ap-northeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:53759361-5b32-4610-8f78-679203f78813' // フェデレーティッドアイデンティティのIDプール:LoginAppのプールID
});
// Initialize the Amazon Cognito credentials provider
AWSCognito.config.region = 'ap-northeast-1'; // Region
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:53759361-5b32-4610-8f78-679203f78813' // フェデレーティッドアイデンティティのIDプール:LoginAppのプールID
});
*/

// 以上の情報いらないじゃーん。もー
// つまりユーザープールだけつくればいい。フェデレーティッドアイデンティティのloginAppはなんのために必要かわからんが作る必要なし

var data = {
    UserPoolId: 'ap-northeast-1_rkq6Y7eAY', // ユーザープール名：user-identityのプール ID
    ClientId: '1o4i0521aqpdaq7b2uu4d4gfe5' // アプリクライアントcreate-userのクライアントID
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
var cognitoUser;


$('#user_add_btn').click(function () {
    username = $("#inputUsername").val();
    email    = $("#inputEmail").val();
    password = $("#inputPassword").val();
    if (!username || !password || !email) {
        return false;
    }
    var attributeList = [
        {
            Name: 'email',
            Value: email
        },
    ];

    userPool.signUp(email, password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err);
            message_text = err;
            message_class = "alert-danger";
        } else {
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            message_text = cognitoUser.getUsername() + "が作成されました";
            message_class = "alert-success";
        }
        $("#message").text(message_text);
        $("#message").addClass(message_class);
        $('#message').show();
        setTimeout(function () {
            $('#message').fadeOut();
            $("#message").removeClass(message_class);
        }, 5000);

        var url = "confirm.html?username=" + cognitoUser.getUsername();
        $(location).attr("href", url);
    });
});

$('#confirmation-button').click(function() {
  confirmation_code = $("#confirmation_code").val();
  email = location.search.match(/username=(.*?)(&|$)/)[1];
  console.log('confirmation_code is ' + confirmation_code);
  console.log('email is ' + email);

  userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);

  var userData = {
      Username : email,
      Pool : userPool
  };
  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  console.log('cognitoUser is ' + cognitoUser);

    cognitoUser.confirmRegistration(confirmation_code,
      true, function (err, result) {
          if (err) {
              console.log(err);
          } else {
              console.log('call result: ' + result);
              message_text = 'Confirmation' + result;
              message_class = "alert-success";
          }
          $("#message").text(message_text);
          $("#message").addClass(message_class);
          $('#message').show();
          setTimeout(function () {
              $('#message').fadeOut();
              $("#message").removeClass(message_class);
          }, 5000);

          var url = "login.html";
          $(location).attr("href", url);
      });
});

$("#login-button").click(function(event){
    event.preventDefault();
    var authenticationData = {
        Username : $('#email').val(),
        Password : $('#password').val()
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
    var userData = {
        Username : $('#email').val(),
        Pool : userPool
    };
    cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (authresult) {
            //console.log('access token + ' + authresult.getIdToken().getJwtToken());

            var url = "index.html";

            $('form').fadeOut(700, function(){
                $(location).attr("href", url);
            });
            $('.wrapper').addClass('form-success');

        },
        onFailure: function(err) {
            alert(err.message);
        },
    });
});

$("#logout-button").click(function(){
    userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
    userPool.getCurrentUser().signOut()
    console.log('Successfully logged out');

    var url = "login.html";
    $(location).attr("href", url);

});
