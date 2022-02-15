import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"

type ScaffoldingProps = {
    entry: string,
    handler: string,
}
export class LambdaScaffoldingGen extends NodejsFunction {
    constructor(parent: Construct, id: string, props: ScaffoldingProps, env: Record<string, string>) {
        super(parent,id, {
            entry: props.entry,
            handler: props.handler,
            environment: env
        })
    }
}