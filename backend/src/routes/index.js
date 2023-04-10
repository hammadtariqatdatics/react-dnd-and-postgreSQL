const { Router } = require("express");
const userRouter = require("./users/user.controller");

const router = Router();

router.use("/users", userRouter);

module.exports = router;
