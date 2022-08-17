import { MongoClient } from "mongodb"
import { uri } from "../../credentials"
const client = new MongoClient(uri)

export const db = client.db("BocaCode")