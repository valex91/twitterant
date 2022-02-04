import { SeekerFunction } from './lambdas/seeker/index';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { StateMachine, Map, JsonPath, Pass, Wait, WaitTime } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { GiveAwayActionsFunction } from './lambdas/giveAwayActions';
import { LambdaInvoke, } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets';

export class TwitterantStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const map = new Map(this, 'Map State', {
      maxConcurrency: 1
    });

    const seeker = new SeekerFunction(this)
    const giveAwayActions = new GiveAwayActionsFunction(this)

    const seekerTask = new LambdaInvoke(this, 'seekerTask', { lambdaFunction: seeker })

    const giveAwayTask = new LambdaInvoke(this, 'giveAwayTask', { lambdaFunction: giveAwayActions })
      .next(new Wait(this, 'twitterTimeout',
        {
          time: WaitTime.duration(Duration.seconds(900)),
          comment: 'Twitter api staggering'
        }
      ))

    const definition = seekerTask.next(map.iterator(giveAwayTask).next(new Pass(this, 'done')))

    const twitterantStateMachine = new StateMachine(this, 'StateMachine', {
      definition,
    });

    const taskTarget = new SfnStateMachine(twitterantStateMachine)

    new Rule(this, 'FetchEvery6Hr', {
      schedule: Schedule.rate(Duration.hours(6)),
      targets: [taskTarget],
    });
  }
}
