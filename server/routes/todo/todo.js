const { Router } = require("express");
const router = Router();
const { Todo } = require("./../../models");

//localhost:8080/todo/
http: router.post("/", async (req, res, next) => {
  console.log(req.body);
  let { todo_title, user_id, date } = req.body;

  try {
    await Todo.create({
      user_id,
      todo_title,
      date,
    });

    res.json({
      status: true,
      message: "할일이 등록되었습니다.",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
