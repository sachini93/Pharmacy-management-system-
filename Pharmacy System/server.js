var express=require('express');
var app=express(); 
var bodyParser=require('body-parser');
//var mongo=require('mongodb');
var assert=require('assert');
var mongojs=require('mongojs');
var db=mongojs('pharmacyMTR',['pharmacyMTR']);
var nodemailer = require("nodemailer");

var url='mongodb://localhost:27017/pharmacyMTR';

//for html/css template
app.use(express.static(__dirname+"/public/", {index: 'Login.html'}))
app.use(bodyParser.json());

//for login
app.get('/authenticateUser/:username/:password',function(req,res){
	
	var username = req.params.username;
	var password = req.params.password;

	db.user.find({'username':username , 'password':password},function(err,docs){
	//console.log("User : " +docs);
	res.json(docs);
	});
	 
});


//for drug stock view
app.get('/drugStock',function(req,res){

	db.stock.find({},function(err,docs){
	//console.log("User : " +docs);
	res.json(docs);
	});
	 
});


//for drug list
app.get('/drugs',function(req,res){
	db.drug.find({},function(err,docs){
	//console.log("User : " +docs);
	res.json(docs);
	});
});


//find a drug
app.get('/findDrug/:id',function(req,res){
	var id = req.params.id;
		db.drug.findOne({_id: mongojs.ObjectId(id)},function(err,doc){ 
		res.json(doc);
		//console.log(id+" ####### "+doc);
	});
	
});


//insert a drug request to request table
app.post('/addRequest',function(req,res){
	//console.log(req.body);
	db.drug_request.insert(req.body,function(err,doc){
		console.log(err);
	}); 
});


//get drug_requests
app.get('/getDrug_Requests',function(req,res){
	var status = "new";
		db.drug_request.find({'status':status},function(err,doc){ 
		res.json(doc);
		//console.log(id+" ####### "+doc);
	});
	
});


//find a request
app.get('/findRequest/:id',function(req,res){
	var id = req.params.id;
		db.drug_request.findOne({_id: mongojs.ObjectId(id)},function(err,doc){ 
		res.json(doc);
		//console.log(id+" ####### "+doc);
	});
	
});

//find supplier
app.get('/findSupplier/:drug',function(req,res){
	var drug = req.params.drug;
		db.supplier.findOne({'drug':drug},function(err,doc){ 
		res.json(doc);
		//console.log(id+" ####### "+doc);
	});
	
});

//For Update request
app.put('/updateDrug_Request/:id',function(req,res){
	var id=req.params.id;
	//console.log("Update  :"+id);
	db.drug_request.findAndModify({query:{_id:mongojs.ObjectId(id)},
	update: {$set: { requestedQty:req.body.requestedQty , supplier:req.body.supplier , status:req.body.status } },
	new: true}, function(err,doc){
	    console.log(err);
	});
});




//////////////// Kalhara /////////////////////

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'soodooo520@gmail.com',
        pass: 'shapeofmy123'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});
app.post('/mail',function(req,res){

    var m=req.body;
    console.log(m);
    smtpTransport.sendMail(m, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: ");
            res.end("sent");
        }
    });
});







app.get('/supplier', function(req,res) {
  console.log("I received ")
    db.supplier.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });

});

app.post('/supplier', function(req, res){
  console.log(req.body);

   db.supplier.insert(req.body, function(err, doc){
    res.json(doc);


  });
});

app.get('/drug', function(req,res) {
    console.log("I received ")
    db.drug.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });

});

app.post('/drug', function(req, res){
    console.log(req.body);

    db.batch.insert(req.body, function(err, doc){
        res.json(doc);


    });
});


