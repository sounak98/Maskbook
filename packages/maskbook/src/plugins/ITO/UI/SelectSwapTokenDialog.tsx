import { makeStyles, createStyles, ListItem, List } from '@material-ui/core'
import { DialogContent, DialogProps } from '@material-ui/core'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { useI18N } from '../../../utils/i18n-next-ui'
import { TOKEN_ICON_LIST_TABLE } from './ITO'
import type { ERC20TokenDetailed, EtherTokenDetailed } from '../../../web3/types'
import { formatEthereumAddress } from '../../../plugins/Wallet/formatter'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const useStyles = makeStyles((theme) =>
    createStyles({
        listItem: {
            display: 'flex',
            alignItems: 'center',
        },
        symbol: {
            marginLeft: theme.spacing(3),
            fontSize: 16,
            flexGrow: 1,
            fontWeight: 400,
        },
        address: {
            color: '#D9D9D9',
            fontSize: 14,
        },
        link: {
            marginLeft: theme.spacing(1),
            width: 16,
            height: 16,
        },
    }),
)

export interface SelectSwapTokenProps extends withClasses<'root'> {
    open: boolean
    onClose: () => void
    onSelect: (address: string) => void
    exchangeTokens: (EtherTokenDetailed | ERC20TokenDetailed)[]
    DialogProps?: Partial<DialogProps>
}

export function SelectSwapTokenDialog(props: SelectSwapTokenProps) {
    const { t } = useI18N()
    const classes = useStyles()
    return (
        <>
            <InjectedDialog
                open={props.open}
                title={t('plugin_ito_dialog_claim_select_token_dialog_title')}
                DialogProps={{ maxWidth: 'xs' }}
                onClose={props.onClose}>
                <DialogContent>
                    <List>
                        {props.exchangeTokens.map((t, i) => {
                            const TokenIcon = TOKEN_ICON_LIST_TABLE[t.address.toLowerCase()]

                            return TokenIcon ? (
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    onClick={() => props.onSelect(t.address.toLowerCase())}>
                                    <TokenIcon size={32} />
                                    <span className={classes.symbol}>{t.symbol}</span>
                                    <span className={classes.address}>{formatEthereumAddress(t.address, 6)}</span>
                                    <OpenInNewIcon fontSize="small" className={classes.link} />
                                </ListItem>
                            ) : null
                        })}
                    </List>
                </DialogContent>
            </InjectedDialog>
        </>
    )
}
