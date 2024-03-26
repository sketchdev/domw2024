import * as cdk from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export class HostedZoneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HostedZone(this, 'R53HostedZone', {
      zoneName: 'domw2024.sketchdev.io',
      comment: 'Demo hosted zone for DevOps Midwest 2024',
    });
  }
}
