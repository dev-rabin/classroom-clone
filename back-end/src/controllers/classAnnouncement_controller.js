const db = require("../connection");

const ClassAnnouncementController = {
    createAnnouncementByClassId : (req,res) =>{
        const {class_id, announcement} = req.body;
        const query = "insert into classannouncements (class_id,announcement) values (?,?)";
        db.query(query,[class_id, announcement],(error,result)=>{
            if (error) {
                console.error("createAnnouncementByClassId error : ",error);
                return res.json({success : false, message : error.message})
            }else{
                console.log("createAnnouncementByClassId created : ", result);
                return res.json({success:true, message : "Announcement created!", data: result})
            }
        })
    },
    getAnnouncementByClassId: (req, res) => {
        const class_id = req.params.class_id;
        const query = "SELECT * FROM classannouncements WHERE class_id = ?";
    
        db.query(query, class_id, (error, result) => {
            if (error) {
                console.error("getAnnouncementByClassId error:", error);
                return res.json({ success: false, message: error.message });
            } else {
                console.log("getAnnouncementByClassId fetched:", result);
                return res.json({ success: true, message: "Announcement fetched!", data: result });
            }
        });
    }
    
}

module.exports = ClassAnnouncementController