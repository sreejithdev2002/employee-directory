const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb"//localhost:27017';
const dbName = process.env.DB_NAME || "employee_directory";
const client = new MongoClient(uri);

async function connect() {
    if(!client.isConnected?.()) {
        await client.connect();
    }
    return client.db(dbName);
}

module.exports = { connect, client };