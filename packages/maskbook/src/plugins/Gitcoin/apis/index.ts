import { GITCOIN_API_GRANTS_V1 } from '../constants'

interface Metadata {}

interface AdminProfile {
    id: number
    url: string
    handle: string
    keywords: string[]
    position: number
    avatar_url: string
    github_url: string
    total_earned: number
    organizations: Metadata
}

interface GitcoinGrant {
    active: boolean
    title: string
    slug: string
    description: string
    reference_url: string
    logo: string
    admin_address: string
    amount_received: string
    token_address: string
    token_symbol: string
    contract_address: string
    metadata: Metadata
    network: string
    required_gas_price: string
    admin_profile: AdminProfile
    team_members: AdminProfile[]
}

export function fetchGrant(id: string) {
    if (!/\d+/.test(id)) return null
    return fetch(`${GITCOIN_API_GRANTS_V1}/${id}/`).then((x) => x.json() as Promise<GitcoinGrant>)
}
