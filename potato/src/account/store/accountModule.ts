import actions, { AccountActions } from "./actions"
import state, { AccountState } from "./states"


export interface AccountModule {
    namespaced: true
    state: AccountState
    actions: AccountActions
}

const accountModule: AccountModule = {
    namespaced: true,
    state,
    actions,
}

export default accountModule