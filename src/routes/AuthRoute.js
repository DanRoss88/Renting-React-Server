const { Register, Login } = require("../controllers/authController");
const { FindProfile, CreateProfile, UpdateProfile, DeleteProfile, DisplayProfile } = require("../controllers/profileController");
const { userVerification } = require("../middleware/authMiddleware");
const { mapApi } = require("../controllers/apis");
const { messagesApi } = require("../controllers/apis");
const router = require('express').Router()


/////// *** API ROUTES *** ///////
router.get('/messages', messagesApi)
router.get('/api/map', mapApi)
/////// *** AUTH ROUTES *** ///////
router.post('/register', Register)
router.post('/login', Login)
router.post('/', userVerification)
//////// *** PROFILE ROUTES *** ///////
router.put('/edit-profile', UpdateProfile)
router.get('/find-profile/:username', FindProfile)
router.post('/edit-profile', CreateProfile)
router.delete('/profile', DeleteProfile)
router.get('/profile', DisplayProfile)




module.exports = router