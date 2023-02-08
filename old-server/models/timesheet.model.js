//timesheet
module.exports = (sequelize, DataTypes, employees) => {
  const Timesheet = sequelize.define(
    'timesheet',
    {
      entry_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clock_in: {
        type: DataTypes.DATE,
      },
      clock_out: {
        type: DataTypes.DATE,
      },
      hours: {
        type: DataTypes.INTEGER,
      },
      week: {
        type: DataTypes.INTEGER,
      },
      day: {
        type: DataTypes.INTEGER,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: employees,
          // This is the column name of the referenced model
          key: 'emp_id',
        },
      },
    },
    { timestamps: true }
  );
  return Timesheet;
};
