import { IAspect, Tokenization, Annotations } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class BucketEncryptionKeyAspect implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnBucket) {
      // Is the current node being "visited*" a bucket?  (*remember "Visitor Pattern" from the slide deck?)

      // console.log('Encryption Details: ', JSON.stringify(node.bucketEncryption));
      if (!node.bucketEncryption) {
        Annotations.of(node).addError('Bucket encryption is required');
      }

      // Yeah, this is really, REALLY ugly and probably a bad choice for demoing to an audience that's new to Aspects. (Sorry, everybody)
      if (node.bucketEncryption
        && (!Tokenization.isResolvable(node.bucketEncryption) && 
          (!node.bucketEncryption.serverSideEncryptionConfiguration || 
              (node.bucketEncryption.serverSideEncryptionConfiguration && !Tokenization.isResolvable(node.bucketEncryption.serverSideEncryptionConfiguration) && 
                  (node.bucketEncryption.serverSideEncryptionConfiguration.length === 0 || (
                    (node.bucketEncryption.serverSideEncryptionConfiguration[0] as CfnBucket.ServerSideEncryptionRuleProperty).serverSideEncryptionByDefault === undefined ||
                    (
                        !Tokenization.isResolvable((node.bucketEncryption.serverSideEncryptionConfiguration[0] as CfnBucket.ServerSideEncryptionRuleProperty).serverSideEncryptionByDefault) && ((node.bucketEncryption.serverSideEncryptionConfiguration[0] as CfnBucket.ServerSideEncryptionRuleProperty).serverSideEncryptionByDefault as CfnBucket.ServerSideEncryptionByDefaultProperty).kmsMasterKeyId === undefined
                    )
                  ))
              )
          )
        )
      ) {
        Annotations.of(node).addError('MyOrg requires usage of a CMK for bucket encryption.');
      }
    }
  }
}
