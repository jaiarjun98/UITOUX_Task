import { db } from "../../modules/index.js";

class CommonService {
  constructor() {
    // Empty Constructor
  }

  getAllList(condition, accessObject) {
    return new Promise((resolve, reject) => {
      return accessObject
        .findAll(condition)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getById(id, options, accessObject) {
    return new Promise((resolve, reject) => {
      return accessObject
        .findByPk(id, options)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  create(data, accessObject) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .create(data, { transaction: t })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }

  update(condition, data, accessObject) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .update(
            data,
            { returning: true, plain: true, where: condition },
            { transaction: t }
          )
          .spread((affectedCount, affectedRows) => {
            return accessObject.findOne({ where: condition });
          })
          .then((results) => {
            resolve(results);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }

  getData(condition, accessObject) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .findOne(condition, { transaction: t })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }

  // TO insert the record on multiple table at a time 
  saveWithAssociation(data, options, accessObject) {
    const promise = new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        options.transaction = t;
        return accessObject
          .create(data, options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
    return promise;
  }

  // We can insert the Array of Object record with appropriate request details
  bulkCreate(array, accessObject) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .bulkCreate(array)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }

  bulkUpdate(array, options, accessObject) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .bulkCreate(array, { updateOnDuplicate: options, transaction: t })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }


  // This Method used to Check data exist or not, if not record will insert 
  getOrSave(condition, data, accessObject, associations) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity.transaction((t) => {
        return accessObject
          .findOrCreate({
            where: condition,
            include: associations,
            defaults: data,
            transaction: t,
          })
          .then((resultdata) => {
            resolve(resultdata);
          })
          .catch((error) => {
            t.rollback();
            reject(error);
          });
      });
    });
  }
  getCountAndList(condition, accessObject) {
    return new Promise((resolve, reject) => {
      return accessObject
        .findAndCountAll(condition)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // TO execute the raw query we can use this functionality by passing the query and their parameyters
  executeQuery(querystring, queryparams) {
    return new Promise((resolve, reject) => {
      return db.dbConnectivity
        .query(querystring, queryparams)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getCurrentDateTime() {
    return new Date();
  }
}
export default new CommonService();
