 import { TwitterApi } from "twitter-api-v2"


export const seeker = async() => {
 
    const consumerClient = new TwitterApi(process.env.TWITTER_API_BEARER!);
    // Obtain app-only client
    // const client = await consumerClient.appLogin();

    try {
        const results = await consumerClient.v1.verifyCredentials() //add time criteria to bound from previous search based on last lambda instance

        return results
    } catch(e) {
        console.log(e)
        throw e
    }
   
}