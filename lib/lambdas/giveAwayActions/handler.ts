import { DateTime } from "luxon";
import { randomInInterval } from "../../utils/entrophy";
import { twitterClientGenerator } from "../../utils/twitterClientGenerator";
import { TweetBatch } from "../seeker/handler";
import { giveAwayActions } from "./giveAwayActions";

export const giveAwayAction = async (state: TweetBatch) => {
    const twittClient = await twitterClientGenerator()

    const r = await Promise.allSettled(state.batch.map((rtwt) => giveAwayActions(rtwt, twittClient, process.env.USER_ID!)))


    const now = DateTime.now()

    return {
        triggerTime: now.plus({ minutes: randomInInterval(16, 30) }).set({millisecond: 0}).toUTC().toISO({suppressMilliseconds: true})
    }
}