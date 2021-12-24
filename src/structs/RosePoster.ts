import { BasePoster, BasePosterInterface } from './BasePoster'

import { BotStats } from '@beatx/dbots-sdk/dist/typings'

import { Master } from 'discord-rose'

import { PosterOptions } from '../typings'

/**
 * Auto-Poster For Discord-Rose
 */
export class RosePoster extends BasePoster implements BasePosterInterface {
  private client: Master

  /**
   * Create a new poster
   * @param token Discord.bots.gg API Token
   * @param client Your Discord-Rose master
   * @param options Options
   */
  constructor (token: string, client: any, options?: PosterOptions) {
    if (!token) throw new Error('Missing Discord.bots.gg Token')
    if (!client) throw new Error('Missing client')

    const Discord = require('discord-rose')

    if (!(client instanceof Discord.Master)) throw new Error('Not a Discord-Rose master.')

    super(token, options)

    this.client = client

    this._binder({
      clientReady: () => this.clientReady(),
      waitForReady: (fn) => this.waitForReady(fn),
      getStats: () => this.getStats()
    })
  }

  public async clientReady () {
    if (!this.client.spawned) return false

    const stats = await this.client.getStats()

    return stats.every(x => x.shards.every(x => x.state === 2))
  }

  public waitForReady(fn: () => void) {
    this.client.once('READY', () => {
      fn()
    })
  }

  public async getStats (): Promise<BotStats> {
    const stats = await this.client.getStats()
    return {
      serverCount: stats.reduce((a, b) => {
        return a + b.shards.reduce((c, d) => c + d.guilds, 0)
      }, 0),
      shardCount: this.client.options.shards as number
    }
  }
}
