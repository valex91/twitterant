import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TwitterantStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     

    const twitterantStateMachine = new StateMachine(this, 'StateMachine', {
      definition,
      timeout: Duration.minutes(5),
    });
  }
}
