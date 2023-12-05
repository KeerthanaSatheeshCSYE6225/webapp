module.exports = (sequelize, Sequelize) => {
  const Submission = sequelize.define(
    "Submission",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        readOnly: true,
      },
      assignment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        readOnly: true,
      },
      submission_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      submission_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        readOnly: true,
      },
      submission_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        readOnly: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: false, // This will prevent Sequelize from adding createdAt and updatedAt
    }
  );

  return Submission;
};
