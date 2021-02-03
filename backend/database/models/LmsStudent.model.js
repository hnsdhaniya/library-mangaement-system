const {v4: uuidv4} = require('uuid');
const { lmsrole } = require('.');

module.exports = (sequelize, Sequelize) => {
    const LmsStudent = sequelize.define('lmsstudent', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
          type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
          },
                    
        email: {
          type: Sequelize.STRING
        },
        contactnumber:{
          type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
    },
      state:{
        type: Sequelize.STRING
    },
      city:{
        type: Sequelize.STRING
    },
      pinCode:{
        type: Sequelize.STRING
    },
        password: {
          type: Sequelize.STRING
        },
        lmsrole:{
            type:Sequelize.INTEGER,
          }

    });

    LmsStudent.beforeCreate(lmsstudent => lmsstudent.id = uuidv4());
	LmsStudent.sync()
  	.then(() => console.log('Lms Student table created successfully'))
  	.catch(err => console.log('Did you enter wrong Lms Student table in database credentials?'));
	return LmsStudent;
}
