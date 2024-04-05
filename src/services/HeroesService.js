import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroesFetching, heroesFetched, heroesFetchingError, filtersFetching, filtersFetched, filtersError, actionFilterChanged, filteredHeroesSet } from "../actions";

const HeroesService = () => {
    const _apiBase = 'http://localhost:3001/';

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {activeFilter, heroes} = useSelector(state => state);

    const getHeroesList = () => {
        dispatch(heroesFetching()); 
        request(`${_apiBase}heroes`)
            .then(data => {
                dispatch(heroesFetched(data));
                filteringHeroes(data, activeFilter);
            })
            .catch(() => dispatch(heroesFetchingError()))
    }

    const getHeroesFilters = () => {
        dispatch(filtersFetching());
        request(`${_apiBase}filters`)
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersError()));
    }

    const deleteHero = (id) => {
        request(`${_apiBase}heroes/${id}`, 'DELETE')
            .then(() => getHeroesList())
            .catch(() => dispatch(heroesFetchingError()))
    }

    const createHero = (data) => {
        const newHero = JSON.stringify(data);

        request(`${_apiBase}heroes`, 'POST', newHero)
            .then(() => getHeroesList())
            .catch(err => console.log(err));
    }

    const changeActiveFilter = (element) => {
        dispatch(actionFilterChanged(element));
        filteringHeroes(heroes, element);
    }

    const filteringHeroes = (arr, element) => {
        dispatch(filteredHeroesSet(element === 'all' ?
                                    arr :
                                    arr.filter(hero => hero.element === element)))
    }

    return {
        getHeroesList,
        getHeroesFilters,
        deleteHero,
        createHero,
        changeActiveFilter
    }
}

export default HeroesService;