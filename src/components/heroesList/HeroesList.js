
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HeroesService from '../../services/HeroesService';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.css';

const HeroesList = () => {

    const {getHeroesList} = HeroesService();
    const [firstLoadEnded, setFirstLoadEnded] = useState(false);

    useEffect(() => {
        getHeroesList();
    }, []);

   
    const filteredHeroes = useSelector(state => {
        if (state.activeFilter === 'all') {
            return state.heroes;
        } else {
            return state.heroes.filter(hero => hero.element === state.activeFilter);
        }
    })

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);

    if (heroesLoadingStatus === "loading" && !firstLoadEnded) {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition classNames="item" timeout={500} appear={true}>
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        if (!firstLoadEnded) {
            setFirstLoadEnded(true);
        }
    
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition classNames="item" timeout={500} key={id} appear={true}>
                    <HeroesListItem id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;
