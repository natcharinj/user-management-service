import DB from '../database';

async function initializeDatabaseWithHandleException(databaseType, connectDatabase) {
  try {
    await connectDatabase();
    console.log(`Connection to ${databaseType} successful`)
  } catch (error) {
    console.log(`Can\'t connect to ${databaseType}}`, error);
  }
};

export default function initializeDatabase() {
  initializeDatabaseWithHandleException(
    'MySQL',
    () => DB.MySQL.sequelize.sync({ force: false })
  );
}
