var app = angular.module('sift', []);

  app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.submit = function(){
      var paths = $scope.checkboxModel
      var urls = $http.get('/api/search', { params: { keyword: $scope.keyword, paths: $scope.checkboxModel } })
      .success(function(searchResults){
        $scope.searchResults = searchResults
      })
    }

    $scope.populateRepositories = function(){
      var repositories = $http.get('/api/repositories')
      .success(function(repositories){
        $scope.repositories = repositories
      })
    }

    $scope.submitCollection = function() {
      var createCollection = $http.post('/collections.json', { collection: {collectionName: $scope.collection } } )
        .success(function(createCollection){
          $scope.showSearchInfo = false
          $scope.newCollectionID = createCollection.id;
        })
        .error(function(createCollection){
          $scope.collectionError = true;
        })
    }
    $scope.saveLink = function(selectedUrl, selectedRawCode, selectedPath) {
      var createCodeSnippet = $http.post('/codeSnippets.json', { codeSnippet: {codeUrl: selectedUrl, collectionId: $scope.newCollectionID, codeContent: selectedRawCode, codePath: selectedPath }  } )
        .success(function(createSnippet){
          $scope.snippet = createSnippet
          $scope.clickPlus;
        })
    }

    $scope.showSearchInfo = function() {
      $scope.showSearchInfo = true;

    }

    $scope.clickPlus = function () {
        $scope.clickedPlus = !$scope.clickedPlus;
    };
  }])
