var app = angular.module('drugStockApp',[]);

//login
app.controller('drugStockController',function ($scope,$http){
		$http.get('/drugStock')
				.then(function(res){
					$scope.stocks = res.data;
					console.log($scope.stocks);
				});
		
});


//create pdf
function pdfMaker(){
	var pdf = new jsPDF('p', 'pt', 'letter');
    source = ('#stock')[0];
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 4,
        bottom: 4,
        left: 4,
        width: 522
    };
    
	pdf.save('stock.pdf');
}

//search
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
