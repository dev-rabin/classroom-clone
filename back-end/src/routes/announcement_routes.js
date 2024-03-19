const express = require("express");
const announcementRouter = express.Router();
const ClassAnnouncementController = require("../controllers/classAnnouncement_controller");

announcementRouter.post("/createannouncement",ClassAnnouncementController.createAnnouncementByClassId);
announcementRouter.get("/:class_id/announcements", ClassAnnouncementController.getAnnouncementByClassId);

module.exports= announcementRouter;