import type { Child } from "@tauri-apps/api/shell";
import { ApiPromise, WsProvider } from "@polkadot/api";

export class NodeInstance {
    constructor(public on: boolean, public jobId: NodeJS.Timeout | undefined, public api: ApiPromise | undefined, public child: Child | undefined, public cpuUsage: number, public memory: number, public startTime: number, public endpoint: string, public dashboardJobId: NodeJS.Timeout | undefined) { }

    public static create(): NodeInstance {
        return new NodeInstance(false, undefined, undefined, undefined, 0.0, 0, 0, '', undefined);
    }

    public start(): NodeInstance {
        this.on = true;
        this.cpuUsage = 0.0;
        this.memory = 0;
        this.startTime = 0;
        return this;
    }

    public async stop(): Promise<NodeInstance> {
        if (this.api && this.api.isConnected) {
            await this.api.disconnect();
        }
        if (this.jobId) {
            clearInterval(this.jobId);
        }
        if (this.child) {
            await this.child.kill();
        }
        this.jobId = undefined;
        this.on = false;
        return this;
    }

    public update(other: NodeInstance): NodeInstance {
        this.cpuUsage = other.cpuUsage;
        this.memory = other.memory;
        this.startTime = other.startTime;
        return this;
    }

    public async getApi(): Promise<ApiPromise> {
        if (this.api) {
            return this.api;
        } else {
            this.api = await ApiPromise.create({ provider: new WsProvider(this.endpoint) });
            return this.api;
        }
    }
}