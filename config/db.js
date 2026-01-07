const sql = require("mssql/msnodesqlv8");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  driver: "ODBC Driver 18 for SQL Server",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_INSTANCE
  }
};

let pool;

async function connectDB() {
  try {
    pool = await sql.connect(config);
    console.log("MSSQL connected using Windows Authentication");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
}

function getPool() {
  if (!pool) {
    throw new Error("DB not connected yet");
  }
  return pool;
}

module.exports = {
  connectDB,
  getPool
};
