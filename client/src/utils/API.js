import axios from 'axios';

export default {
  // Gets all books
  getParts: function() {
    return axios.get('/api/parts/');
  },
  // Gets the part with the given id
  getPart: function(id) {
    return axios.get('/api/parts/' + id);
  },
  // Deletes the part with the given id
  deletePart: function(id) {
    return axios.delete('/api/parts/' + id);
  },
  // Saves a part to the database
  addPart: function(partData) {
    return axios.post('/api/parts/', partData);
  },
  changeQtyPart: function(id, newQty) {
    let data = {
      id: id,
      qty: newQty
    };
    return axios.put('/api/parts/' + id, data);
  },
  getMyKits: function() {
    return axios.get('/api/createkit/');
  },
  // Gets the kit with the given id
  getKit: function(id) {
    return axios.get('/api/createkit/' + id);
  },

  getKits: function() {
    return axios.get('/api/kits/');
  },
  // Deletes the kit with the given id
  deleteKit: function(id) {
    return axios.delete('/api/createkit/' + id);
  },
  // Saves a kit to the database
  addKit: function(kitData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post('/api/createkit/', kitData, config);
  },

  getUser: function() {
    return axios.get('/api/users/getuser/');
  }
};
