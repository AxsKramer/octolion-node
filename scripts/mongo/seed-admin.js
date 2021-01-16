const bcrypt = require('bcrypt');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const config = require('../../config');

function buildAdminUser(pass) {
  return {
    password: pass,
    usernanme: config.authAdminUsername,
    email: config.authAdminEmail
  };
}

async function hasAdminUser(mongodb) {
  const adminUSer = await mongodb.getAll("users", {
    username: config.authAdminUsername
  })
  return adminUSer && adminUSer.length;
}

async function createAdminUser(mongodb){
  const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
  const userId = await mongodb.createOne("users", buildAdminUser(hashedPassword));
  return userId;
}

async function seedAdmin() {
  try {
    const mongoDB = new MongoLib();
    if(await hasAdminUser(mongoDB)){
      console.log(chalk.yellow("Admin user already exists"));
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(mongoDB);
    console.log(chalk.green("Admin user created with id: ", adminUserId));
    return process.exit(0);
  }
  catch(error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();