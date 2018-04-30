//"use strict";
app.controller('controller_1',function($scope,$http){

    var refresh=function(){
        $http.get('/requestList').then(function(response){
            $scope.requestList=response.data;
        });
    }
    refresh();


    $scope.rowSelected=function(id){

     //   console.log("before approved----");
       //console.log(row);
     //   row.status='approved';

      //  console.log("after approved----");
       // console.log(row);
        //alert(row.selected);

        //var id=row._id;
		console.log(id);
        //send update request to server and if success refresh table
        $http.put('/requestList/'+id);

    }


});