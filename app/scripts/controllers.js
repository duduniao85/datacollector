'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = [];
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        // menuFactory.getDishes().then(
        //     function (response) {
        //         $scope.dishes = response.data;
        //         $scope.showMenu = true;
        //     },
        //     function (response) {
        //         $scope.message = "Error: " + response.status + " " + response.statusText;
        //     }
        // );
        $scope.dishes = menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])
    .controller('ContactController', ['$scope', function ($scope) {
        console.log("contactcontroller");
        $scope.feedback = {
            mychannel: "", firstName: "", lastName: "",
            agree: false, email: ""
        };
        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', 'FeedbackFactory', function ($scope, FeedbackFactory) {
        //Step 1: Create a JavaScript object to hold the feedback from the form


        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                FeedbackFactory.save($scope.feedback);
                console.log("a new feedback is saved");
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedbackForm.$setPristine();
            }
        };

    }])
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.orderByKey = "date";//defaut order by key
        // var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
        // $scope.dish = dish;
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        // menuFactory.getDish(parseInt($stateParams.id, 10))
        //     .then(
        //     function (response) {
        //         $scope.dish = response.data;
        //         $scope.showDish = true;
        //     }, function (response) {
        //         $scope.message = "Error: " + response.status + " " + response.statusText;
        //     }
        //     );
        $scope.dish = menuFactory.getDishes().get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );
    }]).controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        var newcomment = {
            rating: 5,
            comment: "",
            author: "",
            date: new Date().toISOString()//default date value is now 
        };
        $scope.newcomment = newcomment;
        $scope.submitComment = function () {


            // // Step 3: Push your comment into the dish's comment array
            // $scope.dish.comments.push($scope.newcomment);

            // //Step 4: reset your form to pristine
            // $scope.feedbackForm.$setPristine();
            // //Step 5: reset your JavaScript object that holds your comment
            // $scope.newcomment = {
            //     rating: 5,
            //     comment: "",
            //     author: "",
            //     date: new Date().toISOString()
            // };

            $scope.newcomment.date = new Date().toISOString();
            console.log($scope.newcomment);
            $scope.dish.comments.push($scope.newcomment);

            menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
            $scope.feedbackForm.$setPristine();
            $scope.newcomment = { rating: 5, comment: "", author: "", date: "" };
        };
    }])    // implement the IndexController and AboutController here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

        //Step 1: get the
        $scope.data = [];
        $scope.title= "每日链家挂牌房价涨跌数量统计图";  
        $scope.showTitle=true;

    }])
    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        //Step 1: get the  leades list
        $scope.showLeader = false;
        $scope.leaderMessage = "Loading...";
        $scope.leaders = corporateFactory.getleaders().query(
            function (response) {
                $scope.leaders = response;
                $scope.showLeader = true;
            },
            function (response) {
                $scope.leaderMessage = "Error: " + response.status + " " + response.statusText;
            }
        );

    }])
    ;