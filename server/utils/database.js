import Sequelize from 'sequelize';

import config from './db-config';

let { USERNAME, PASSWORD, DB_NAME, HOST, PORT } = config;

let sequelize = null;
export default {
    start: () => {
        if (sequelize) return new Promise((resolve) => { resolve(sequelize); });
        const seq = new Sequelize(`mysql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`, { logging: false });
        return new Promise((resolve, reject) => {
            seq.authenticate()
                .then(() => {
                    sequelize = seq;
                    resolve(seq);
                })
                .catch((err) => {
                    console.error('Unable to establish the connection', err);
                    reject(err);
                });
        });
    }
};
