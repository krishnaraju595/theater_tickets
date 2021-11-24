require("pg").defaults.parseInt8 = true;
const Sequelize = require('sequelize')
const TicketModel = require("./dbModels/TicketModel");

console.log(process.env.PGDATABASE+"-"+ process.env.PGUSER);
const sequelize = new Sequelize(
  "defaultdb",
  "demouser",
  "12345",
  {
    host: "db",
    port: 5432,
    dialect: 'postgres',
  },
)


const Ticket = TicketModel(sequelize, Sequelize);
const Models = {
  Ticket,
  sequelize
}
const connection = {};

module.exports = async () => {
  if (connection.isConnected) {
    console.log("=> Using existing connection.");
    return Models;
  }

  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log("=> Created a new connection.");
  return Models;
};
