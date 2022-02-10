import { TwitterApi, UsersV2Result } from "twitter-api-v2";
import { RelevantTweetInfo } from "../seeker/tweetExplorer";

export const giveAwayActions = async (tweetInfo: RelevantTweetInfo, client: TwitterApi, myId: string) => {
    let users: UsersV2Result
    
    await client.v2.follow(myId,tweetInfo.author!)
    
    if(tweetInfo.toFollow) {
         users = await client.v2.usersByUsernames(tweetInfo.toFollow);
        await Promise.all(users.data.map(user => user.id).map(toFollow => client.v2.follow(myId, toFollow)))  
    }
    

    await client.v2.retweet(myId, tweetInfo.id)
    await client.v2.reply('generateRandomPayload', tweetInfo.id)
}