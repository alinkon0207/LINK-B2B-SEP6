import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import csrf from "csrf";

// Access the routes by importing it into index.js
import user from "./routes/Users.js";
import stellar from "./routes/Stellar.js";
import transact from "./routes/Withdrawal.js";
import ngnAccount from "./routes/NgnAccount.js";
import ngncTransaction from "./routes/ngncWidget.js";
import settlement from "./routes/Settlement.js";
import ngncWallet from "./routes/NgncWallet.js";

const app = express();
dotenv.config();

////  NEW METHOD VERSION 4.16 +///////////
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));

//allows servers to specify not only who can access the assets, but also how they can be accessed
app.use(
  cors({
    origin: [
      "https://ngnc.online",
      "https://ngnc-bridge.vercel.app",
      "http://localhost:3000",
      "https://linkb2b.vercel.app",
    ],
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);

app.get("/", (req, res) => res.send("APP is running!"));
app.get("/routes", (req, res) => res.send("Routes are working well"));

// Set-up the starting route for all route in post.js
app.use("/api/user", user);
app.use("/api/stellar", stellar);
app.use("/api/account", ngnAccount);
app.use("/api/transaction", transact);
app.use("/api/ngnc", ngncTransaction);
app.use("/api/settlement", settlement);
app.use("/api/ngnc-wallet", ngncWallet);

//Our access port. Changes when we deploy with heroku
const PORT = process.env.PORT || 6000;

// Call the mongoose servers database
connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));
