import { twitterClientGenerator } from "../../utils/twitterClientGenerator";
import { TweetBatch } from "../seeker/handler";
import { giveAwayActions } from "./giveAwayActions";

export const giveAwayAction = async(state: TweetBatch) => {
    const twittClient = await twitterClientGenerator()
    const me = await twittClient.v2.me()

    await Promise.allSettled(state.batch.map((rtwt) => giveAwayActions(rtwt, twittClient, me.data.id)))
}