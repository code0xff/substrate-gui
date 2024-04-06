export class MinerStats {
  constructor(public local: number, public network: number) { }

  public static default(): MinerStats {
    return new MinerStats(0, 0);
  }

  public update(log: string): MinerStats {
    if (log.includes('Local Hashrate: ')) {
      const index = log.indexOf('Local Hashrate: ') + 'Local Hashrate: '.length;
      this.local = parseInt(log.slice(index, log.indexOf(' H/s')));
    }
    if (log.includes('Network Hashrate: ')) {
      const index = log.indexOf('Network Hashrate: ') + 'Network Hashrate: '.length;
      this.network = parseInt(log.slice(index, log.indexOf(' H/s', index)));
    }
    return this;
  }

  public clear(): MinerStats {
    this.local = 0;
    this.network = 0;
    return this;
  }
}