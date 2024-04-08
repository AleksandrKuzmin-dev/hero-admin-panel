
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HeroesService from '../../services/HeroesService';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.css';

const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const {getHeroesList} = HeroesService();

    useEffect(() => {
       getHeroesList();
        // eslint-disable-next-line
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition classNames="item" timeout={500} key={id}>
                    <HeroesListItem id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const heroesListEmpty = (
        <CSSTransition classNames="item" timeout={500}>
            <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
    )

    const elements = filteredHeroes.length === 0 ? heroesListEmpty : renderHeroesList(filteredHeroes)
    
    return (
            <ul>
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
            </ul>
    )
}

export default HeroesList;
