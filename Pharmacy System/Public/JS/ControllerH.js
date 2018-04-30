 var app = angular.module('myApp',[]);


app.controller('myCtrl',function($scope,$window,$http){
	
      $scope.name="John";
	  
	  $scope.DrugName = {
        drug01 : "Panadol",
        drug02 : "AF1",
        drug03 : "ZyXCC",
		drug04 : "RSSS",
     };
	 
	 $scope.DrugCategory = {
        drug01 : "C1",
        drug02 : "C2",
        drug03 : "C3",
		drug04 : "C4",
     }; 
	 
	 $scope.DrugType = {
        drug01 : "T1",
        drug02 : "T2",
        drug03 : "T3",
		drug04 : "T4",
     };
	 
	 $scope.DrugContent = {
        drug01 : "C_1",
        drug02 : "C_2",
        drug03 : "C_3",
		drug04 : "C_4",
     };
	 $scope.DrugCtype = {
        drug01 : "CT_1",
        drug02 : "CT_2",
        drug03 : "CT_3",
		drug04 : "CT_4",
     };
	 
	 $scope.CalQuality=function(){
		 $scope.total=($scope.cartoon*($scope.tablet*$scope.card));
	 };
	 
	 $scope.ClearContact=function(){
		 $scope.drug="";
	 };
	 
	 $scope.addContact=function(){ 
		$http.post('/add',$scope.drug).then(function(res,err) {
        console.log(res);
		$window.alert("Successfully updated"+res);
        },    function(err) {
             console.log("errrrr :"+err);
			 $window.alert("Error");
           }); 
	    };

	 
});


app.controller('myCtrlAddInfo',function($scope,$window,$http){ 
 
 var ClearBatch=function(){
	$scope.category="";
	$scope.name="";
	$scope.type="";
	$scope.content="";
	$scope.contentType="";
	$scope.cartoon="";
	$scope.card="";
	$scope.tablet="";
	$scope.total="";
	$scope.BNo="";
	$scope.manufacDate="";
	$scope.expireDate="";
	
}
 
$scope.addBatch=function(){
	$scope.batch={ 
				  number:$scope.BNo,
				  quantity:$scope.total,
				  remaining:"",
				  manufacDate:$scope.manufacDate,
				  expireDate:$scope.expireDate,
				  drug: {
					     category:$scope.category,
						 name:$scope.name,
						 type:$scope.type
				        }

	             };
	console.log($scope.batch);
	   
		$http.post('/addBatchH',$scope.batch).then(function(res){
		console.log("Response :"+res.data);
		if(res.data==null){
			//$scope.satate="Can't added new batch";
			alert("Can't added new batch");
		}
		else{
			//$scope.state="Successfully added new batch";
			alert("Successfully added new batch");
			ClearBatch();
		}
	});
	
	
};

$scope.ClearBatch2=function(){
	ClearBatch();
};

$scope.CalQuality=function(){
		 $scope.total=($scope.cartoon*($scope.tablet*$scope.card));
	 };
 
	 //All categorys
	 $http.get('/getDrugCategoryH').then(function(res){ 
		$scope.DrugCategory=res.data;
        		
	   });
	   
	   
$scope.getDrugs=function(x){	   
	 $http.get('/getFromCatH/'+x).then(function(res){
			$scope.druglist=res.data;
		}); 
};
 $scope.type="";
//NameDropDown at AddBatch
$scope.getDrugFromName=function(x){	
      if( (x==null) ){
		  console.log("No name");
		    $scope.type="";
		    $scope.content="";
		    $scope.contentType="";
	  }   
	  else{
		   $http.get('/getDrugFromNameH/'+x).then(function(res){
			$scope.type=res.data[0].type;
			$scope.content=res.data[0].content;
			$scope.contentType=res.data[0].contentType;
			//console.log(res.data);
		});
	  }
};	
	
     

	 
var refresh=function(){
    $http.get('/getDrugH').then(function(res){
		//console.log("Answer:");
		//console.log(res.data);
		$scope.druglist=res.data; 
		$scope.contact={};
	   });
}

refresh();

    $scope.EditContact=function(id){
		//console.log(id);
        $http.get('/getFromIDH/'+id).then(function(res){
			$scope.contact=res.data;
		});		
	};

	$scope.removeContact=function(id){
		var r = confirm("Are you sure to remove?");
		if (r == true) {
			
			$http.delete('/deleteH/'+id).then(function(res){
			//console.log(res);
		   refresh();
		   $scope.contact.category="";
		});
         
    } else {
        
    }
	};
	
	$scope.addContact=function(){
		//console.log($scope.contact);
		$http.post('/addH',$scope.contact).then(function(res){
			//console.log("Add ::"+res);
			refresh();
			$scope.contact.category="";
		});
	};
	
	$scope.updateContact=function(){
			 var r = confirm("Are you sure to update?");
         if (r == true) {
            $http.put('/updateH/' + $scope.contact._id ,$scope.contact);
		    refresh();
		    $scope.contact.category="";
        } else {
    
          }
	};
	
	
});

 
app.controller('myCtrlUploader', function($scope,$http) { 
 
 $scope.addDrug=function(x){
	 $scope.y=JSON.parse(x);
	 $scope.name=$scope.y[0].name;
	 $scope.category=$scope.y[0].category;
	 $scope.type=$scope.y[0].type;
	 $scope.content=$scope.y[0].content;
	 $scope.contentType=$scope.y[0].contentType;
	 $scope.price=$scope.y[0].price;
	 $scope.dLevel=$scope.y[0].dLevel;
	 
	 $http.post('/addH',$scope.y).then(function(res){ 
			if(res==null){
			$scope.satate="Can't added new batch";
		}
		else{
			$scope.state="Successfully added new batch";
			$scope.Output="";
			console.log("Successfully added new batch");
		}
		});
	

 }
 
});



 