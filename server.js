


const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://shavkatovjasurbek:l2notU7g56aTPsRk@cluster0.dauaqhh.mongodb.net/Reja"
mongodb.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true}, (err, client) => {
        if(err) console.log("ERROR on connection MOngoDB");
        else {
            console.log("MongoDG connection succeded")
            // console.log(client);
            module.exports = client;
            const app = require('./app');
            const server = http.createServer(app);
            let PORT = 3000; 
            server.listen(PORT, function() {
                console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
            });
        }
    });
