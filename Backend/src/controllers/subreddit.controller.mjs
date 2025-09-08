import axios from "axios";
import Subreddit from "../models/subreddit.model.mjs";

export const updateSubreddits = async (req, res) => {
    try {
        const responde = await axios.get("https://www.reddit.com/subreddits.json");

        const subreddits = responde.data.data.children.map((child => child.data));

        await Subreddit.destroy({ where: {} });

        for (const s of subreddits) {
            await Subreddit.create({
                reddit_id: s.id,
                title: s.title,
                display_name_prefixed: s.display_name_prefixed,
                subscribers: s.subscribers,
                name: s.name,
                submit_text: s.submit_text,
                created: s.created,
                subreddit_type: s.subreddit_type,
                over18: s.over18,
                description: s.public_description
            });
        }

        res.json({message: "Subreddits actualizados correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar subreddits", error: error.message });
    }
};

export const getSubreddits = async (req, res) => {
    try {
        const subreddits = await Subreddit.findAll();
        res.json(subreddits);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener subreddits", error: error.message });
    }
}

export const getSubredditById = async (req, res) => {
    try {
        const { id } = req.params;
        const subreddit = await Subreddit.findByPk(id);

        if (!subreddit) {
            return res.status(404).json({ message: "Subreddit no encontrado" });
        }

        res.json(subreddit);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener subreddit por ID", error: error.message });
    }
}