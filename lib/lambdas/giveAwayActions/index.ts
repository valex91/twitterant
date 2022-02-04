import 'dotenv/config'
import { Construct } from 'constructs';

import { LambdaScaffoldingGen } from "../../utils/lambdaScaffholding"

export class GiveAwayActionsFunction extends LambdaScaffoldingGen {
    constructor(parent: Construct) {
        super(parent, 'GiveawayActions', 'giveAwayAction', {
            TWITTER_API_KEY: process.env.TWITTER_API_KEY, 
            TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET
        })
    }
}