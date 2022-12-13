const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    fullName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllUsers() {
  const sql = `SELECT * FROM users;`;
  let users = await con.query(sql);
  console.log(users)
}

// Create  User - Registering
async function register(user) {
  let cUser = await getUser(user);
  let nUser = await doesUserExist(user.username);
  if(nUser.length > 0) throw Error("Username already in use");

  const sql = `INSERT INTO users (userName, fullName, password)
    VALUES ("${user.username}", "${user.fullname}", "${user.password}");
  `

  await con.query(sql);
  return await login(user);
}

// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  
  if(!cUser[0]) throw Error("Username not found");
  if(cUser[0].password !== user.password) throw Error("Password incorrect");

  return cUser[0];
}

// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET userName = "${user.username}"
    WHERE userID = ${user.userID}
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userid}
  `
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  let sql;

  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userid}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE userName = "${user.username}"
  `;
  }

  return await con.query(sql);  
}

async function doesUserExist(username) {
  let sql;

  sql = `
  SELECT * FROM users 
    WHERE userName = "${username}"
`;

  let u = await con.query(sql);

  return u;
}

module.exports = { getAllUsers, login, register, editUser, deleteUser};