
/*
if(CONFIG.db_host != ''){
    var files = fs
      .readdirSync(__dirname)
      .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
      .forEach((file) => {
        var filename = file.split('.')[0];
        var model_name = filename.charAt(0).toUpperCase() + filename.slice(1);
        models[model_name] = require('./'+file);
    });

    mongoose.Promise = global.Promise; 
    const mongo_location = "mongodb://dev:onwave123@cluster0-shard-00-02-g7ngb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"

    mongoose.connect(mongo_location).catch((err)=>{
        console.log('*** Couldn\'t Connect to Mongo Server:', mongo_location)
    })

    let db = mongoose.connection;
    module.exports = db;
    db.once('open', () => {
        console.log('Connected to mongo at '+ mongo_location);
    })
    db.on('error', (error) => {
        console.log("error", error);
    })
    } else {

    console.log("No Mongo Credentials Given");
}
*/