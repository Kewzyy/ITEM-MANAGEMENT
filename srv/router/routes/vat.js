"use strict";
var express = require("express");
var soap = require("soap");
var hdb    = require('hdb');




module.exports = function () {
	
	// app.get("/sql", function(req,res) {
	// 				var client = hdb.createClient({
	// 	  host     : 'rixpcoehdb56.internal.corp',
	// 	  port     : 30050,
	// 	  user     : 'DNS_ADMIN',
	// 	  password : 'CatakBapKij50'
	// 	});
	// 	client.on('error', function (err) {
	// 	  console.error('Network connection error', err);
	// 	});
	// 	client.connect(function (err) {
	// 	  if (err) {
	// 	  	return console.error('Connect error', err);
	// 	  }
	// 	  client.exec('select * from DUMMY', function (err, rows) {
	// 		client.end();
	// 	    if (err) {
	// 	      return console.error('Execute error:', err);
	// 	    }
	// 	    console.log('Results:', rows);
	// 	  });
	// 	});
	// }),
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var app = express.Router();
    
    app.get("/check", function(req, res)  {

				var url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";
				var args = {countryCode: req.query.countryCode,
		  			        vatNumber: req.query.vatNumber };
		  			  console.log(req.query);
		  soap.createClient(url, function(err, client) {
		      client.checkVat(args, function(err, result) {
		          //console.log(result);
		          res.json(result);
		      });
		      
		  });
    
    });
    
    return app;
};