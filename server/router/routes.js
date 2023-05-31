import { Router } from "express";
const router= Router()

// import all controller
import * as controller from "../controllers/userLogin.js"
import { registerMail } from "../controllers/mailer.js";
import * as reservationcontroller from "../controllers/tableReservation.js"

//import middleware
import { verifyUser,verifyAdmin,localVariables } from "../middleware/auth.js";
//POST methods
router.route("/register").post(controller.register)
router.route("/createtable").post(verifyUser,verifyAdmin, reservationcontroller.createTable)
router.route('/registerMail').post(registerMail)

router.route("/authenticate").post()
router.route("/login").post(controller.login)
router.route("/reservations").post(verifyUser,reservationcontroller.createReservation)

//get methods
router.route("/user").get( verifyUser, controller.getUser)
router.route("/generateOTP").get(verifyUser,localVariables, controller.generateOTP)
router.route("/verifyOTP").get( verifyUser, controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)
router.route('/reservations').get(reservationcontroller.getAllReservations)
router.route('/reservations/:id').get(reservationcontroller.getReservationById)
router.route('/reservations/availability').get(reservationcontroller.getTableAvailability)
router.route('/reservations/guest/:id').get(reservationcontroller.getGuestDetails)
router.route('/reservations/guest/:id/reservations').get(reservationcontroller.getGuestReservations)
router.route("/reservations/report").get(reservationcontroller.getReservationReport)



//put methods
router.route("/updateuser").put(verifyUser, controller.updateUser)
router.route("/resetPassword").put( verifyUser, controller.resetPassword)
router.route('/reservations/:id').put(reservationcontroller.updateReservation)
router.route('/assigntable').put(verifyUser,verifyAdmin, reservationcontroller.assignTable)

//delete methods
router.route('/reservations/:id').delete(reservationcontroller.deleteReservation)

export default router
