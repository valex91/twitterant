import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { join } from "path"

import { LambdaScaffoldingGen } from "../../utils/lambdaScaffholding"

export class SeekerFunction extends LambdaScaffoldingGen {
    constructor(parent: Construct, env: Record<string, string>) {
        super(parent, 'SeekerLambda', {
            entry: join(__dirname, './handler.ts'),
            handler: 'seeker'
        }, env)
    }
}