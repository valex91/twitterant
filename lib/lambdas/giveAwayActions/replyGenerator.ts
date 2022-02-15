import { twitterClientGenerator } from "../../utils/twitterClientGenerator"

export const replyGenerator = () => 'time to check this out bois @VKolima @ValorantVale'

// /twitterant/access/secret	
// /twitterant/access/token	
// /twitterant/consumer/key	
// /twitterant/consumer/secret	
// /twitterant/user/id

const test = async () => {
    const twittClient = await twitterClientGenerator()
    twittClient.v2.tweet(replyGenerator())
}

test().then(console.log, console.log)