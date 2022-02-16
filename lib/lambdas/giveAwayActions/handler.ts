import { twitterClientGenerator } from "../../utils/twitterClientGenerator";
import { TweetBatch } from "../seeker/handler";
import { giveAwayActions } from "./giveAwayActions";

export const giveAwayAction = async(state: TweetBatch) => {
    const twittClient = await twitterClientGenerator()

    const r = await Promise.allSettled(state.batch.map((rtwt) => giveAwayActions(rtwt, twittClient, process.env.USER_ID!)))

    return r
}