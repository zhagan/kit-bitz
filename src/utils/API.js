import axios from "axios";

var unirest = require('unirest');

export default {
  // Gets all books
  getParts: function() {
    return axios.get("/api/parts");
  },

  searchPart: function() {
  //   var url = "http://octopart.com/api/v3/parts/search";
  // //  url += '&queries='+query;
  //   url += '&callback=?';
  //   url += '&apikey=d7585fa3';
  //
  // //  url += '&include[]=specs';
  //
  //   var args = {
  //           q: "solid state relay",
  //           start: 0,
  //           limit: 10
  //       };

    // return unirest.get(url, args)
    //       .send()
    //       .end(response=> {
    //         if (response.ok) {
    //           console.log("Got a response: ", response.body)
    //           var b = response.body.slice(2, response.body.length-1);
    //           var resObj = JSON.parse(b);
    //           console.log(resObj);
    //           return resObj;
    //         //  res.send(resObj);
    //         } else {
    //           console.log("Got an error: ", response.error)
    //         }
    //
    //     });

    var queries = [

        {'mpn': 'MFR-25FRF52-1K', 'reference': 'line1'},
        {'mpn': 'K104K15X0UF53H5H', 'reference': 'line2'},
        {'mpn': 'UVR1V100MDD1TA', 'reference': 'line3'},
        {'mpn': 'C0603C104M5RACTU', 'reference': 'line4'},
        {'mpn': 'RC0603FR-07200KL', 'reference': 'line5'},
        // {'sku': '67K1122', 'reference': 'line2'},
        // {'mpn_or_sku': 'SN74S74N', 'reference': 'line3'},
        // {'mpn': 'SN74S74N', 'brand': 'Texas Instruments', 'reference': 'line4'}
    ];

    var args = {
        queries: JSON.stringify(queries)
    };

    // var url = 'http://octopart.com/api/v3/parts/match?';
    // url += '&queries='+JSON.stringify(queries);
    // url += '&apikey=d7585fa3';
    // url += '&callback=?';
    // url += '&include[]=specs';
    var url = 'http://octopart.com/api/v3/parts/match?';
    url += '&queries=[{"mpn":"SN74S74N"}]';
    url += '&apikey=d7585fa3';
    url += '&callback=?';

    var options ={
          //  mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }

    return axios.get(url)
      .then(response => {
        console.log(response);
        return JSON.toString(response.body);
      })
      .catch(function (error) {
        console.log(error);
      });

    // return axios.get("/api/parts");
  },
  // Gets the part with the given id
  getPart: function(id) {
    return axios.get("/api/parts/" + id);
  },
  // Deletes the part with the given id
  deletePart: function(id) {
    return axios.delete("/api/parts/" + id);
  },
  // Saves a part to the database
  savePart: function(partData) {
    return axios.post("/api/parts", partData);
  }
};
