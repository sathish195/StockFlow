
// const { Sequelize } = require("sequelize");
// require("dotenv").config();
// // const sequelize = new Sequelize(
    
// //     process.env.DB_NAME,
// //     process.env.DB_USER,
// //     process.env.DB_PASS,
// //     {
// //       host: process.env.DB_HOST,
// //       port: process.env.DB_PORT,
// //       dialect: "postgres",
// //       logging: false,
// //     }
// // );

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   dialectOptions: {
//     ssl: { require: true, rejectUnauthorized: false }
//   }
// });

// // connect immediately
// sequelize.authenticate()
//   .then(() => {
//     console.log("✅ DB Connected");
//   })
//   .catch((err) => {
//     console.error("❌ DB Error:", err);
//   });

// module.exports = sequelize;


const { Sequelize } = require("sequelize");
require("dotenv").config();
console.log("Connecting to DB with URL:", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

sequelize.authenticate()
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

module.exports = sequelize;