const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if(!doesExist(username)) {
            users.push({"username":username, "password":password});
            return res.status(200).json({message:"User successfully registered. You may now log in."});
        } else {
            return res.status(404).json({message:"User already exists. Cannot create duplicate users."});
        }
    }
    return res.status(404).json({message:"Unable to register new user."})
})

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
    promise1.then(() => {
        return res.send(JSON.stringify(books, null, 4));
    })
  //Write your code here
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 2000)
    })
    promise1.then(() => {
        let isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn]))
    });
})
  
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    let promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
        })
        promise1.then(() => {
            let authorName = req.params.author;

            for (var key in books) {
                if (books[key].author == authorName) {
                    return res.send(JSON.stringify(books[key], null, 4));
                }
            }
            return res.send("Unable to find book with given author.")
        });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
        })
        promise1.then(() => {
            let titleName = req.params.title;
            for (var key in books) {
                if (books[key].title == titleName) {
                    return res.send(JSON.stringify(books[key], null, 4));
                }
            }
            return res.send("Unable to find book with given title.")
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn].reviews))
  
});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


module.exports.general = public_users;
