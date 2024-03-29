#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HostedZoneStack } from '../lib/hostedzone-stack';
import { AspectDemoStack } from '../lib/aspect-demo-stack';
import { MyOrgSynthesizer } from '../lib/enterprise-shared/constructs/myorg-synthesizer';
// import { NetworkStack } from '@sketchdev/cdk';

const app = new cdk.App();
const myOrgSynthesizer = new MyOrgSynthesizer();

new HostedZoneStack(app, 'Domw2024HostedZone', {
  synthesizer: myOrgSynthesizer,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

// new NetworkStack(app, 'Domw2024NetworkVpc', {
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
// });

new AspectDemoStack(app, 'AspectStack', {
  // chapter-advanced
  // synthesizer: myOrgSynthesizer,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
