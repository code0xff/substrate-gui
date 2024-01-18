export class NodeStatus {
  constructor(public on: boolean, public iid: number, public cpuUsage: number, public memory: number, public startTime: number) { }

  public static default(): NodeStatus {
    return new NodeStatus(false, 0, 0.0, 0, 0);
  }
}