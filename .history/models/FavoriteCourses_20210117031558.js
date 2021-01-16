const db = require('../utils/db');
const tbName = "favoritecourses";

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
        if (rows.length > 0)
            return rows;
        return null;
    },
    getByUserId: async id => {
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
        return null;
    },
    getByCourseID: async name => {
        const sql = `SELECT * FROM ${tbName} WHERE idcourses = '${name}'`;
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
    getByCatID: async CatID => {
        const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = '${CatID}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
        if (rows.length > 0)
            return rows;
        else return null;
    },

    add: async entity => {
        const sql = `INSERT INTO ${tbName} SET ?`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, entity, (err, result, field) => {
                if (err)
                    reject(err);
                resolve(result.insertId);
            })
        });
        return rows;
    },

    deleteById: async id => {
        const sql = `DELETE FROM ${tbName} WHERE idcourses = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result.affectedRows);
            })
        });
        return rows;
    },
    updateByEntity: async entity => {
        const id = entity['idcourses'];
        const sql = `UPDATE ${tbName} SET ? WHERE idcourses = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, entity, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result.changedRows);
            })
        });
        return rows;
    }
}