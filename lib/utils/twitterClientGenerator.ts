import { TwitterApi } from "twitter-api-v2";

export const twitterClientGenerator = async() => {
    try {
        const tweetInstance = new TwitterApi({appKey: process.env.TWITTER_API_KEY!, appSecret: process.env.TWITTER_API_KEY_SECRET!});
         const twittClient = await tweetInstance.appLogin();

         return twittClient
    } catch (e) {
        console.log('something went wrong generating the twitter client', e)
        throw e
    }
}