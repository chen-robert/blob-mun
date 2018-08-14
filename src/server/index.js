import express from "express";
import path from "path";

const PORT = process.env.PORT || 3000;

console.log(global.__rootdir)
const app = express();
app.use(express.static(path.join(global.__rootdir, "dist")));


app.post("/login", (req, res) => {
  
});

app.post("/signup", (req, res) => {
  
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));