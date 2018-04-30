'use strict'

var app = angular.module('loadStock', []);

    app.controller('mainController', function($scope, $http) {

                $http.get('/drugs').then(function(response) {
                    console.log(response);
                    $scope.drugs = response.data;
                });
            });


        /* creating drugs
        $scope.drugs = [
            { drug_name: 'Aldetic', unit_type: 'Tab', drug_category: 'Narcotic', drug_price:100.00, quantity:80000 },
            { drug_name: 'Betrin', unit_type: 'Tab', drug_category: 'Narcotic', drug_price:525.00, quantity:7000 }

        ];
        */