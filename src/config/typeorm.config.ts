import { join } from "path";

console.log(`Running on <${process.env.NODE_ENV}> Mode:\n`);

const dbConfig = {};

switch (process.env.NODE_ENV) {
    case "development":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "db.sqlite",
            entities: [join(__dirname, "../**/*.entity{.ts,.js}")],
            synchronize: false,
        });
        break;
    case "test":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "test.sqlite",
            entities: [join(__dirname, "../**/*.entity{.ts,.js}")],
            synchronize: true,
        });
        break;
    case "production":
        // Add your production configuration here
        break;
    default:
        throw new Error("unknown environment");
}

export default dbConfig;
