//user model

module.exports = (sequelize, DataTypes, types) => {
  const Employees = sequelize.define(
    'all_employees',
    {
      emp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_role: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: types,
          // This is the column name of the referenced model
          key: 'role_id',
        },
      },
    },
    { timestamps: true }
  );
  return Employees;
};
