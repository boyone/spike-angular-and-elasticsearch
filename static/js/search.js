var searchApp;
searchApp = angular.module('searchApp', []);
wireSearchApplication(searchApp);

function wireSearchApplication(app) {
    app.service('SearchService', SearchService);
    app.controller('SearchController', ['$scope', 'SearchService', SearchController]);
}

function SearchController($scope, SearchService) {
    $scope.items = [];

    $scope.init = function() {
        
    };

    $scope.jsonToItems = function(result) {
        $scope.items = [];
        angular.forEach(result.hits.hits, function(value, key){             
            $scope.items.push(new Item(value._source.name));
        });                
    }

    $scope.getItemLength = function() {
        return $scope.items.length;
    };
    
    $scope.getItem = function(order) {
        var index = order - 1;
        return $scope.items[index];
    };

    $scope.addItem = function(description) {
        var newItem = new Item(description, false);
        $scope.items.push(newItem);
    }

    $scope.formSubmitted = function() {
        if($scope.keyword == '') {
            $scope.items = [];                    
        } else {
            SearchService.get($scope.keyword, $scope.jsonToItems);
        }
    }
};

function SearchService($http) {
    this.get = function(keyword, callback) {
        $http.get('http://localhost:9200/_search?q=name:'+keyword).success(callback);
    };
};

function Item(description) {
    this.description = description;    
}
