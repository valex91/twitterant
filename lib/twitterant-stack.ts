import { SeekerFunction } from './lambdas/seeker/index';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { StateMachine, Map, JsonPath, Pass, Wait, WaitTime } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { GiveAwayActionsFunction } from './lambdas/giveAwayActions';
import { LambdaInvoke, } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export class TwitterantStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const map = new Map(this, 'Map State', {
      maxConcurrency: 1,
      itemsPath: '$.Payload'
    });

    const env = {
      TWITTER_API_KEY: StringParameter.fromStringParameterName(this, 'consumerKey', '/twitterant/consumer/key').stringValue,
      TWITTER_API_KEY_SECRET: StringParameter.fromStringParameterName(this, 'consumerSecret', '/twitterant/consumer/secret').stringValue,
      ACCESS_TOKEN: StringParameter.fromStringParameterName(this, 'accessToken', '/twitterant/access/token').stringValue,
      ACCESS_SECRET: StringParameter.fromStringParameterName(this, 'accessSecret', '/twitterant/access/secret').stringValue,
      USER_ID: StringParameter.fromStringParameterName(this, 'userIdParam', '/twitterant/user/id').stringValue
    }

    const seeker = new SeekerFunction(this, env)
    const giveAwayActions = new GiveAwayActionsFunction(this, env)

    const seekerTask = new LambdaInvoke(this, 'seekerTask', { lambdaFunction: seeker })

    const giveAwayTask = new LambdaInvoke(this, 'giveAwayTask', { lambdaFunction: giveAwayActions })
      .next(new Wait(this, 'twitterTimeout',
        {
          time: WaitTime.timestampPath('$.Payload.triggerTime'),
          comment: 'Twitter api staggering'
        }
      ))

    const definition = seekerTask.next(map.iterator(giveAwayTask).next(new Pass(this, 'done')))

    const twitterantStateMachine = new StateMachine(this, 'StateMachine', {
      definition,
    }); 

    const taskTarget = new SfnStateMachine(twitterantStateMachine)

    new Rule(this, 'FetchEvery8Hr', {
      schedule: Schedule.rate(Duration.hours(8)),
      targets: [taskTarget],
    });
  }
}
