import Sequelize from "sequelize";
import config from "../../config";
import getSchemas from "./schemas";
export const sequelize = new Sequelize(
	config.database.name,
	config.database.username,
	config.database.password,
	{
		host: config.database.host,
		port: config.database.port,
		dialect: config.database.driver,
		define: {
			paranoid: true,
			charset: 'utf8mb4'
		},
		logging: false,
		...config.database.sslConnection
	}
);

export const Op = sequelize.Op;

export const Schemas = getSchemas(sequelize);