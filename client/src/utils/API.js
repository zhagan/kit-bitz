import axios from "axios";

export default {
  // Gets all books
  getParts: function() {
    return axios.get("/api/parts");
  },

  searchPart: function(query) {

    var  question = {
            q: query,
            start: 0,
            limit: 10
        };

    var url = "http://octopart.com/api/v3/parts/search?";
    url += '&apikey=d7585fa3';
    url += '&include[]=specs';

    return axios.get(url, {
      params: question
    })
      .then(response => {
        response.data.results.forEach( result => {

          console.log(result.item);

        });
        //console.log(response.body);
        return response.data.results;
      })
      .catch(error => {
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
