var app = angular.module('myApp', []);

var pw_check = false;

app.controller('myCtrl', function($scope, $http) {
  $scope.$watch('pw + pw_c + agreed', function(value) {
    if ($scope.agreed == undefined) {
      $scope.agreed = false
    }

    if($scope.agreed == true){
      pw_check = $scope.agreed;
      console.log(pw_check);
    }

      if ($scope['pw'] === "" && $scope['pw_c'] === "" || $scope['pw'] === undefined && $scope['pw_c'] === undefined) {
          $('#err').html("비밀번호를 입력해주세요");
      } else if ($scope['pw'] == $scope['pw_c']) {
          if(pw_check){
            $('#err').html("");
          }else{
            $('#err').html("약관에 동의해주세요");
          }
      } else {
          $('#err').html("비밀번호가 일치하지않습니다");
      }

  }, true);

  if ($scope['pw'] == $scope['pw_c']) {
      if(pw_check){
        $('#err').html("");
      }else{
        $('#err').html("약관에 동의해주세요");
      }
    }
});
