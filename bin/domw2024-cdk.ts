#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HostedZoneStack } from '../lib/hostedzone-stack';

const app = new cdk.App();
new HostedZoneStack(app, 'Domw2024HostedZone', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
