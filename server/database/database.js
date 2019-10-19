const Sequelize = require( "sequelize" )
const Model = Sequelize.Model;


console.log( "... trying to connect .." )

const database = new Sequelize( "tbc", "valeriesharp", " ", {
  host: "localhost",
  dialect: "postgres",
} )

database.authenticate().then( () => {
  console.log( "Connection has been established successfully." )
  const User = database .define('directory', {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    // options
  });
} ).catch( err => {
  console.error( "Unable to connect to the database:", err )
} )
// const directory = database.define('directory', {
// firstName: Sequelize.STRING
  // lastName: DataTypes.string,
  // pronouns: DataTypes.string,
  // img: DataTypes.string,
  // title: DataTypes.string,
  // bio: DataTypes.text,
  // status: DataTypes.string,
  // zip: DataTypes.string,
  // state: DataTypes.string,
  // localChapter: DataTypes.string,
  // email: Sequelize.INTEGER,
// })
