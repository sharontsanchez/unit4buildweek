const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const { restricted } = require('./middleware/restricted')
const authRouter = require('./auth/auth-router')
const plantsRouter = require("./plants/plants-router");
const userRouter = require("./users/users-router");
const Users = require("./users/users-model");


const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', authRouter)
server.use("/api/user", restricted, userRouter);
server.use("/api/plants", restricted, plantsRouter);



server.get("/api/users", (req, res, next) => {
  Users.getAllUsers()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch(next);
});


// build an endpoint to test if app is working
server.get("/", (req, res) => {
  res.status(200).json({ message: "API is up" });
});



// eslint-disable-next-line
server.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});



module.exports = server
