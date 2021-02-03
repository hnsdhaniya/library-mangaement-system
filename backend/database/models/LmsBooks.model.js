
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, Sequelize) => {
    const LmsBooks = sequelize.define('lmsbooks', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            
        },
        bookname: {
            type: Sequelize.STRING
          },
          author: {
            type: Sequelize.STRING
          },
          department: {
            type: Sequelize.STRING
          },
          rating: {
            type: Sequelize.INTEGER
          },
          published_date:{
            type: Sequelize.DATEONLY
         },
          lmsusersId: {
            type: Sequelize.STRING
          }

    });

    LmsBooks.beforeCreate(lmsbooks => lmsbooks.id = uuidv4());
	LmsBooks.sync()
  	.then(() => console.log('lmsBooks table created successfully'))
  	.catch(err => console.log('Did you enter wrong LmsBooks table in database credentials?'));
	return LmsBooks;
}