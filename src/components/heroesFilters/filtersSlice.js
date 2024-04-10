import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: (state) => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersError: (state) => {state.filtersLoadingStatus = 'error'},
        actionFilterChanged: (state, action) => {state.activeFilter = action.payload}
    }
})

const {reducer, actions} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersError,
    actionFilterChanged
} = actions;