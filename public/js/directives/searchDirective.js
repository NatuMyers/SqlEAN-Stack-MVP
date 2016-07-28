mvpApp.directive('myOnKeyDownCall', function() {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      scope.$apply(function (){
        scope.$eval(attrs.ngEnter);
      });
      event.preventDefault();
    });
  };
});
