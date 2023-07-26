const { Register, Login } = require("../controllers/authController");
const { userVerification } = require("../middleware/authMiddleware");
const { mapApi } = require("../controllers/mapApi");
const router = require('express').Router()




router.get('/api/map', mapApi)
router.post('/register', Register)
router.post('/login', Login)
router.post('/', userVerification)

module.exports = router