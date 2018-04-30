var app = angular.module('loginApp',[]);

//login
app.controller('loginController',function ($scope,$http){
	$scope.login = function(){
		var username = $scope.username;
		var password = $scope.password;
		//console.log(username,password);
		if(username != "" && password != ""){
			$http.get('/authenticateUser/'+username+'/'+password)
				.then(function(res){
					//console.log(res.data._id);
					if(res.data != ""){
						if(res.data[0].type == "Chief-Pharmacist"){
							window.location.href = "IndexCP.html";
						//console.log(res.data);
						}
						if(res.data[0].type == "Assistant-Pharmacist"){
							window.location.href = "indexP.html";
						//console.log(res.data);
						}
						if(res.data[0].type == "Doctor"){
							window.location.href = "IndexDoc.html";
						//console.log(res.data);
						}
					}
					else{
						alert("Incorrect username or password !");
						location.reload();
					}
					//console.log(res.data);
					
				});
			
			
		}
		else{
			alert("Username or password is empty !");
			location.reload();
		}
	}
});



