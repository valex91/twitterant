import { replyGenerator } from './replyGenerator';
import { TwitterApi } from "twitter-api-v2";
import { RelevantTweetInfo } from "../seeker/tweetExplorer";
import { actionBetween10And20, randomIndex, randomInInterval } from '../../utils/entrophy';
import { DateTime } from 'luxon';

export const giveAwayActions = async (tweetInfo: RelevantTweetInfo, client: TwitterApi, myId: string) => {
    const necessaryActions: Array<() => Promise<unknown>> = [];
    necessaryActions.push(() => actionBetween10And20(() => client.v2.follow(myId, tweetInfo.author!)))

    if (tweetInfo.toFollow) {
        necessaryActions.push(
            () => client.v2.usersByUsernames(tweetInfo.toFollow!)
                .then(
                    (res) => res.data.map(user => user.id).map(toFollow => actionBetween10And20(() => client.v2.follow(myId, toFollow)))
                )
        );
    }



    necessaryActions.push(
        () => actionBetween10And20(() => client.v2.retweet(myId, tweetInfo.id)),
        () => actionBetween10And20(() => client.v2.like(myId, tweetInfo.id)),
        () => actionBetween10And20(() => client.v2.reply(replyGenerator(), tweetInfo.id))
    )

    const gate: Promise<unknown>[] = []

    while(necessaryActions.length) {
        gate.push(necessaryActions.splice(randomIndex(necessaryActions),1)[0]())
    }


    await Promise.all(gate)
}