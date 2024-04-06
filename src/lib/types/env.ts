import { createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import type { Selected } from "bits-ui";

export class Environment {
  constructor(public miner: string, public power: Selected<string>) { }

  public static async load(path: string, name: string): Promise<Environment> {
    if (!await exists(`${path}`)) {
      await createDir(path);
    }
    if (!await exists(`${path}/${name}`)) {
      const env = new Environment('', { value: 'min', label: 'Min' });
      await writeTextFile(`${path}/${name}`, JSON.stringify(env));
      return env;
    } else {
      return JSON.parse(await readTextFile(`${path}/${name}`));
    }
  }

  public static async save(env: Environment, path: string, name: string): Promise<void> {
    if (!await exists(`${path}`)) {
      await createDir(path);
    }
    await writeTextFile(`${path}/${name}`, JSON.stringify(env));
  }
}