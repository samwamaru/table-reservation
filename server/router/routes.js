import { Router } from "express";
const router= Router()

// import all controller
import * as controller from "../controllers/userLogin.js"
import * as reservationcontroller from "../controllers/tableReservation.js"

//POST methods
router.route("/register").post(controller.register)

router.route("/authenticate").post()
router.route("/login").post(controller.verifyUser, controller.login)
router.route("/reservations").post(reservationcontroller.createReservation)

//get methods
router.route("/user:username").get(controller.getUser)
router.route("/generateOTP").get(controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)
router.route('/reservations').get(reservationcontroller.getAllReservations)
router.route('/reservations/:id').get(reservationcontroller.getReservationById)
router.route('/reservations/availability').get(reservationcontroller.getTableAvailability)
router.route('/reservations/guest/:id').get(reservationcontroller.getGuestDetails)
router.route('/reservations/guest/:id/reservations').get(reservationcontroller.getGuestReservations)
router.route("/reservations/report").get(reservationcontroller.getReservationReport)



//put methods
router.route("/updateUser").put(controller.updateUser)
router.route("/resetPassword").put(controller.resetPassword)
router.route('/reservations/:id').put(reservationcontroller.updateReservation)

//delete methods
router.route('/reservations/:id').delete(reservationcontroller.deleteReservation)

export default router
