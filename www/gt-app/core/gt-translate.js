app.provider('gtTranslate', function() {
  var _api, _key;

  var _transformResponse = function(data) {
    var object = angular.fromJson(data);

    if (object.data
      && object.data.translations
      && object.data.translations.length
    ) {
      return object.data.translations[0];
    }

    return '';
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
    return function gtTranslate(text, target, source) {
      return $http.get(_api, {
        params: {
          key: _key,
          source: source,
          target: target,
          q: text
        },
        transformResponse: _transformResponse
      });
    };
  }];
});
