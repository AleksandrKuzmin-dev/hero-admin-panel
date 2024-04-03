
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch} from "react-redux";
import { filtersFetching, filtersFetched, filtersError } from "../../actions";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus} = useSelector(state => state);

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(err => dispatch(filtersError()));
        // eslint-disable-next-line
    }, [])
  
    const renderFilterList = (filters) => {
        if (filters.length === 0) {
            return <h5 className="text-center mt-5">Фильтры отсутствуют</h5>
        } else {
           return filters.map(({element, text}) => {
                return renderFilter(element, text)
           })
        }
    }

    const renderFilter = (value, name) => {
        let classList;
        
        switch(value) {
            case 'all':
                classList = "btn btn-outline-dark active"
                break;
            case 'fire':
                classList = "btn btn-danger"
                break;
            case 'water':
                classList = "btn btn-primary"
                break;
            case 'wind':
                classList = "btn btn-success"
                break;
            case 'earth':
                classList = "btn btn-secondary"
                break;
            default: 
                classList = "btn btn-warning"
                break;
        };
        return <button className={classList} key={value}>{name}</button>     
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка cервера. Фильтры недоступны.</h5>
    }

    const elements = renderFilterList(filters)
   
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;