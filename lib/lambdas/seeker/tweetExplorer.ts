import { TweetV2 } from "twitter-api-v2"
import { USERS_REGEX } from "../../const/regexs"

export type RelevantTweetInfo = {
    id: string,
    author?: string,
    toFollow?: string[],
    actionImpact: number
}

export const tweetExplorer = (tweet: TweetV2): RelevantTweetInfo => {
    const { id, text, author_id } = tweet
    const totalToFollow = text.match(USERS_REGEX)?.map(u => u.trim().replace('@', ''))
    const toFollow = [...new Set(totalToFollow)]
    return {
        id,
        author: author_id,
        toFollow,
        actionImpact: (toFollow?.length || 0) + 1 // authorId is 1 unit of impact
    }
}