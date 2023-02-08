//user model
module.exports = (sequelize, DataTypes, employees) => {
  const Logins = sequelize.define(
    'employee_logins',
    {
      login_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      session_id: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: employees,
          key: 'emp_id',
        },
      },
    },

    { timestamps: true }
  );
  return Logins;
};
