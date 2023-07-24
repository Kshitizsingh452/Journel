//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Welcome to our Daily Journal website, where you can embark on a journey of self-reflection, personal growth, and capturing the essence of your daily experiences. Our platform is designed to empower and inspire you to document your thoughts, emotions, and experiences, creating a valuable repository of memories and insights..";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts

  });
});



app.get("/about", function (req, res) {
  res.render("about", { startingContentAbout: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { startingContentContact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose")
});


app.post("/compose", function (req, res) {
  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  }

  posts.push(post);
  res.redirect("/");
});





app.get("/posts/:requestedTitle", function (req, res) {
  var requestedTitle = _.lowerCase(req.params.requestedTitle);
  posts.forEach((post) => {
    var storedTitle = _.lowerCase(post.postTitle);
    if (requestedTitle === storedTitle) {
      res.render("post", {
        requiredPostTitle: post.postTitle,
        requiredPostBody: post.postBody
      });
    }
  });
});






app.listen(3000, function () {
  console.log("Server started on port 3000");
});
