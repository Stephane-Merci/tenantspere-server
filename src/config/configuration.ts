export default () => ({
    port: parseInt(process.env.SERVER_PORT, 10),
    database: process.env.MONGO_DB_URI
})