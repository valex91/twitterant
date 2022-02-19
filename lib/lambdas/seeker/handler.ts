import { randomInInterval } from './../../utils/entrophy';
import { hasAlreadyBeenSeen, setSeenForThisExecution } from './executionCache';
import { DateTime } from "luxon";
import { twitterClientGenerator } from "../../utils/twitterClientGenerator";
import { RelevantTweetInfo, tweetExplorer } from "./tweetExplorer";

const previousExecution = DateTime.now().minus({ hour: 7, minute: 59 }).set({millisecond: 0}).toUTC().toISO({suppressMilliseconds: true})

export type TweetBatch = { actionsInBatch: number, batch: RelevantTweetInfo[] }

export const seeker = async () => {
    const twittClient = await twitterClientGenerator()

    try {
        const relevantTweetDataBatches: TweetBatch[] = [{ actionsInBatch: 0, batch: [] }]
        const results = await twittClient.v2.search('valorant giveaway -is:retweet -is:reply has:mentions -nft', { start_time: previousExecution, 'tweet.fields': ['author_id'], });

        for await (const tweet of results) {
            const currentBatch = relevantTweetDataBatches[relevantTweetDataBatches.length - 1]
            const analysedTweet = tweetExplorer(tweet)

            if (!hasAlreadyBeenSeen(analysedTweet.id)) {
                if ((currentBatch.actionsInBatch + analysedTweet.actionImpact) > randomInInterval(6, 15)) {
                    relevantTweetDataBatches.push({ actionsInBatch: analysedTweet.actionImpact, batch: [analysedTweet] })
                } else {
                    currentBatch.actionsInBatch = currentBatch.actionsInBatch + analysedTweet.actionImpact
                    currentBatch.batch.push(analysedTweet)
                }
                setSeenForThisExecution(analysedTweet.id)
            }
        }

        return relevantTweetDataBatches
    } catch (e) {
        console.log('Something went wrong in the seeker step', e)
        throw e
    }

}