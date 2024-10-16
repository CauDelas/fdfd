const router = require("express").Router();

// service router

const servicesRouter = require("./services");

router.use("/", servicesRouter);

//partie router
const partyRouter = require("./parties")

router.use("/", partyRouter);



module.exports = router;