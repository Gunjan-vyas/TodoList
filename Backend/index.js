const express = require("express");
const app = express();

const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");

app.use(express.json());

// title: string
// description: string;
app.post("/todo", async function (req, res, next) {
  console.log(req.body);
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "TODO CREATED",
  });

  // put it in mongodb
});

app.get("/todos", async function (req, res, next) {
  try {
    const allTodos = await todo.find({});
    res.json({ allTodos });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.put("/completed", async function (req, res, next) {
  try {
    const updatedPayload = req.body;
    const parsePayload = updateTodo.safeParse(updatedPayload);

    if (!parsePayload.success) {
      res.status(411).json({
        msg: "You sent the wrong inputs",
      });
      return;
    }

    await todo.findOneAndUpdate(
      {
        _id: updatedPayload.id,
      },
      {
        completed: true,
      }
    );

    res.json({
      msg: "TODO MARKE COMPLETED",
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ msg: err.message });
  }
});

app.listen(3005);
