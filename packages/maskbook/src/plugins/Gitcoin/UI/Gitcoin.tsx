import { PluginGitcoinRPC } from '../messages'
import { useAsyncRetry } from 'react-use'
import { Button } from '@material-ui/core'
import { useRemoteControlledDialog } from '../../../utils/hooks/useRemoteControlledDialog'
import { WalletMessages } from '../../Wallet/messages'
import { useCallback } from 'react'
import { createERC20Token } from '../../../web3/helpers'
import { useChainId } from '../../../web3/hooks/useChainState'
import { useConstant } from '../../../web3/hooks/useConstant'
import { CONSTANTS } from '../../../web3/constants'

export interface GitcoinProps {
    url: string
}

export function Gitcoin(props: GitcoinProps) {
    const [id = ''] = props.url.match(/\d+/) ?? []
    const { value: data } = useAsyncRetry(() => PluginGitcoinRPC.fetchGrant(id), [id])

    console.log('DEBUG: fetch gitcoin')
    console.log(data)

    const chainId = useChainId()
    const DAI_ADDRESS = useConstant(CONSTANTS, 'DAI_ADDRESS')
    const ITO_CONTRACT_ADDRESS = useConstant(CONSTANTS, 'MULTICALL_ADDRESS')

    //#region remote controlled dialog logic
    const [open, setOpen] = useRemoteControlledDialog(WalletMessages.events.unlockERC20TokenDialogUpdated)
    const onOpen = useCallback(() => {
        setOpen({
            open: true,
            token: createERC20Token(chainId, '0xe379c7a6BA07575A5a49D8F8EBfD04921b86917D', 18, 'MAKB', 'MAKB'),
            amount: '3',
            spender: '0xdb1eec6fecc708139aae82f0a4db0385968565c5',
        })
    }, [setOpen])
    //#endregion

    return <Button onClick={onOpen}>Approve</Button>

    // const grantTitle = title ?? 'A Gitcoin Grant'

    // //#region the donate dialog
    // const account = useAccount()
    // const [open, setOpen] = useState(false)
    // const [, setSelectProviderDialogOpen] = useRemoteControlledDialog(WalletMessages.events.selectProviderDialogUpdated)
    // const onRequest = useCallback(() => {
    //     if (account) {
    //         setOpen(true)
    //         return
    //     }
    //     setSelectProviderDialogOpen({
    //         open: true,
    //     })
    // }, [account, setOpen, setSelectProviderDialogOpen])
    // //#endregion

    // return (
    //     <>
    //         <PreviewCard
    //             logo={image}
    //             title={grantTitle}
    //             line1={BigNumber.isBigNumber(estimatedAmount) ? `${estimatedAmount.toFixed(2)} USD` : ''}
    //             line2="ESTIMATED"
    //             line3={BigNumber.isBigNumber(daiAmount) ? `${formatBalance(daiAmount, 18, 18)} DAI` : ''}
    //             line4={isNumber(transactions) ? `${transactions} transactions` : ''}
    //             address={donationAddress}
    //             originalURL={url}
    //             onRequestGrant={onRequest}
    //         />
    //         <DonateDialog
    //             address={donationAddress}
    //             title={grantTitle}
    //             open={!!(open && donationAddress?.length)}
    //             onClose={() => setOpen(false)}
    //         />
    //     </>
    // )
}
