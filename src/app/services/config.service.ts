import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config = {
    interface: {
      appName: 'Panda\'s Turnip Trader'
    }
  };

  constructor() { }

  getConfig() {
    return this.config;
  }

}
