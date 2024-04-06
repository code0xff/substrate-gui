export class NodeStats {
    constructor(public on: boolean, public jobId: NodeJS.Timeout | null, public cpuUsage: number, public memory: number, public startTime: number) { }

    public static default(): NodeStats {
        return new NodeStats(false, null, 0.0, 0, 0);
    }

    public clear(): NodeStats {
        this.cpuUsage = 0.0;
        this.memory = 0;
        this.startTime = 0;
        return this;
    }

    public start(): NodeStats {
        this.on = true;
        return this;
    }

    public stop(): NodeStats {
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