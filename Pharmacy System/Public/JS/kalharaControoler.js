var myApp = angular.module('myApp1',[]);

myApp.controller('AppCtrl2', ['$scope','$http', function($scope, $http) {

    console.log("hello world from controller");

    function krefresh() {

        $http.get('/supplier').then(function(response){

            console.log("I got the data i requested");
            $scope.supplier = response.data;

        });
    }

    function krefreshPre() {

        $http.get('/drug').then(function(response){

            console.log("I got the data i requested");
            $scope.drug = response.data;

        });
    }



    krefresh();
    krefreshPre();


    $http.get('/supplier').then(function(response){
        console.log("I got the data i requested");
        $scope.supplier = response.data;
    });



    $http.get('/drug').then(function(response){
        console.log("I got the data i requested");
        $scope. drug  = response.data;
        console.log("pkk");
    });



    $scope.addSup = function(){
        console.log($scope.supp);

        $http.post('/supplier', $scope.supp).then(function(response){
            console.log(response);
			  $scope.successMsg=true;  
            krefresh();
        });
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/supplier/' +id)

        krefresh();
    };


    $scope.edit = function(id) {
        console.log(id);
        $http.get('/supplier/' + id).then(function(response) {
            $scope.supp= response.data;
        });
    };

    $scope.update = function() {
        console.log($scope.supp._id);
        $http.put('/supplier/' + $scope.supp._id, $scope.supp).then(function(response) {
            krefresh();
        })
    };

    $scope.sendMail = function(){

        var mailOptions={
            to : $scope.mail.to,
            subject : $scope.mail.subject,
            text : $scope.mail.text
        }
        console.log(mailOptions);

        $http.post('/mail',mailOptions).then(successFull,errorFull);
        function successFull(response)
        {
            console.log(response);
			  $scope.showSuccessAlert=true; 
        }
        function errorFull(error)
        {
            console.log(error);
        }
    }

 /*   $scope.sendSms = function(){

        var SmsOptions={
            to : $scope.mail.to,
            text : $scope.mail.text
        }
        console.log(SmsOptions);

        $http.post('/sms',SmsOptions).then(successFull,errorFull);
        function successFull(response)
        {
            console.log(response);
        }
        function errorFull(error)
        {
            console.log(error);
        }
    }

*/


}]);