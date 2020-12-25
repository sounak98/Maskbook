import type { ERC20TokenDetailed, ERC721TokenDetailed, EtherTokenDetailed } from '../types'

export interface TransactionPoolState {
    tokens: Record<string, EtherTokenDetailed | ERC20TokenDetailed | ERC721TokenDetailed>
    meta: Record<
        string,
        {
            amount: string
            balance: string
        }
    >
}

export enum TrasnactionPoolActionType {
    ADD_TOKEN,
    DELETE_TOKEN,
    UPDATE_TOKEN,
}

export type TransactionPoolAction =
    | {
          type: TrasnactionPoolActionType.ADD_TOKEN
          id: string
          token: EtherTokenDetailed | ERC20TokenDetailed | ERC721TokenDetailed
      }
    | {
          type: TrasnactionPoolActionType.DELETE_TOKEN
          id: string
      }
    | {
          type: TrasnactionPoolActionType.UPDATE_TOKEN
          id: string
          token: Partial<EtherTokenDetailed | ERC20TokenDetailed | ERC721TokenDetailed>
      }

export function useTransactionPool() {}
