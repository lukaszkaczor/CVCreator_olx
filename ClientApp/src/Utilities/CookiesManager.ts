import { IDataManager } from "./Interfaces/IDataManger";
import { CookieService } from "ngx-cookie-service";

// export class CookiesManager implements IDataManager {
export class CookiesManager {
  constructor(private cookie: CookieService) {}

  async get(key?: any): Promise<any> {
    return this.cookie.get(key);
  }

  async create(key: string, value: string) {
    if (this.exists(key)) throw new Error("Cookie already exists.");
    this.save(key, value);
  }

  async save(key: string, value: string) {
    this.cookie.set(key, value);
    await this.delay(500);
    console.log("save");
    return this.get(key);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async edit(key: string, value: string) {
    let cookie = this.get(key);

    if (cookie == null) throw new Error("cookie is null");

    await this.save(key, value);
  }

  async delete(key: string) {
    if (!this.exists(key)) throw new Error("Cookie don't exists.");
    this.cookie.delete(key);
  }

  async deleteAll() {
    this.cookie.deleteAll();
  }

  async exists(key: string) {
    return this.cookie.check(key);
  }
}
