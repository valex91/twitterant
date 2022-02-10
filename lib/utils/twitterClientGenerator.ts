import { TwitterApi } from "twitter-api-v2";

const tweetInstance = new TwitterApi({appKey: process.env.TWITTER_API_KEY!, appSecret: process.env.TWITTER_API_KEY_SECRET!});
export const twitterClientGenerator = async() => {
    try {
       
        const twittClient = await tweetInstance.appLogin();
         return twittClient
    } catch (e) {
        console.log('something went wrong generating the twitter client', e)
        throw e
    }
}