const db = require('../utils/db');
const tbName = "courses";

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
    allByView: async() => {
        const sql = `SELECT * FROM ${tbName} ORDER BY views DESC limit 10`;
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
    allByDate: async() => {
        const sql = `SELECT * FROM ${tbName} ORDER BY STR_TO_DATE(lastupdate,'%T %d/%m/%Y') DESC limit 10;`;
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

    allBySubscribe: async() => {
        const sql = `SELECT * FROM ${tbName} ORDER BY subscribes DESC limit 3`;
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

    getById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE idcourses = '${id}'`;
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
    getByTextSearch: async str => {
        const sql1 = `ALTER TABLE ${tbName} ADD FULLTEXT('name');`
        const sql2 = `SELECT * FROM ${tbName} WHERE MATCH('name') AGAINST('${str}');`
        const sql3 = ` ALTER TABLE ${tbName} DROP INDEX 'name';`
        const sql = sql1 + sql2 + sql3;
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
    getByName: async name => {
        const sql = `SELECT * FROM ${tbName} WHERE name = '${name}'`;
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