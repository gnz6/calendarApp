const { response } = require("express");
const Calendar = require("../../models/Calendar")
const User = require("../../models/User")

const getAllEvents = async (req, res = response) => {
    try {
        const events = await Calendar.find({})
            .populate("user", "name")
        if (!events) return res.status(404).json({ message: "No events found" })
        return res.status(200).json({ ok: true, data: events })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

const getOneEvent = async (req, res = response) => {
    const { event_id } = req.params;
    try {
        const findEvent = await Calendar.findById(event_id)
            .populate("user", "name")
        if (!findEvent) return res.status(404).json({ message: "No event found" })
        return res.status(200).json({ ok: true, data: findEvent })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

const updateEvent = async (req, res = response) => {
    const { event_id } = req.params;
    const { uid } = req;

    try {
        if (!event_id) return res.status(404).json({ message: "No event provided" })

        const findEvent = await Calendar.findById(event_id)

        if (!findEvent) return res.status(404).json({ message: "No event found" })
        if (findEvent.user.toString() !== uid) return res.status(401).json({ message: "Unauthorized access" })
        const newEvent = { ...req.body, user: uid }

        const updatedEvent = await Calendar.findByIdAndUpdate(event_id, newEvent, { new: true })

        return res.status(200).json({ ok: true, data: updatedEvent, message: "Updated event" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }

}

const deleteEvent = async (req, res = response) => {
    const { event_id } = req.params;
    const { uid } = req;

    try {
        if (!event_id) return res.status(404).json({ message: "No event provided" })
        const findEvent = await Calendar.findById(event_id)
        if (!findEvent) return res.status(404).json({ message: "No event found" })
        if (findEvent.user.toString() !== uid) return res.status(401).json({ message: "Unauthorized access" })  

        await Calendar.findByIdAndDelete(event_id)

        return res.status(200).json({ ok: true, message: "Event deleted" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

const createEvent = async (req, res = response) => {
    const { title, notes, start, end } = req.body;
    const { uid } = req;
    try {
        const findUser = await User.findById(uid);
        if (!findUser) return res.status(404).json({ ok: false, message: "User not found" })

        const newEvent = await Calendar.create({
            title, notes, start, end, user: uid
        })

        return res.status(201).json({ ok: true, message: "Event created", data: newEvent })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: error.message })
    }
}


module.exports = { getAllEvents, getOneEvent, updateEvent, deleteEvent, createEvent }