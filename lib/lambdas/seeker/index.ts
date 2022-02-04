import 'dotenv/config'
import { Construct } from 'constructs';

import { LambdaScaffoldingGen } from "../../utils/lambdaScaffholding"

export class SeekerFunction extends LambdaScaffoldingGen {
    constructor(parent: Construct) {
        super(parent, 'SeekerLambda', 'seeker', {TWITTER_API_KEY: process.env.TWITTER_API_KEY, TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET})
    }
}