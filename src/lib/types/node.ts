import type { Child } from "@tauri-apps/api/shell";
import { ApiPromise } from "@polkadot/api";

export class NodeStats {
    constructor(public on: boolean, public jobId: NodeJS.Timeout | null, public api: ApiPromise | null, public child: Child | null, public cpuUsage: number, public memory: number, public startTime: number) { }

    public static default(): NodeStats {
        return new NodeStats(false, null, null, null, 0.0, 0, 0);
    }

    public start(): NodeStats {
        this.on = true;
        this.cpuUsage = 0.0;
        this.memory = 0;
        this.startTime = 0;
        return this;
    }

    public async stop(): Promise<NodeStats> {
        if (this.api && this.api.isConnected) {
            await this.api.disconnect();
        }
        if (this.jobId) {
            clearInterval(this.jobId);
        }
        if (this.child) {
            await this.child.kill();
        }
        this.jobId = null;
        this.on = false;
        return this;
    }

    public update(other: NodeStats): NodeStats {
        this.cpuUsage = other.cpuUsage;
        this.memory = other.memory;
        this.startTime = other.startTime;
        return this;
    }
}