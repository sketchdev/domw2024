import { Aspects, RemovalPolicy, ResourceEnvironment, Stack, StackProps } from "aws-cdk-lib";
import { ClientVpnEndpoint, ClientVpnEndpointOptions, EnableVpnGatewayOptions, FlowLog, FlowLogOptions, GatewayVpcEndpoint, GatewayVpcEndpointOptions, ISubnet, IVpc, InterfaceVpcEndpoint, InterfaceVpcEndpointOptions, SelectedSubnets, SubnetSelection, VpnConnection, VpnConnectionOptions } from "aws-cdk-lib/aws-ec2";
import { Construct, IDependable, Node } from "constructs";
import { BucketEncryptionKeyAspect } from "../aspects/bucket-encryption-key-aspect";

export class MyOrgStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    Aspects.of(this).add(new BucketEncryptionKeyAspect());
  }

  public deploymentVpc = () : IVpc => {
    return new FakeVpc('vpc-domw2024-demo');
  };

  public irresistableMyOrgMethod = () : string => {
    return 'No dev team can live without this!';
  };
}









class FakeVpc implements IVpc {
  constructor(vpcId: string) {
    this.vpcId = vpcId;
  }
  vpcId: string;
  vpcArn: string;
  vpcCidrBlock: string;
  publicSubnets: ISubnet[];
  privateSubnets: ISubnet[];
  isolatedSubnets: ISubnet[];
  availabilityZones: string[];
  vpnGatewayId?: string | undefined;
  internetConnectivityEstablished: IDependable;
  selectSubnets(selection?: SubnetSelection | undefined): SelectedSubnets {
    throw new Error("Method not implemented.");
  }
  enableVpnGateway(options: EnableVpnGatewayOptions): void {
    throw new Error("Method not implemented.");
  }
  addVpnConnection(id: string, options: VpnConnectionOptions): VpnConnection {
    throw new Error("Method not implemented.");
  }
  addClientVpnEndpoint(id: string, options: ClientVpnEndpointOptions): ClientVpnEndpoint {
    throw new Error("Method not implemented.");
  }
  addGatewayEndpoint(id: string, options: GatewayVpcEndpointOptions): GatewayVpcEndpoint {
    throw new Error("Method not implemented.");
  }
  addInterfaceEndpoint(id: string, options: InterfaceVpcEndpointOptions): InterfaceVpcEndpoint {
    throw new Error("Method not implemented.");
  }
  addFlowLog(id: string, options?: FlowLogOptions | undefined): FlowLog {
    throw new Error("Method not implemented.");
  }
  stack: Stack;
  env: ResourceEnvironment;
  applyRemovalPolicy(policy: RemovalPolicy): void {
    throw new Error("Method not implemented.");
  }
  node: Node;
}