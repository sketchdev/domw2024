import { Aspects, DefaultStackSynthesizer, DefaultStackSynthesizerProps, Stack } from "aws-cdk-lib";
import { BucketEncryptionKeyAspect } from "../aspects/bucket-encryption-key-aspect";

export class MyOrgSynthesizer extends DefaultStackSynthesizer {
  constructor(props?: DefaultStackSynthesizerProps) {
    super({
      // Name of the S3 bucket for file assets
      fileAssetsBucketName: 'cdk-${Qualifier}-assets-${AWS::AccountId}-${AWS::Region}',
      bucketPrefix: 'myorg-cdk-',

      // ARN of the role assumed by the CLI and Pipeline to deploy here
      deployRoleArn: 'arn:${AWS::Partition}:iam::${AWS::AccountId}:role/MyOrgCdkCustomizations-${Qualifier}-deployer-${AWS::Region}',
      deployRoleExternalId: 'SOMETHING_ORG_SPECIFIC1',

      // ARN of the role used for file asset publishing (assumed from the CLI role)
      fileAssetPublishingRoleArn: 'arn:${AWS::Partition}:iam::${AWS::AccountId}:role/MyOrgCdkCustomizations-${Qualifier}-fpr-${AWS::Region}',
      fileAssetPublishingExternalId: 'SOMETHING_ORG_SPECIFIC2',

      // ARN of the role passed to CloudFormation to execute the deployments
      cloudFormationExecutionRole: 'arn:${AWS::Partition}:iam::${AWS::AccountId}:role/MyOrgCdkCustomizations-${Qualifier}-cfn-exec-${AWS::Region}',

      // ARN of the role used to look up context information in an environment
      lookupRoleArn: 'arn:${AWS::Partition}:iam::${AWS::AccountId}:role/MyOrgCdkCustomizations-${Qualifier}-lookup-${AWS::Region}',
      lookupRoleExternalId: 'SOMETHING_ORG_SPECIFIC3',
    });
  }

  public bind(stack: Stack) : void {
    super.bind(stack);

    Aspects.of(stack).add(new BucketEncryptionKeyAspect());
  }
}
