module.exports = (sequelize, Sequelize) => {
const Assignment = sequelize.define('Assignment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    num_of_attemps: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    assignment_created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    assignment_updated: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });
  return Assignment;
}