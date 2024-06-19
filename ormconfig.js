const { ConfigService } = require("@nestjs/config");
const config = new ConfigService();

var dbConfig = {
    synchronize: false,
    migrations: ["migrations/*.js"],
    cli: {
        migrationsDir: "migrations",
    },
};

switch (process.env.NODE_ENV) {
    case "development":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "db.sqlite",
            entities: ["**/*.entity.js"],
        });
        break;
    case "test":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "test.sqlite",
            entities: ["**/*.entity.ts"],
            migrationsRun: true,
        });
        break;
    case "production":
        Object.assign(dbConfig, {
            type: "postgres",
            host: config.get("Hostname"),
            port: 5432,
            username: config.get("Username"),
            password: config.get("Password"),
            database: config.get("Database"),
            entities: ["**/*.entity.js"],
            synchronize: true,
            logging: false,
            extra: {
                ssl: {
                    rejectUnauthorized: false, // Set to true if you want to enforce certificate validation
                },
            },
            // Dynamically select the connection string based on the environment
            url: config.get("External_Database_URL"),
        });
        break;
    default:
        throw new Error("unknown environment");
}

module.exports = dbConfig;
