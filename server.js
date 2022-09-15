// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const jsonwebtoken = require("jsonwebtoken");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  console.log("body", req.body);
  const { userName, password } = req.body;

  if (userName === "thanh" && password === "123456") {
    const token = jsonwebtoken.sign(
      {
        userName: userName,
      },
      "thanh dep trai toc hai mai",
      { expiresIn: 3600 }
    );
    res.status(200).json({ message: "oke la", token: token });
    console.log("token", token);
  }
  res.status(401).json({ message: "cut" });
});

server.use((req, res, next) => {
  if (!req.headers.authorization) {
    throw new Error("thanh be bong");
  }

  const token = req.headers.authorization;
  if (jsonwebtoken.verify(token, "thanh dep trai toc hai mai")) {
    next();
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
