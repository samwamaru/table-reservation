import { Router } from "express";
const router= Router()

// import all controller
import * as controller from "../controllers/userLogin.js"
import * as medicalRecordsController from "../controllers/medicalRecords.js"
import * as appointmentConroller from "../controllers/appointment.js"

import { registerMail } from "../controllers/mailer.js";


//import middleware
import { authenticateDoctor,authenticatePatient } from "../middleware/auth.js";
//POST methods
router.route("/register/doctor").post(controller.registerDoctor)
router.route("/register/patient").post(controller.registerPatient)
router.route("/login/patient").post(controller.loginPatient)
router.route("/new/medicalrecord").post(authenticateDoctor, medicalRecordsController.createMedicalRecord)

router.route("/login/doctor").post(controller.loginDoctor)
router.route("/create/appointment").post(authenticatePatient, appointmentConroller.createAppointment)





//get methods
router.route("/medical-records/:recordId").get(authenticatePatient, medicalRecordsController.getMedicalRecordById)
router.route("/doctor/medical-records/:recordId").get(authenticateDoctor, medicalRecordsController.getMedicalRecordById)
router.route("/appointments").get(authenticateDoctor, appointmentConroller.getAllAppointments)


//put methods
router.route("/patients/update-info").put(authenticatePatient, controller.updatePatientInfo)
router.route("/doctors/update-info").put(authenticateDoctor, controller.updateDoctorInfo)
router.route("/appointment-status/:appointmentId").put(authenticateDoctor, appointmentConroller.updateAppointmentStatus)


export default router
