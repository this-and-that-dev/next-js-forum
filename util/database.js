import { MongoClient } from 'mongodb'



const url = 'mongodb+srv://'+process.env.NEXT_MONGODB_ID+':'+process.env.NEXT_MONGODB_PASSWORD+'@cluster0.rha1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url, options).connect()
}
export { connectDB }