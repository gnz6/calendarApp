const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateJWT } = require("../../middlewares/validateJWT")
const { validateFields } = require("../../middlewares/validateFields")
const { getAllEvents, getOneEvent, updateEvent, deleteEvent, createEvent } = require("../../controllers/calendar/events")
const { isDate } = require("../../helpers/isDate")
router.use(validateJWT)


router.get('/', getAllEvents)

router.get('/:event_id', getOneEvent)

router.post('/', [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields
], createEvent)

router.put('/:event_id', updateEvent)

router.delete('/:event_id', deleteEvent)


module.exports = router;



