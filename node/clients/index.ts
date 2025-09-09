import { IOClients } from '@vtex/api'

import MasterData from './masterData'
import OMS from './oms'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get masterData() {
    return this.getOrSet('masterData', MasterData)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
