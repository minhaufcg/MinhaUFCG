angular.module('mufcg')
.controller("ManageUsersCtrl", function ManageUsersCtrl($scope, User, Pagination) {
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
      var indexes = Array(Pagination.pagesTotal()).keys();
      return [...indexes];
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
          console.error(error);
      });
    }

    function setVerification(value, user) {
      User.update(user._id, {verification: value})
      .then(function (response) {
          user.verification = value;
      }, function (error) {
          console.error(error);
      });
    }

    $scope.goToPage = function (page) {
      $scope.page = Pagination.goToPage(page);
    }
    
    function initiatePagination(users) {
      var BEGIN = 0;
      Pagination.configure({
          data: users
      });
      $scope.goToPage(BEGIN);
    }

    function getMocked() {
      initiatePagination(getUsers());
    }
    
    function getUsers() { 
      return [
        {
          "_id": "5a89876c08ee88435c05a32c",
          "name": "Jeanine Adkins",
          "role": "servent",
          "verification": "trusted",
          "registration": 2757241
        },
        {
          "_id": "5a89876cb20528f5bdc5a381",
          "name": "Liliana Sharp",
          "role": "student",
          "verification": "trusted",
          "registration": 3032863
        },
        {
          "_id": "5a89876c5e4d4675acc69aad",
          "name": "Adriana Mayo",
          "role": "teacher",
          "verification": "trusted",
          "registration": 1374374
        },
        {
          "_id": "5a89876ce440068e1311f77d",
          "name": "Price Sandoval",
          "role": "student",
          "verification": "untrusted",
          "registration": 8460596
        },
        {
          "_id": "5a89876c0acc3eb8dabe43c8",
          "name": "Hickman Small",
          "role": "servent",
          "verification": "trusted",
          "registration": 3674609
        },
        {
          "_id": "5a89876c149da4e296a541ed",
          "name": "Paige Mills",
          "role": "student",
          "verification": "rejected",
          "registration": 2288301
        },
        {
          "_id": "5a89876ca7ee4c4cdd08e41d",
          "name": "Janine Merritt",
          "role": "servent",
          "verification": "rejected",
          "registration": 4821079
        },
        {
          "_id": "5a89876cf2214991334c3433",
          "name": "Chase Golden",
          "role": "teacher",
          "verification": "trusted",
          "registration": 3562165
        },
        {
          "_id": "5a89876c47e92f13fe66ddff",
          "name": "Rogers Floyd",
          "role": "servent",
          "verification": "rejected",
          "registration": 7626412
        },
        {
          "_id": "5a89876ca4eae99a86c85cd9",
          "name": "Kerry Cardenas",
          "role": "student",
          "verification": "untrusted",
          "registration": 6809831
        },
        {
          "_id": "5a89876c845e44c36bd169c6",
          "name": "Nita Kirby",
          "role": "student",
          "verification": "rejected",
          "registration": 7582421
        },
        {
          "_id": "5a89876c408ef44bc1f2f97c",
          "name": "Dorthy Jefferson",
          "role": "servent",
          "verification": "trusted",
          "registration": 4248318
        },
        {
          "_id": "5a89876c956801426343cf60",
          "name": "Dickerson Parrish",
          "role": "servent",
          "verification": "rejected",
          "registration": 8785816
        },
        {
          "_id": "5a89876ce8c71b250592f9bb",
          "name": "Stephenson Jackson",
          "role": "servent",
          "verification": "rejected",
          "registration": 1626768
        },
        {
          "_id": "5a89876cb27d984228272ff2",
          "name": "Simpson Jenkins",
          "role": "servent",
          "verification": "rejected",
          "registration": 7520057
        },
        {
          "_id": "5a89876ccf9b440e3c154315",
          "name": "Raymond Humphrey",
          "role": "student",
          "verification": "trusted",
          "registration": 1508395
        },
        {
          "_id": "5a89876c1ca46fc9f8cb5433",
          "name": "Farmer Reid",
          "role": "teacher",
          "verification": "untrusted",
          "registration": 2499564
        },
        {
          "_id": "5a89876c464917e13b76e41f",
          "name": "Whitaker Hays",
          "role": "teacher",
          "verification": "untrusted",
          "registration": 6018736
        },
        {
          "_id": "5a89876c6a20635e9d0fd5ed",
          "name": "Jimmie Higgins",
          "role": "teacher",
          "verification": "trusted",
          "registration": 2522122
        },
        {
          "_id": "5a89876cb2f8bc03343f5365",
          "name": "Teri Garcia",
          "role": "servent",
          "verification": "trusted",
          "registration": 3413570
        }
      ];
    }

    (function loadUsers() {
        getUsersByVerification('untrusted');
        // getMocked();
    })();
});