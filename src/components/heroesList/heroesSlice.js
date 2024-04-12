import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/heroes');
    }
);

export const createHero = createAsyncThunk(
    'heroes/createHero',
    async (data, {dispatch}) => {
        const {request} = useHttp();
        const newHero = JSON.stringify(data);
        const response = await request('http://localhost:3001/heroes', 'POST', newHero);
        
        dispatch(fetchHeroes());
        return response;
    }
)

export const deleteHero = createAsyncThunk(
    'heroes/deleteHero',
    async (id, {dispatch}) => {
        console.log('deleteHero')
        const {request} = useHttp();
        const response = await request(`http://localhost:3001/heroes/${id}`, 'DELETE');

        dispatch(fetchHeroes());
        return response;
    }    
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => {state.heroesLoadingStatus = 'error'})
            .addCase(deleteHero.fulfilled, (state, action) => {
               console.log(action);
            })
    }
});

const {reducer} = heroesSlice;

export default reducer;