const database = require('../database/database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.updateTask = async (req, res) => {
  const { isCompleted, itemId } = req.body;

  try {
    const result = await database.query(
      'UPDATE task SET iscompleted = $1 WHERE _id = $2',
      [isCompleted, itemId]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};

exports.updateData = async (req, res) => {
  const { title, description, date, isCompleted, isImportant, id } = req.body;
  // console.log(req.body); => _id (콘솔로 확인 시 실제로 id로 받고 있음)

  try {
    const result = await database.query(
      'UPDATE task SET title = $1, description = $2, date = $3, iscompleted = $4, isimportant = $5 WHERE _id=$6',
      [title, description, date, isCompleted, isImportant, id]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};

exports.patchTravelData = async (req, res) => {
  upload.single('planner_img')(req, res, async (err) => {
    if (err) {
      console.error('File upload failed:', err);
      return res.status(500).json({ message: 'File upload failed: ' + err });
    }

    const { project_idx, planner_title, planner_description } = req.body;
    const planner_img = req.file ? req.file.filename : null;

    console.log('Received data:', {
      project_idx,
      planner_title,
      planner_description,
      planner_img,
    });

    try {
      const result = await database.query(
        'UPDATE travel_project SET planner_title = $1, planner_description = $2, planner_img = $3 WHERE project_idx = $4',
        [planner_title, planner_description, planner_img, project_idx]
      );
      res.status(201).json({ message: 'Travel data saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// planner 제목 생성
exports.updatePlannerTitle = async (req, res) => {
  const { project_title, project_idx } = req.body;
  console.log(req.body);

  try {
    await database.query(
      'UPDATE travel_project SET project_title = $1 WHERE project_idx = $2',
      [project_title, project_idx]
    );
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