app.delete('/supplier/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

    db.supplier.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.get('/supplier/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.supplier.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/supplier/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.supplier.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name,email: req.body.email, teleNo: req.body.teleNo,address: req.body.address,  category: req.body.category}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

/////////////////////////////////////////////

///////////////////////// Harsha ///////////////////////////////////////

app.get('/getDrugCategoryH',function(req,res){ 
	db.drug.distinct( 'category',{},function(err,docs){
	//console.log("Drug Category : " +docs);
	res.json(docs);
	});
	 
});

app.get('/getFromCatH/:id',function(req,res){
	var cat_name=req.params.id;
		db.drug.find({"category": cat_name},function(err,doc){ 
		res.json(doc);
		//console.log(cat_name+" ####### "+doc);
	});
	
});
app.get('/getFromCatAddBatchH/:id',function(req,res){
	var cat_name=req.params.id;
		db.drug.find({"category": cat_name},function(err,doc){ 
		res.json(doc);
		//console.log(cat_name+" ####### "+doc);
	});
	
});
app.get('/getDrugFromNameH/:id',function(req,res){
	var name=req.params.id;
		db.drug.find({"name":name},function(err,doc){ 
		res.json(doc);
		console.log(name+" ####### "+doc);
	});
	
});


app.get('/getDrugH',function(req,res){
   //console.log("Get req");
	db.drug.find(function(err,docs){
		//console.log(docs);
		res.json(docs);
	});
	 
});


app.post('/addH',function(req,res){
	console.log("Add ::"+req.body);
	db.drug.insert(req.body,function(err,doc){
		res.json(doc);
	}); 
});

app.delete('/deleteH/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.drug.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//for Edit button
app.get('/getFromIDH/:id',function(req,res){
	var id=req.params.id;
		db.drug.findOne({_id: mongojs.ObjectId(id)},function(err,doc){ 
		res.json(doc);
		console.log(id+" ####### "+doc);
	});
	
});

//For Update
app.put('/updateH/:id',function(req,res){
	var id=req.params.id;
	console.log("Update  :"+id);
	db.drug.findAndModify({query:{_id:mongojs.ObjectId(id)},
	update: {$set: { name:req.body.name, type:req.body.type, content:req.body.content, contentType:req.body.contentType, price: req.body.price, dangerLevel: req.body.dangerLevel} },
	new: true}, function(err,doc){
		res.json(doc);
	    console.log("Update  :"+doc);
	});
});


app.post('/addBatchH',function(req,res){
	console.log("New Batch ::"+req.body);
	db.batch.insert(req.body,function(err,doc){
		res.json(doc);
	}); 
	
});


app.post('/addBatchNewH',function(req,res){
	console.log("New Batch ::"+req.body);
	db.batch333.insert(req.body); 
});

////////////////////////////////////////////////////////////////////////


////////////////////////// Sachini ////////////////////////////////////

//get only pending requests
 app.get('/requestList',function(req,res){
     //console.log(req.body);
     db.drug_request.find({"status":"pending"},function(err,docs){
         res.json(docs);
         //console.log(docs);
     });
 });



//update approved requests
 app.put('/requestList/:id',function(req,res){
     var id=req.params.id;
    console.log(id);
    // console.log(req.body.status);
     db.drug_request.findAndModify({query:{_id:mongojs.ObjectId(id)},
             update:{$set:{status:"approved"}},
             new:true},
         function(err,docs){
			 console.log(err);
         });

 });

 //get all patients
 app.get('/patient',function(req,res){
     //console.log(req.body);
     db.patient.find(function(err,docs){
         res.json(docs);
         //console.log(docs);
     });
 });


 app.get('/getpatientFromName/:id',function(req,res){
     var name=req.params.id;
     db.patient.find({"name": name},function(err,doc){
         res.json(doc);
         //console.log(name+" ####### "+doc);
     });

 });


 //get patient's details for prescription by name
 app.get('/patient/:id',function(req,res){
     var id=req.params.id;
     db.patient.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
         res.json(docs);
     })
 });


 //get drug names for prescription form
 app.get('/drugByName',function(req,res){
     //console.log(req.body);
     db.drug.find(function(err,docs){
         res.json(docs);
         //console.log(docs);
     });
 });



 //get prescription List
 app.get('/prescriptionList',function(req,res){

     db.prescription.find(function(err,docs){
         res.json(docs);
     });

 });


 //add prescription to db id auto Increment
/* app.post('/prescriptionList',function(req,res){

     //console.log(req.body);
     db.prescription.insert({"_id":getNextValue("prescrptionId")},req.body,function(err,docs){
         res.json(docs);
     });
 });*/

 //add prescription to db
 app.post('/prescriptionList',function(req,res){

     //console.log(req.body);
     db.prescription.insert(req.body,function(err,docs){
         res.json(docs);
         console.log(docs);
     });
 });



 //load prescriptionto edit
 app.get('/prescriptionList/:id',function(req,res){
     var id=req.params.id;
     db.prescription.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
         res.json(docs);
     })
 });

 //update prescrption
 app.put('/prescriptionList/:id',function(req,res){
     var id=req.params.id;
     //console.log(id);
     console.log(req.body.name);
     db.prescription.findAndModify({query:{_id:mongojs.ObjectId(id)},
             update:{$set:{name:req.body.name ,strength:req.body.strength, duration:req.body.duration, frequency:req.body.frequency}},
             new:true},
         function(err,docs){
             res.json(docs);
             console.log("updated** "+ docs)
         });
 });

 //delete a prescription
 app.delete('/prescriptionList/:id',function(req,res){
     var id=req.params.id;
     console.log(id);
     db.prescription.remove({_id:mongojs.ObjectId(id)},function(err,doc){
         res.json(doc);
     });
 });


 //get doctor to prescription from
 app.get('/doctor',function(req,res){
     //console.log(req.body);
     db.doctor.find(function(err,docs){
         res.json(docs);
         //console.log(docs);
     });
 });



 module.exports = app;



////////////////////////////////////////////////////////////////////////

app.listen(3000);
console.log("Server running on port 3000");