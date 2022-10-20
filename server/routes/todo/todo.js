const { Router } = require("express");
const router = Router();
const { Todo } = require("./../../models");

// KST Setting
var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

//localhost:8080/todo/write 투두 작성
router.post("/write", async (req, res, next) => {
  console.log(req.body);
  let { content, user_id, date } = req.body;

  let checkEmail = await Todo.findOne({ user_id });

  try {
    const todoTask = new Todo({
      user_id: user_id,
      content: content,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    await todoTask.save();
    console.log("\u001b[36m", "==== Success!! Save New TodoTask ====");
    console.table([
      {
        id: todoTask._id,
        user_id: todoTask.user_id,
        content: todoTask.content,
        date: todoTask.date,
      },
    ]);
    res.json({
      todoTask,
    });
  } catch (err) {
    console.err("\u001b[31m", "==== Fail!! Save TodoTask ====");
    res.json({});
  }
});

//localhost:8080/todo/ 투두 불러오기
router.get("/:user_id", async (req, res, next) => {
  console.log(req.params);

  let { user_id } = req.params;

  let checkEmail = await Todo.findOne({ user_id });
  // db.articles.find( { “writer”: “Velopert”, “likes”: { $lt: 10 } } )

  let todo = await Todo.find({ user_id }).sort({ date: -1 });

  res.json(todo);
});

//=> 수정을 요청하는 함수
// router.get("/edit/:id", async(req, res, next)=> {
//   console.log(req.body);

//   let  {user_id}  = req.body;
//   let id = req.params.id;

//   let todo = await Todo.find({})
//   .sort({ date: -1 })

//   res.json({todo, id});

// })

router.delete("/remove/:id", async (req, res, next) => {
  console.log(req.param);

  const { id } = req.params;

  try {
    await Todo.findByIdAndRemove(id).exec();

    console.log("\u001b[31m", "==== Success!! Remove TodoTask ====");
    console.log("id: " + id);

    res.json({
      message: "삭제 성공",
    });
  } catch (err) {
    console.log("\u001b[31m", "==== Fail!! Remove TodoTask ====");
    console.error(err);
  }
});

module.exports = router;
