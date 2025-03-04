import express from "express";
import axios from "axios";

const app = express();
const PORT = 3033;
const API_URL = "http://localhost:3034";

app.use(express.static("Public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(400).json({ message: "this is an Error" });
  }
});


app.get("/new", (req, res) => {
  res.render("blog.ejs",
  {
      header: "New Post",
      submit: "Create One Now",
  });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);

    console.log(response.data);

    res.render("blog.ejs",
      {
          header: "Edit Post",
          submit: "Update Post",
          post: response.data,
      });
         
  } catch (error) {
    res.status(400).json({ message: "This is greate I think" });
  }

});


app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: "O! that is greate men!" });
  }
});

app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: "Try Again Please..." });
  }
});

app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: "Error is Occured now" });
  }
});


app.listen(PORT, () => {
  console.log(`URL is running at  http://localhost:${PORT}`);
});
