import { createPluginMessage } from '../utils/createPluginMessage'
import { createPluginRPC } from '../utils/createPluginRPC'
import { GITCOIN_PLUGIN_ID } from './constants'

const GitcoinMessage = createPluginMessage<{ _: unknown }>(GITCOIN_PLUGIN_ID)
export const PluginGitcoinRPC = createPluginRPC(GITCOIN_PLUGIN_ID, () => import('./service'), GitcoinMessage.events._)
