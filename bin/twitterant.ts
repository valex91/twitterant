#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TwitterantStack } from '../lib/twitterant-stack';

const app = new cdk.App();
new TwitterantStack(app, 'TwitterantStack', {
});