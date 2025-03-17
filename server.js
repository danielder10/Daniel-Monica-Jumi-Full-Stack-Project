require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (if needed)

// Home Route - Show Books
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books ORDER BY id ASC");
    res.render("index", { books: result.rows });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
});

// Add Book Route
app.post("/add", async (req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    await pool.query(
      "INSERT INTO books (title, author, genre, year) VALUES ($1, $2, $3, $4)",
      [title, author, genre, year || null]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

// Delete Book Route
app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

// Edit Book Route - Show Edit Form
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.render("edit", { book: result.rows[0] });
  } catch (err) {
    console.error("Error fetching book details:", err);
    res.status(500).send("Error fetching book details");
  }
});

// Update Book Route
app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year } = req.body;
  try {
    await pool.query(
      "UPDATE books SET title=$1, author=$2, genre=$3, year=$4 WHERE id=$5",
      [title, author, genre, year || null, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
