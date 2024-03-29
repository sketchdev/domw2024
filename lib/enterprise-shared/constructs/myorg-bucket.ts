import { Aspects, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Key } from "aws-cdk-lib/aws-kms";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { BucketEncryptionKeyAspect } from "../aspects/bucket-encryption-key-aspect";
import { MyOrgStack } from "./myorg-stack";

export interface MyOrgBucketProps {
  readonly bucketname?: string
}

export class MyOrgBucket extends Construct {
  constructor(scope: Construct, id: string, props?: MyOrgBucketProps) {
    super(scope, id);

    const cmk = new Key(this, 'CustomKey', {
      alias: 'domw2024-myorg-bucket-key',
      removalPolicy: RemovalPolicy.DESTROY,  // for DOMW2024 purposes (probably not an ideal case for normal use)
    });

    new Bucket(this, 'MyOrgBucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: props?.bucketname,
      encryption: BucketEncryption.KMS,
      encryptionKey: cmk,
      removalPolicy: RemovalPolicy.DESTROY,  // for DOMW2024 purposes (probably not an ideal case for normal use)
    });

    // chapter3
    // Aspects.of(Stack.of(this)).add(new BucketEncryptionKeyAspect());

    // if(!(Stack.of(this) instanceof MyOrgStack)) {
    //   throw new Error('You need to use the MyOrg stack when using CDK.');
    // }
  }
}
