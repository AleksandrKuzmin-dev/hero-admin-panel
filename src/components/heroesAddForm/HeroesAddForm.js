

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { v4 as getUniqID } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { createHero } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {filters} = useSelector(state => state.filters);

    const renderFilters = () => {
        if (filters.length !== 0) {
            return filters.map(({element, text}) => {
                if (element !== 'all') {
                    const key = getUniqID();
                    return  <option value={element} key={key}>{text}</option>
                } else {
                    return null
                }
            })
        } 
    }

    const filtersList = renderFilters();
    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}
            validationSchema= {
                Yup.object({
                    name: Yup.string()
                        .min(3, 'Минимум 3 символа')
                        .required('Поле не может быть пустым'),
                    description: Yup.string()
                        .min(10, 'Минимум 10 символов')
                        .required('Поле не может быть пустым'),
                    element: Yup.string()
                        .required('Выберите элемент')
                })
            }
            onSubmit={(values, actions) => {
                const id = getUniqID();
                dispatch(createHero({...values, id}));
                actions.resetForm();
                
            }}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>

                    <ErrorMessage name="name" className="error" component="p"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        name="description"
                        as="textarea" 
                        className="form-control" 
                        id="description" 
                        style={{"height": '130px'}}
                        placeholder="Что я умею?"/>

                    <ErrorMessage name="description" className="error" component="p"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        <option value="">Я владею элементом...</option>
                        {filtersList}
                        {/* <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option> */}
                    </Field>

                    <ErrorMessage name="element" className="error" component="p"/>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
        
    )
}

export default HeroesAddForm;