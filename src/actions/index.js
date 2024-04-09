export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching()); 
    request('http://localhost:3001/heroes')
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}


export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersError()));
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersError = () => {
    return {
        type: 'FILTERS_ERROR'
    }
}

export const actionFilterChanged = (element) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: element
    }
}

export const filteredHeroesSet = (heroes) => {
    return {
        type: 'FILTERED_HEROES_SET',
        payload: heroes
    }
}