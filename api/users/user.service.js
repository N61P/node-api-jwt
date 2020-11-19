const pool = require('../../config/database');

module.exports = {
    create: (data, callback)=>{
        pool.query(
            'SELECT * FROM tbl_users WHERE email = ?',
            [data.email],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else if(result.length){
                    return callback(null, true);
                }
                else{
                    pool.query(
                        `INSERT INTO tbl_users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
                        [data.first_name, data.last_name, data.email, data.password],
                        (error, result, fields)=>{
                            if(error){
                                return callback(error);
                            }else{
                                return callback(null, null, result);
                            }
                        }
                    )
                }
            }
        )
    },
    getAll: (callback)=>{
        pool.query(
            `select first_name, last_name, email from tbl_users`,
            [],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else{
                    return callback(null, result);
                }
            }
        )
    },
    getById: (id, callback)=>{
        pool.query(
            `select first_name, last_name, email from tbl_users where id = ?`,
            [id],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else{
                    return callback(null, result[0]);
                }
            }
        )
    },
    updateById: (data, callback)=>{
        pool.query(
            `select * from tbl_users where email=? and id<>?`,
            [data.email, data.id],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else if(result.length){
                    return callback(null, true);
                }
                else{
                    pool.query(
                        `update tbl_users set first_name=?, last_name=?, email=?, password=? where id=?`,
                        [data.first_name, data.last_name, data.email, data.password, data.id],
                        (error, result, fields)=>{
                            if(error){
                                return callback(error);
                            }
                            else{
                                return callback(null, null, result);
                            }
                        }
                    )
                }
            }
        )
    },
    deleteById: (data, callback)=>{
        pool.query(
            `delete from tbl_users where id=?`,
            [data.id],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else{
                    return callback(null, result);
                }
            }
        )
    },
    getUserByEmail: (email, callback)=>{
        pool.query(
            `select id, first_name, last_name, email, password from tbl_users where email= ?`,
            [email],
            (error, result, fields)=>{
                if(error){
                    return callback(error);
                }
                else{
                    return callback(null, result[0]);
                }
            }
        )
    }
}
