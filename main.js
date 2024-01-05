const express = require("express");
const app = express();

const port = 3000; // const port=3000|process.env.port  //this is used for deployment to specify their port
app.listen(port, () => {
  console.log("Running on port: ", port);
});

app.use(express.json());

app.get("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`${name},${age}`);
});

app.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name missing" });
  }
  res
    .status(200)
    .json({ message: `Contact: ${name} received ${phone} and ${email}` });
});
