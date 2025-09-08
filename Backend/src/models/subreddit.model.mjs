import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Subreddit = sequelize.define("Subreddit", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    reddit_id: {type: DataTypes.STRING, unique: true},
    title: {type: DataTypes.STRING},
    display_name_prefixed: {type: DataTypes.STRING},
    subscribers: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    submit_text: {type: DataTypes.TEXT},
    created: {type: DataTypes.INTEGER},
    subreddit_type: {type: DataTypes.STRING},
    over18: {type: DataTypes.BOOLEAN},
    description: {type: DataTypes.TEXT}
}, {
    tableName: 'subreddits',
    timestamps: false
});

export default Subreddit;