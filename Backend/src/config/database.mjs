import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "bhkogitpbj5of2icgujp",
    process.env.DB_USER || "ux8ljgynhhz67oae",
    process.env.DB_PASS || "28ycPAsQMTeF1UfMHP2W",
    {
        host: process.env.DB_HOST || "bhkogitpbj5of2icgujp-mysql.services.clever-cloud.com",
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize;