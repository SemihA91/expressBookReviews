const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validUsers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) { //no username or password provided
    return res.status(404).json({message:"No username or password provided. Error logging in."});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
        data:password
    }, 'access', {expiresIn: 60*60});

    req.session.authorization = {
        accessToken, username
    }

    return res.status(200).json({message:"User signed in."});
  } else {
    return res.status(208).json({message: "Invalid credentials, check again."});
  }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    let isbn= req.params.isbn;
    let reviewContent = req.body.review;
    let username = req.session.authorization.username;
    let book = books[isbn];
    
    book.reviews[username] = reviewContent
    return res.status(200).json({message:"Review added successfully"});
});

regd_users.delete("/auth/review/:isbn", (req,res) => {
    let isbn= req.params.isbn;
    let username = req.session.authorization.username;
    let book = books[isbn];
    if (username in book.reviews){
        delete book.reviews[username];
        return res.status(200).json({message:"Review deleted successfully"});
    } else {
        return res.status(404).json({message: "Unable to delete review."});
    }


})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
