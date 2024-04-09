import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import { fetchHeroes, heroesFetchingError, fetchFilters, actionFilterChanged } from "../actions";

const HeroesService = () => {
    const _apiBase = 'http://localhost:3001/';

    const {request} = useHttp();
    const dispatch = useDispatch();

    const getHeroesList = () => {
        dispatch(fetchHeroes(request)); 
    }

    const getHeroesFilters = () => {
        dispatch(fetchFilters(request));
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