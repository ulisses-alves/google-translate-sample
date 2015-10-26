document.addEventListener('DOMContentLoaded', function(event) {
  angular.module('index', ['gtApp']);
  angular.bootstrap(event.target, ['index']);
});
