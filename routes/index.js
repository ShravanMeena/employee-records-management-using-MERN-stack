var express = require('express');
var router = express.Router();
var empModel = require('../model/employee')
var employee = empModel.find({})


/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec(function(err,data){
    if(err) throw err
  res.render('index', { title: 'Employee Records',
  subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro', 
  records:data,
    success:'',
}
  );
  })
});

router.post('/', function(req, res, next) {

  var empDetails = new empModel({
    name: req.body.name,
    email: req.body.email,
    etype: req.body.etype,
    hourlyrate: req.body.hourlyrate,
    totalhour: req.body.totalhour,

  })

  empDetails.save(function(err,res1){
    if(err) throw err
employee.exec(function (err, data) {
  if (err) throw err
  res.render('index', {
    title: 'Employee Records',
    subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro',
    records: data,
    success: 'Record Added Succesfully'
  });
})
  });
});

router.post('/search/', function (req, res, next) {

  var filterName = req.body.filtername;
  var filterEmail = req.body.filteremail;
  var filterEtype = req.body.filteretype;

  if(filterName != '' && filterEmail !='' && filterEtype != ''){

    var filterParameter = { $and:[{name: filterName},
    {$and: [{email:filterEmail}, {etype:filterEtype}]}
    ]}
  } else if (filterName != '' && filterEmail == '' && filterEtype != ''){
       var filterParameter = { $and: [{email:filterName}, {etype:filterEtype}]}
  } else if (filterName == '' && filterEmail != '' && filterEtype != ''){
       var filterParameter = { $and: [{email:filterEmail}, {etype:filterEtype}]}
  }else if (filterName == '' && filterEmail == '' && filterEtype != ''){
       var filterParameter = {etype:filterEtype}
  }
  else{
    var filterParameter={}
  }

var employeeFilter = empModel.find(filterParameter)


  employeeFilter.exec(function (err, data) {
    if (err) throw err
    res.render('index', {
      title: 'Employee Records',
      subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro',
      records: data,
      success:'',
    });
  })
});

router.get('/delete/:id', function(req, res, next) {
var id = req.params.id;
var del = empModel.findByIdAndDelete(id)

  del.exec(function(err,data){
    if(err) throw err
   employee.exec(function (err, data) {
     if (err) throw err
     res.render('index', {
       title: 'Employee Records',
       subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro',
       records: data,
       success: 'Record Deleted Succesfully'
     });
   })
  })
});

router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var edit = empModel.findById(id)

  edit.exec(function (err, data) {
    if (err) throw err
    res.render('edit', {title:'edit data', records:data})
  })
});

router.post('/update/', function (req, res, next) {
  var update = empModel.findByIdAndUpdate(req.body.id,{
    name: req.body.name,
    email: req.body.email,
    etype: req.body.etype,
    hourlyrate: req.body.hourlyrate,
    totalhour: req.body.totalhour,
  })

  update.exec(function (err, data) {
    if (err) throw err
      employee.exec(function (err, data) {
        if (err) throw err
        res.render('index', {
          title: 'Employee Records',
          subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro',
          records: data,
          success: 'Record Added Succesfully'
        });
      })
  })
});

// router.post('/', function (req, res, next) {
//       var empDetails = new empModel({
//         name: req.body.uname,
//         email: req.body.email,
//         etype: req.body.emptype,
//         hourlyrate: req.body.hrlyrate,
//         totalhour: req.body.ttlhr
//       })

//       console.log(empDetails);
  // empDetails.save();
//  employee.exec(function (err, data) {
//    if (err) throw err
//    res.render('index', {
//      title: 'Employee Records',
//      subtitle: 'Aaap Sabhi Apna Data Yha dekh Sakte Ho Or Mze AKro',
//      records: data
//    });
//  })
  
// })

module.exports = router;
