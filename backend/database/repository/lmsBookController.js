const db = require('../models');
const LmsBooks = db.lmsbooks;


exports.createLmsBooks = (req, res) => {
    LmsBooks.create({
        bookname: req.body.bookname,
        author: req.body.author,
        department: req.body.department,
        rating: req.body.rating,
        published_date: req.body.published_date,
        lmsusersId: req.body.lmsusersId   
      }).then(() => {
          res.json({
              success: true,
              message: "Books added successfully!"
            });
      }).catch(err => {
          res.status(500).json({
            success: false,
            message: err
          });
        });
  }
  
  exports.getLmsBooks = (req, res) => {
    LmsBooks.findAll().then(message => {
    
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
  
  exports.updateLmsBooks = (req, res) => {
    
    LmsBooks.update(req.body, {
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
  
  exports.deleteLmsBooks = (req, res) => {
    
    LmsBooks.destroy({
      where: { id: req.params.id }
    })
      .then(lmsbook => {
        if (lmsbook == 1) {
          res.send({
            message: lmsbook.bookname + " was deleted successfully!"
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
  