angular.module('mufcg')
.controller("ManageUsersCtrl", function ManageUsersCtrl($scope, User, Pagination, messagebox) {
    $scope.filter = 'untrusted';
    $scope.page = {};

    $scope.block = function (user) {
      setVerification("rejected", user);
    };

    $scope.unblock = function (user) {
      setVerification("untrusted", user);
    };

    $scope.accept = function (user) {
      setVerification("trusted", user);
    };

    $scope.filterBy = function (value) {
      getUsersByVerification(value);
    };

    $scope.getPages = function () {
      var indexes = [];
      for(var i = 0; i < Pagination.pagesTotal(); i++) {
        indexes.push(i);
      }
      return indexes;
    };

    $scope.next = function () {
      $scope.page = Pagination.next();
    };

    $scope.prev = function () {
      $scope.page = Pagination.prev();
    };

    function getUsersByVerification(value) {
      User.getUsersByPropertyValue('verification', value)
      .then(function(response) {
        $scope.filter = value;
        initiatePagination(response.data);
      }, function(error) {
        messagebox.fail(error.message);
      });
    }

    function setVerification(value, user) {
      User.update(user._id, {verification: value})
      .then(function (response) {
          user.verification = value;
          removeUserFromList(user);
      }, function (error) {
          messagebox.fail(error.message);
      });
    }

    function removeUserFromList(user) {
      var index = $scope.page.data.indexOf(user);
      if(index > -1) $scope.page.data.splice(index, 1);
    }

    $scope.goToPage = function (page) {
      $scope.page = Pagination.goToPage(page);
    }
    
    function initiatePagination(users) {
      var BEGIN = 0;
      Pagination.configure({
          data: users,
          perPage: 4
      });
      $scope.goToPage(BEGIN);
    }

    (function loadUsers() {
        getUsersByVerification('untrusted');
    })();
});