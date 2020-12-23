import { PluginConfig, PluginStage, PluginScope } from '../types'
import { TransactionDialog } from '../../web3/UI/TransactionDialog'
import { PLUGIN_IDENTIFIER } from './constants'
import { SelectProviderDialog } from './UI/SelectProviderDialog'
import { SelectWalletDialog } from './UI/SelectWalletDialog'
import { WalletConnectQRCodeDialog } from './UI/WalletConnectQRCodeDialog'
import { WalletStatusDialog } from './UI/WalletStatusDialog'
import { UnlockERC20TokenDialog } from '../../web3/UI/UnlockERC20TokenDialog'

export const WalletPluginDefine: PluginConfig = {
    pluginName: 'Wallet',
    identifier: PLUGIN_IDENTIFIER,
    stage: PluginStage.Production,
    scope: PluginScope.Public,
    PageComponent() {
        return (
            <>
                <TransactionDialog />
                <SelectWalletDialog />
                <SelectProviderDialog />
                <UnlockERC20TokenDialog />
                <WalletStatusDialog />
                <WalletConnectQRCodeDialog />
            </>
        )
    },
    DashboardComponent() {
        return (
            <>
                <TransactionDialog />
                <SelectWalletDialog />
                <SelectProviderDialog />
                <UnlockERC20TokenDialog />
                <WalletStatusDialog />
                <WalletConnectQRCodeDialog />
            </>
        )
    },
}
