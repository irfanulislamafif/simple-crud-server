const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());
// username: simpleDBUser
// bNAZfBMxDF2X9tYd
const uri =
  "mongodb+srv://simpleDBUser:bNAZfBMxDF2X9tYd@crud-server.uh1ypyh.mongodb.net/?appName=crud-server";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Simple Crud is running");
});
async function run() {
  try {
    await client.connect();
    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection("users");

    //   add database related api here
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("user info", newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//**
// 1. at least one user
// 2. set uri with userId and password
// 3. create a mongodb client
// 4. add a run function to connect to the database
// 5. use try finally inside it to connect the client
// 6. ping the database to see server alive or not*/
