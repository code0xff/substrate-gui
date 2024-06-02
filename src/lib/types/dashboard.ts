import type { ApiPromise } from "@polkadot/api";

export class DashboardItem {
    constructor(public title: string, public contents: string, public subContents: string, public defaultContents: string, public defaultSubContents: string, public script: string) { }

    public static create(title: string, defaultContents: string, defaultSubContents: string, script: string): DashboardItem {
        const _script = `
        ${script}
        return this;
    `;
        return new DashboardItem(title, defaultContents, defaultSubContents, defaultContents, defaultSubContents, script);
    }

    public reset(): DashboardItem {
        this.contents = this.defaultContents;
        this.subContents = this.defaultSubContents;
        return this;
    }
}