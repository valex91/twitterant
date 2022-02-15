import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Duration } from 'aws-cdk-lib';

type ScaffoldingProps = {
    entry: string,
    handler: string,
}
export class LambdaScaffoldingGen extends NodejsFunction {
    constructor(parent: Construct, id: string, props: ScaffoldingProps, env: Record<string, string>) {
        super(parent,id, {
            entry: props.entry,
            handler: props.handler,
            environment: env,
            timeout: Duration.minutes(2)
        })
    }
}