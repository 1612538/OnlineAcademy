const db = require('../utils/db');
const tbName = "user";

module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        return rows;
    },
    getByUsername: async username => {
        const sql = `SELECT * FROM ${tbName} WHERE username = '${username}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows[0];
        return null;
    },
    getById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE iduser = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows[0];
        else return null;
    },
}