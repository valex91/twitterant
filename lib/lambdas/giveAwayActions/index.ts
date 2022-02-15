import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { join } from "path"

import { LambdaScaffoldingGen } from "../../utils/lambdaScaffholding"

export class GiveAwayActionsFunction extends LambdaScaffoldingGen {
    constructor(parent: Construct, env: Record<string, string>) {
        super(parent, 'GiveawayActions', {
            entry: join(__dirname, './handler.ts'),
            handler: 'giveAwayAction',
        }, env)
    }
}