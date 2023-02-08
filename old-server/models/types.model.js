module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('employee_types', {
    // Model attributes are defined here
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    employee_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Types;
};
