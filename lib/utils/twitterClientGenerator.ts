import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config'

export const twitterClientGenerator = async() => {
    try {
        const tweetInstance = new TwitterApi({appKey: process.env.TWITTER_API_KEY!, appSecret: process.env.TWITTER_API_KEY_SECRET!,accessToken: process.env.ACCESS_TOKEN!, accessSecret: process.env.ACCESS_SECRET});

        // const twittClient = await tweetInstance.appLogin();
         return tweetInstance
    } catch (e) {
        console.log('something went wrong generating the twitter client', e)
        throw e
    }
}