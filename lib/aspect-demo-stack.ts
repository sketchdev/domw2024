import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyOrgBucket } from './enterprise-shared/constructs/myorg-bucket';
import { BucketEncryptionKeyAspect } from './enterprise-shared/aspects/bucket-encryption-key-aspect';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Key } from 'aws-cdk-lib/aws-kms';

export class AspectDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const devBucket = new MyOrgBucket(this, 'Domw2024DemoBucket', {
      bucketname: 'domw-loves-cdk',
    });

    // new Bucket(this, 'CustomDeveloperBucket', {
    //   bucketName: 'domw2024-dev-public-bucket',
    //   enforceSSL: true,
    //   publicReadAccess: true,

    //   // encryption: BucketEncryption.KMS,
    //   // encryptionKey: new Key(this, 'custom-bucket-encryption-key'),
    // });

    cdk.Aspects.of(this).add(new BucketEncryptionKeyAspect());
  }
}
