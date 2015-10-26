app.controller('gtTranslateController', ['$scope', 'gtDetect', 'gtTranslate', function($scope, gtDetect,
  gtTranslate) {
  $scope.ready = true;

  $scope.model = {
    text: '',
    detection: null,
    translation: null
  };

  $scope.submit = function() {
    $scope.ready = false;

    gtDetect($scope.model.text).then(function(res) {
      $scope.model.detection = res.data;

      gtTranslate($scope.model.text, 'en', res.data.language).then(
        function(res) {
          $scope.model.translation = res.data;
          $scope.ready = true;
        }
      );
    });
  };
}]);
