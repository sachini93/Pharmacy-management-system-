var app = angular.module('drugApp',[]);

//drugs
app.controller('drugController',function ($scope,$http){
		$http.get('/drugStock')
				.then(function(res){
					$scope.stocks = res.data;
					//console.log($scope.stocks);
					
				});
				
		$http.get('/drugs')
				.then(function(res){
					$scope.drugs = res.data;
					var count = 0;
					var arr = [];
					//console.log($scope.drugs);
					angular.forEach($scope.drugs, function(drug, key){
						angular.forEach($scope.stocks, function(stock, key){
							angular.forEach(stock.batch, function(batch, key){
								if(drug.name == batch.drug.name){
									count = count + parseInt(batch.remaining);
								}
							});
							
						});
						var temp = [];
						temp = {
							"id" : drug._id,
							"name": drug.name,
							"category": drug.category,
							"type": drug.type,
							"content": drug.content,
							"contentType": drug.contentType,
							"dangerLevel": drug.dangerLevel,
							"remaining" : count,
						};
						arr.push(temp);
						count = 0;
					});
					
					$scope.drugLoad = arr;
					//console.log($scope.drugLoad);
					
					
		});
				
	
//place order function
$scope.request = function(id){
	//console.log(id);
	$http.get('/findDrug/'+id)
				.then(function(res){
					$scope.drug = res.data;
					var result = confirm("Confirm request!");
					if (result == true) {
						//console.log($scope.drug.name);
					//get remaining value
					var count1 = 0;
					//console.log($scope.drugs);
					angular.forEach($scope.stocks, function(stock, key){
							angular.forEach(stock.batch, function(batch, key){
								if($scope.drug.name == batch.drug.name){
									count1 = count1 + parseInt(batch.remaining);
								}
							});
							
						});
					
						var drug_order = [];
						var d = new Date();
						var curr_date = d.getDate();
						var curr_month = d.getMonth()+1;
						var curr_year = d.getFullYear();
						drug_order = {
							"drug_name":$scope.drug.name,
							"requestedQty":"",
							"availableQty":count1,
							"date":curr_date+"."+curr_month+"."+curr_year,
							"supplier":"",
							"status":"new",
						}
						//console.log(drug_order);
						$http.post('/addRequest',drug_order).then(function(res){
							refresh();
						});
					}
					
				});
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
