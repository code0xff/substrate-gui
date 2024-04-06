export class MinerStats {
  constructor(public local: number, public network: number) { }

  public static default(): MinerStats {
    return new MinerStats(0, 0);
  }

  public clear(): MinerStats {
    this.local = 0;
    this.network = 0;
    return this;
  }
}