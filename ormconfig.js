var dbConfig = {
    synchronize: false,
};

switch (process.env.NODE_ENV) {
    case "development":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "db.sqlite",
            entities: ["**/*.entity.ts"], // Corrected line
        });
        break;
    case "test":
        Object.assign(dbConfig, {
            type: "sqlite",
            database: "test.sqlite",
            entities: ["**/*.entity.ts"], // Corrected line
        });
        break;
    case "production":
        // You might want to add a configuration for production here
        break;
    default:
        throw new Error("unknown environment");
}

export default dbConfig;
