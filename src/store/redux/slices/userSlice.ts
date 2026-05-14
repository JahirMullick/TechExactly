import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface User {
    id: number;
    user_id: string;
    first_name: string;
    last_name: string;
    profile_img: string;
    location: string;
    city: string;
    created_at: string;
    updated_at: string | null;
    skill_level: number;
}

// 2. Define the initial state structure
// Use 'User | null' for the user field since the user can be logged out (null)
interface UserState {
    user: User | null;
}

// 3. Set the initial state
const initialState: UserState = {
    user: null,
};

// 4. Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUserDetails: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },

        clearUserDetails: (state) => {
            state.user = null;
        },
    },
});

// 5. Export actions and reducer
export const userActions = userSlice.actions;
export default userSlice;