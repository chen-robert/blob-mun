import express from "express";
import path from "path";

import Validator from "./db/users";
import loginRoute from "./routes/login";
import signupRoute from "./routes/login";

const PORT = process.env.PORT || 3000;

const app = express();

console.log(`Root at ${global.__rootdir}`);
app.use(express.static(path.join(global.__rootdir, "dist")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/login", loginRoute);

app.post("/signup", signupRoute);


app.get("/login", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});
app.get("/committee/*", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));