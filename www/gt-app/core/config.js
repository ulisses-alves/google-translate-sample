app.config(['gtSettings', 'gtDetectProvider', 'gtTranslateProvider', function(gtSettings, gtDetectProvider, gtTranslateProvider) {
  gtDetectProvider
    .useApi(gtSettings.google.detect)
    .useKey(gtSettings.google.key);

  gtTranslateProvider
    .useApi(gtSettings.google.translate)
    .useKey(gtSettings.google.key);
}]);
