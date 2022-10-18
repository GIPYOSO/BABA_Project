const { Router } = require("express");
const router = Router();
const { Calender } = require("./../../models");
var mongoose = require('mongoose');

/* Fetch all events */
//http://localhost:8080/calender/get_events
router.get("/get_events", async (req, res, next) => {
  try {
    const events = await Calender.find();
    res.status(200).json(events);
  } catch (e) {
    next(e);
    // res.status(404).json({ message: error.message });
  }
});

/* Create new event */
//http://localhost:8080/calender/add_events
router.post("/add_events", async (req, res, next) => {
  const { user_id, title, date } = req.body;

  const newEvent = new Calender({ user_id, title, date });

  try {
    await newEvent.save({
      user_id,
      title,
      date,
    });

    res.status(201).json({
      type: "success",
      message: "Event has been added successfully",
    });
  } catch (e) {
    // res.status(409).json({ message: error.message });
    next(e);
  }
});

/* Delete singile event */
//http://localhost:8080/calender//delete_event/user_id
router.post("/delete_event/:user_id", async (req, res, next) => {
  const { user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send(`No event with id: ${user_id}`);

  await Calender.findByIdAndRemove(user_id);

  res.json({ message: "Event deleted successfully." });
});

module.exports = router;
