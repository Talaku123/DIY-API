import express from "express";

const app = express();
const PORT = 3034;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [
  {
    id: 1,
    title: "This is title for everyone I just suggested",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse, perferendis corrupti illum? Vero nemo illo labore cumque autem",
    author: "by Me",
    date: new Date().getFullYear(),
  },
  {
    id: 2,
    title: "second Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse, perferendis corrupti illum? Vero nemo illo labore cumque autem",
    author: "by Famouse you",
    date: new Date().getFullYear(),
  },
  {
    id: 3,
    title: "Third Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
  {
    id: 4,
    title: "Forth Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
  {
    id: 5,
    title: "Fivth Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
  {
    id: 6,
    title: "Sixth Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
  {
    id: 7,
    title: "Seventh Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
  {
    id: 8,
    title: "eighth Title",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptate, dolorem nemo dignissimos optio, pariatur consectetur ratione repellendus aspernatur placeat esse",
    author: "the third author",
    date: new Date().getFullYear(),
  },
];

let lastId = 2;

app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(400).json({ message: "this is not post" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});


app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post)
    return res.status(404).json({ message: "Post is now not available" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "try agian!" });

  posts.splice(index, 1);
  res.json({ message: " Post deleted" });
});


app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
