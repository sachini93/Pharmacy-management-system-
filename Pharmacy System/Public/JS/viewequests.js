var app = angular.module('requestApp',[]);

//drugs
app.controller('requestController',function ($scope,$http){
	$http.get('/getDrug_Requests')
				.then(function(res){
					$scope.requests = res.data;
					//console.log($scope.stocks);
					
				});
				
	$scope.proceed = function(id){
		var temp = [];
		$http.get('/findRequest/'+id)
				.then(function(res){
					$scope.request = res.data;
					
				$http.get('/findSupplier/'+$scope.request.drug_name)
				.then(function(res){
					$scope.supplier = res.data;
					//console.log($scope.supplier);
					
					var reqQty = document.getElementById("reqQty").value;
					if(reqQty != ""){
						if(!isNaN(reqQty)){
							temp = {
						"requestedQty":reqQty,
						"supplier":$scope.supplier.email,
						"status":"pending",
						}
					
					
						$http.put('/updateDrug_Request/'+id ,temp);
						location.reload();
						//console.log("hi");
						}
						else{
							alert("Please enter only numbers !");
							location.reload();
						}
						
					}
					else{
						alert("Please enter requesting amount !");
						location.reload();
					}
					
					
					
				});
		
					
		});
		
		
		//console.log($scope.name);
	}
});



//search function
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("txt1");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbl1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
