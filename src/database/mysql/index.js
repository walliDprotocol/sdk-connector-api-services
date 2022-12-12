const mysql = require("mysql2/promise");

module.exports = function () {
  console.log("constructor .....  ");

  self = this;
  this.isConnect = false;
  this.connection;

  this.connect = async function () {
    try {
      console.log("MYSQL CONNECT ", process.env.MYSQL_CONNECT);
      if (process.env.MYSQL_CONNECT === "false" || !process.env.MYSQL_HOST) {
        console.error("NO MYSQL HOST. ADD HOST OR DEACTIVE MYSQL BD");
        return;
      }

      self.connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
      console.log("MYSQL connected with success ");
      self.isConnect = true;
    } catch (ex) {
      console.error("Error connecting with MYSQL ", ex);
      throw ex;
    }
  };

  this.query = async function (query) {
    try {
      console.log("**** mysql query ****** ");
      if (!self.isConnect) {
        await self.connect();
      }

      if (!self.isConnect) return;

      const [rows, fields] = await self.connection.execute(query);
      console.log("Query rows : ", rows.affectedRows);
      // console.log('Query fields : ', fields );
      return rows;
    } catch (ex) {
      console.log("Error query bd");
      throw ex;
    }
  };
};

// https://www.npmjs.com/package/mysql2
// var sql = "INSERT INTO user_wallet (wa) VALUES ('Benfica 5')";
// let run = async function()
// {
//     let a = new Mysql()
//     await a.connect()
//     // await a.query('SELECT * FROM user_wallet' );
//     await a.query(sql );
//     console.log('b ' )

// }
// run()

// module.exports = function(s)
// {
//     console.log('&&&&&&&&&&&&&&&&& LOAD MYSQL  ')
//     const useMySql = process.env.MYSQL_CONNECT === 'true' || false;
//     console.log('MYSQL FALG ',  useMySql)
//     if(useMySql){
//         console.log('Loading mysql drivrer');
//         return new Mysql()
//     }
//     else{
//         return {}
//     }
// }
