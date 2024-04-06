import { ApiPromise } from '@polkadot/api';
import type { Header } from '@polkadot/types/interfaces';

export class ChainInfo {
  constructor(public blockNumber: string, public blockHash: string, public blockTime: string, public prevBlockTime: string, public diff: string, public prevDiff: string, public totalIssued: string) { }

  public static default(): ChainInfo {
    return new ChainInfo('0', '-', '-', '-', '-', '-', '0');
  }

  public async update(api: ApiPromise, header: Header) {
    if (!api || !api.isConnected) {
      throw new Error(`Api is not connected`);
    }
    const number = header.number.toNumber();
    this.blockNumber = number.toLocaleString();

    const parent = header.parentHash.toHex();
    const hash = header.hash.toHex();

    this.blockHash = hash;
    this.totalIssued = await ChainInfo.totalIssued(api, hash);

    if (number > 1) {
      this.prevDiff = this.diff;
    }
    this.diff = await ChainInfo.difficulty(api, hash);

    if (number > 2) {
      this.prevBlockTime = this.blockTime;
    }
    if (number > 1) {
      this.blockTime = await ChainInfo.blocktime(api, parent, hash);
    }
    return this;
  }

  public static compressHash(hash: string): string {
    return hash.length === 66 ? hash.slice(0, 6) + '...' + hash.slice(62, 66) : hash;
  }

  public static async totalIssued(api: ApiPromise, hash: string): Promise<string> {
    return (BigInt((await (await api.at(hash)).query.balances.totalIssuance()).toString()) / 1_000_000_000_000_000_000n).toLocaleString();
  }

  public static async difficulty(api: ApiPromise, hash: string): Promise<string> {
    return BigInt(
      (await (await api.at(hash)).query.difficultyAdjustment.difficulty()).toString()
    ).toLocaleString();
  }

  public static async blocktime(api: ApiPromise, parent: string, hash: string): Promise<string> {
    const parentTimestamp = (await (await api.at(parent)).query.timestamp.now()).toString();
    const timestamp = (await (await api.at(hash)).query.timestamp.now()).toString();

    return Math.floor(
      (parseInt(timestamp) - parseInt(parentTimestamp)) / 1000
    ).toLocaleString();
  }
}
