import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { join } from "path"
import { Duration } from 'aws-cdk-lib';

export class LambdaScaffoldingGen extends NodejsFunction {
    constructor(parent: Construct, id: string, handlerName: string, env = {}) {
        super(parent,id, {
            entry: join(__dirname, './handler.ts'),
            handler: handlerName,
            environment: env,
            timeout: Duration.minutes(1)
        })
    }
}