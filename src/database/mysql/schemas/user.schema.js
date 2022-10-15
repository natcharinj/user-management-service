export default (sequelize, DataTypes) => {
	return sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		lastName: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		email: {
			type: DataTypes.STRING,
			defaultValue: "",
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			defaultValue: "",
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};
