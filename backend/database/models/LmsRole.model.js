module.exports = (sequelize, Sequelize) => {
     const LmsRole = sequelize.define('lmsrole', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },
          name: {
              type: Sequelize.STRING
          },
          active: {
            type:Sequelize.ENUM('1','0'),
            defaultValue: 1
          }
    });

    
    LmsRole.sync({force: true})
		.then(() => {
				LmsRole.create({
				id: 1,
				name: "admin",
				active: 1
			});

			LmsRole.create({     
				id: 2,
				name: "student",
				active: 1
			});
			console.log('LmsRole table created successfully');
		})
		.catch(err => console.log('Did you enter wrong LmsRole table in database credentials?' + err));

	
	return LmsRole;
    
}