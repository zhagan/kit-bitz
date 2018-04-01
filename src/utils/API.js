import axios from "axios";

export default {
  // Gets all books
  getParts: function() {
    return axios.get("/api/parts");
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
    return axios.post("/api/parts", bookData);
  }
};
