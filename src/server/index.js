import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import compression from "compression";

import loginRoute from "./routes/login";
import signupRoute from "./routes/signup";
import saveRoute from "./routes/saveState";
import loadRoute from "./routes/load";
import requireAuth from "./routes/requireAuth";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

app.post("/login", loginRoute);
app.post("/signup", signupRoute);
app.post("/save", requireAuth(false), saveRoute);
app.get("/load", requireAuth(false), loadRoute);


app.get("/login", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});
app.get("/dashboard", requireAuth(true), (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});
app.get("/committee/*", requireAuth(true), (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});

console.log(`Root at ${global.__rootdir}`);
app.use(express.static(path.join(global.__rootdir, "dist")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));