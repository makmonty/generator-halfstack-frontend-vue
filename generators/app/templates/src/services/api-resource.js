import extend from 'extend';
import api from './api';

export default function ApiResource(path, schema) {

  var Resource = function(data) {
    extend(this, data);
  };

  Resource.prototype.getData = function() {
    var data = {};

    for (var i in this) {
      if (this.hasOwnProperty(i) && typeof this[i] !== 'function' && i.charAt(0) !== '$') {
        data[i] = this[i];
      }
    }

    return data;
  };

  Resource.prototype.isNew = function() {
    return !this._id;
  };

  Resource.prototype.save = function() {
    var data = this.getData();
    var method = this.isNew() ? 'post' : 'put';
    var self = this;
    var reqPath = path + (this.isNew() ? '' : '/' + this._id);

    return api[method](reqPath, data)
      .then(function(response) {
        return extend(self, response.data);
      });
  };

  Resource.getById = function(id) {
    return api.get(path + '/' + id)
      .then(function(response) {
        return new Resource(response.data);
      });
  };

  Resource.find = function(filters) {
    return api.get(path, filters)
      .then(function(response) {
        var objs = [];
        response.data.forEach(function(obj) {
          objs.push(new Resource(obj));
        });
        return objs;
      });
  };

  Resource.findOne = function(filters) {
    return this
      .find(filters)
      .then((objs) => {
        return objs.length ? objs[0] : null;
      });
  };

  return Resource;
}
