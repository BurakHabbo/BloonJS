import mysql = require('mysql');
import ConfigurationManager from '../Core/ConfigurationManager';
import Emulator from '../Emulator';

export default class Database {
    private config: ConfigurationManager;
    private pool: mysql.IPool;

    public constructor(config: ConfigurationManager) {
        this.config = config;

        this.pool = mysql.createPool({
            connectionLimit: this.config.getInt('db.poolsize', 10),
            host: this.config.getValue('db.hostname'),
            user: this.config.getValue('db.username'),
            password: this.config.getValue('db.password'),
            database: this.config.getValue('db.database')
        });

        this.pool.getConnection(function(err: mysql.IError, connection: mysql.IConnection) {
            if (err) {
                Emulator.getLogging().logErrorLine('[DATABASE] Failed to connect to the database. Shutting down...');
            } else {
                connection.release();
            }
        });

        Emulator.getLogging().logStart('Database -> Connected!');
    }

    public getPool(): mysql.IPool {
        return this.pool;
    }
}
