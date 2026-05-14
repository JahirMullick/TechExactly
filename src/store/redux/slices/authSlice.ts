import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    session: Session | null
}

const initialState: AuthState = {
    user: null,
    session: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ user: User | null; session?: Session | null }>
        ) => {
            state.user = action.payload.user
            state.session = action.payload.session ?? null
        },
        clearUser: (state) => {
            state.user = null
            state.session = null
        },
    },
})

export const authActions = authSlice.actions
export default authSlice;
