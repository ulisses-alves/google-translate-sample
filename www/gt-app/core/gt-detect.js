app.provider('gtDetect', function() {
  var _api, _key;

  var _transformResponse = function(data) {
    var object = angular.fromJson(data);

    if (object.data
      && object.data.detections
      && object.data.detections.length
    ) {
      return object.data.detections[0][0];
    }

    return null;
  };

  this.useApi = function(api) {
    _api = api;
    return this;
  };

  this.useKey = function(key) {
    _key = key;
    return this;
  };

  this.$get = ['$http', function($http) {
    return function gtDetect(text) {
      return $http.get(_api, {
        params: {
          key: _key,
          q: text
        },
        transformResponse: _transformResponse
      });
    };
  }];
});
