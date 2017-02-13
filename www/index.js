var app = angular.module('Card', ['ngResource','ngRoute','ngAnimate'])
app.controller('cardController',['$rootScope','CardHttp',function($rootScope,CardHttp){
    CardHttp.get(function(res){
        $rootScope.card = res.data
    })
}])
app.controller('editController',['$scope','$rootScope','$window','CardHttp',function($scope, $rootScope, $window, CardHttp){
    $scope.save = function(){
        CardHttp.update($rootScope.card,function(){
            $window.location.href = '#/'
        })
    }
}])
app.factory('CardHttp',['$resource',function($resource){
    return $resource('/api/card/me',null,{
        update: {method:'PUT'}
    })
}])
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/edit',{
        templateUrl:'edit.html'
    })
}])
app.animation('.editor',['$document',function($doc){
    return {
        enter: function(el,done){
            $doc.find('main').removeClass('cardRight').addClass('cardLeft')
            el.addClass('animated bounceInLeft')
        },
        leave: function(el,done){
            $doc.find('main').removeClass('cardLeft').addClass('cardRight')
            el.addClass('animated bounceOutLeft')
        }
    }
}])