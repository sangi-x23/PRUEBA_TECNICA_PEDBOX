export interface Subreddit {
    id: string;
    reddit_id: string;
    title: string;
    display_name_prefixed: string;
    suscribers: number;
    name: string;
    submit_text: string;
    created: number;
    subreddit_type: string;
    over18: boolean;
    description: string
}