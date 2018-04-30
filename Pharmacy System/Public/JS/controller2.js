/**
 * Created by Sachini on 7/1/2017.
 */
app.controller('controller_2',function($scope,$http){

  //load patient by name
    $scope.search=function(x){
        $http.get('/getpatientFromName/'+x).then(function(res){
          //$scope.patient2.age=res.data[0].age;

        });

    };


    //get Drug names
    $http.get('/drugByName').then(function (response) {
        $scope.drugs=response.data;
		//console.log($scope.drugs);
    })

    //load prescription for table
    var refresh=function(){
        $http.get('/prescriptionList').then(function(response){
            //console.log('data');
            $scope.prescriptionList=response.data;
            console.log(response.data);

        });
        $scope.prescriptionList="";
    };
    refresh();

   $scope.prescription2={
        name:'',
        strength:'',
        duration:'',
        frequency:''
    };

    //add prescription to table and db
    $scope.addDrug=function(){

     $scope.prescription2.name=$scope.selectedDrug.name;


        $http.post('/prescriptionList',$scope.prescription2).then(function (response){
           // alert($scope.prescription2.name);
            $scope.prescriptionList2=response.data;
            //console.log(response.data);
            refresh();
            $scope.prescription2={};
        });
    }

    //edit prescriptions
    $scope.edit=function(id,name){

        $http.get('/prescriptionList/'+id).then(function(response){
           $scope.selectedDrug=name;
            $scope.prescription2=response.data;
            //alert(response);
        });
    }

    //update prescription
    $scope.update=function(id){
        //$scope.prescription2.name=selectedDrug.name;
        //alert($scope.List._idptionList)
        $http.put('/prescriptionList/'+id,$scope.prescription2).then(function(response){
            console.log("in update funcion recived "+response.data);
            //alert("in update funcion recived");
            refresh();
        });
    }

    //delete prescriptions
    $scope.delete=function(id){
        if (confirm('Are you sure you want to Delete?')) {
            //console.log(id);
            $http.delete('/prescriptionList/'+id).then(function(response){
                refresh();
                console.log(response);
            });
        } else {

        }

    }

  /*  //get doctor
    $http.get('/doctor').then(function (response) {
        $scope.doctor.name=response.data[0];
    })*/

});