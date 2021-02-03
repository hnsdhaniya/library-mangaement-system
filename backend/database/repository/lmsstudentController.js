const db = require('../models');
const LmsStudent = db.lmsstudent;
var bcrypt = require('bcryptjs');

exports.createLmsStudent = (req, res) => {
  LmsStudent.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        password: req.body.password,
        lmsrole: req.body.lmsrole,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        pinCode: req.body.pinCode
    }).then(() => {
        res.json({
            success: true,
            message: "Student added successfully!"
          });
    }).catch(err => {
        res.status(500).json({
          success: false,
          message: err
        });
      });
}

exports.getLmsStudents = (req, res) => {
  LmsStudent.findAll().then(message => {
  
    if (Object.keys(message).length !== 0) {
      res.status(200).send(message);
    }
    else {
      res.status(200).send({ statue: 204, message: "No Data Found" });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving message."
    });
  });
}

exports.updateLmsStudent = (req, res) => {
  
  LmsStudent.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
};

exports.deleteLmsStudent = (req, res) => {
  
  LmsStudent.destroy({
    where: { id: req.params.id }
  })
    .then(lmsStud => {
      if (lmsStud == 1) {
        res.send({
          message: lmsStud.username + " was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
};

// Login Part


exports.login = (req, res) => {
	LmsStudent.findOne({
		where: {
			username: req.body.username
		}
	}).then(stud => {
		if (!stud) {
			return res.status(200).send({ auth: false,status: 400, accessToken: null, reason: "Invalid Student Name!" });
		}
		
		
		/* var passwordIsValid = bcrypt.compareSync(req.body.password, stud.password);
		if (!passwordIsValid) {
			return res.status(200).send({ auth: false, status: 401, accessToken: null, reason: "Invalid Password!" });
		} */
		res.status(200).send({ 
      auth: true,
      status: 200,
      IsAdmin: stud.lmsrole === 1 ? true : false , 
      username:stud.username      
    });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

// Check duplicate

exports.checkDuplicateStudentName = (req, res, next) => {

  LmsStudent.findOne({ 
			where: {
				username: req.body.username,
			} 
		}).then(stud => {
			if(stud){
				
				return res.status(200).json({
					success:false,
					status: 402,
					message:"The entered Username already available."
				})
				//}
			}
			else{
				return res.status(200).json({
					success:true,
					status: 200,
					message:"Success"
				})
			}
		})
	.catch(error =>{ //1st then
		res.status(500).json({
			success:false,
			message: error
		});
	});
}


exports.checkDuplicateStudentContact  = (req, res, next) => {
	LmsStudent.findOne({ 
			where: {
				contactnumber: req.body.contactnumber,
			} 
		}).then(stud => {
			if(stud){
				return res.status(200).json({
					success:false,
					status: 403,
					message:"The entered mobile number already exist for another Student."
				})
			}
			
			return res.status(200).json({
				success:true,
				status: 200,
				message:"Success"
			})

		})
	.catch(error =>{ 
		res.status(500).json({
			success:false,
			message: error
		});
	});
}
