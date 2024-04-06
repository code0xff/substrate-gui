import { ApiPromise } from '@polkadot/api';
import type { Header } from '@polkadot/types/interfaces';

export class ChainInfo {
  constructor(public api: ApiPromise | null, public blockNumber: string, public blockHash: string, public blockTime: string, public prevBlockTime: string, public diff: string, public prevDiff: string, public totalIssued: string) { }

  public static default(): ChainInfo {
    return new ChainInfo(null, '-', '-', '-', '-', '-', '-', '-');
  }

  public clear(): ChainInfo {
    this.blockNumber = '-';
    this.blockHash = '-';
    this.blockTime = '-';
    this.prevBlockTime = '-';
    this.diff = '-';
    this.prevDiff = '-';
    this.totalIssued = '-';
    return this;
  }

  public async update(header: Header, mainchain: boolean) {
    if (!this.api || !this.api.isConnected) {
      throw new Error(`Api is not connected`);
    }
    const number = header.number.toNumber();
    this.blockNumber = number.toLocaleString();

    const parent = header.parentHash.toHex();
    const hash = header.hash.toHex();

    this.blockHash = hash;
    if (mainchain) {
      this.totalIssued = await this.getTotalIssued(hash);
    }

    if (number > 1) {
      this.prevDiff = this.diff;
    }
    this.diff = await this.difficulty(hash);

    if (number > 2) {
      this.prevBlockTime = this.blockTime;
    }
    if (number > 1) {
      this.blockTime = await this.blocktime(parent, hash);
    }
    return this;
  }

  public static compressHash(hash: string): string {
    return hash.length === 66 ? hash.slice(0, 6) + '...' + hash.slice(62, 66) : hash;
  }

  public async getTotalIssued(hash: string): Promise<string> {
    if (!this.api || !this.api.isConnected) {
      throw new Error(`Api is not connected`);
    }
    return (BigInt((await (await this.api.at(hash)).query.balances.totalIssuance()).toString()) / 1_000_000_000_000_000_000n).toLocaleString();
  }

  public async difficulty(hash: string): Promise<string> {
    if (!this.api || !this.api.isConnected) {
      throw new Error(`Api is not connected`);
    }
    return BigInt(
      (await (await this.api.at(hash)).query.difficultyAdjustment.difficulty()).toString()
    ).toLocaleString();
  }

  public async blocktime(parent: string, hash: string): Promise<string> {
    if (!this.api || !this.api.isConnected) {
      throw new Error(`Api is not connected`);
    }
    const parentTimestamp = (await (await this.api.at(parent)).query.timestamp.now()).toString();
    const timestamp = (await (await this.api.at(hash)).query.timestamp.now()).toString();

    return Math.floor(
      (parseInt(timestamp) - parseInt(parentTimestamp)) / 1000
    ).toLocaleString();
  }
}
