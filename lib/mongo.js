const {MongoClient, ObjectID} = require('mongodb');
const config = require('../config');


// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${DB_NAME}`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  });
    this.dbName = DB_NAME;

    this.connect();
  }

  connect(){
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if(error){
          reject(error)
        } 
        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      })
    })
  }

  getAll(collection) {
    return this.connect()
      .then(db => db.collection(collection).find({}).toArray())
  }

  getOne(collection, id) {
    return this.connect()
      .then(db => db.collection(collection).findOne({_id: ObjectID(id)}));
  }

  createOne(collection, data) {
    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId)
  }

  updateOne(collection, id, data) {
    return this.connect()
      .then(db => db.collection(collection).updateOne({_id: ObjectID(id)}, {$set: data}, {upsert: true}))
      .then(result => result.upsertedId || id);
  }

  deleteOne(collection, id) {
    return this.connect()
      .then(db => db.collection(collection).deleteOne({_id: ObjectID(id)}))
      .then(() => id);
  }
}

module.exports = MongoLib;