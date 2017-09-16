import Sequelize from 'sequelize';

export default (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING
    });
};