'use strict';

/* Directives */

var appLungeDirectives = angular.module('appLungeDirectives',[])


appLungeDirectives.directive('addsegs', function() {

     return {
          restrict: 'E',
          scope: {},
          replace: true,
          controller: function($scope, AddSegments){

              $scope.show = false;
              $scope.or = false;
              $scope.and = false;
              var url =

              $scope.segs = AddSegments;

              $scope.$watch('segs.message', toggledisplay)

              function toggledisplay() {

                  if($scope.segs.message=='or'){
                    console.log('printed or');
                    $scope.show = true;
                    $scope.or = true;


                  }
                  if($scope.segs.message=='and'){
                    console.log('printed and');
                    $scope.show = true;
                    $scope.and = true;
                  }          
              }

          },
          templateUrl: '/static/dashboard/partials/segmentrules.html'          
     };
})

appLungeDirectives.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1, // needed for angular 1.2.x
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
});
