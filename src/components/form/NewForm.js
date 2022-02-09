import Card from '../UI/Card';
import classes from './NewForm.module.css';
import React,{useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from 'axios';
export default function NewForm(props){
    axios.defaults.baseURL = 'http://milkbankserver-env.eba-p6zpmbku.ap-northeast-1.elasticbeanstalk.com';//ngrok url here

    const [formData, setFormData] = useState( {
        formId: props.formId,
        depositId: props.depositId || '',
        fat: props.fat|| '',
        protein: props.protein || '',
        lactose: props.lactose || '',
        kcal: props.kcal || '',
        volume: props.volume || '',
    });

    useEffect( () => {
        // console.log(formData);

        props.parentCallbackUpdate(formData, formData.formId);

    },[formData])

    const handleChange = ({ target }) => {
        const {name, value} = target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formData, '', 2));
      };

    const deleteThis = (event) => {
        props.parentCallbackDelete(formData.formId);
    }

    const submitPost = () => {
    axios({
        method: 'post',
        url: '/api/create',
        data: {depositID: props.depositId, fatPercent: props.fat, proteinPercent: props.protein, lactosePercent: props.lactose, kCal: props.kcal, volume: props.volume}
      })
      .then(alert(JSON.stringify(formData, '', 2)))
      .catch(err => console.error(err)) // promise
    };

  const pull = () => {
    axios({
        method: 'get',
        url: '/api/get'
      })
      .then(function (response) {alert(JSON.stringify(response, '', 2))})
      .catch(err => console.error(err))
    };


    return( <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor ='deposit'>Deposit ID</label>
                    <input
                    value={formData.depositId}
                    name="depositId"
                    type="text"
                    placeholder="Deposit ID #"
                    onChange={handleChange}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor ='fat'>Fat%</label>
                    <input
                    value={formData.fat}
                    name="fat"
                    type="number"
                    placeholder="Fat%"
                    onChange={handleChange}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor ='pro'>Protein%</label>
                    <input
                    value={formData.protein}
                    name="protein"
                    type="number"
                    placeholder="Protein%"
                    onChange={handleChange}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor ='lac'>Lactose%</label>
                    <input
                    value={formData.lactose}
                    name="lactose"
                    type="number"
                    placeholder="Lactose%"
                    onChange={handleChange}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor ='kcal'> Kcal</label>
                    <input
                    value={formData.kcal}
                    name="kcal"
                    type="number"
                    placeholder="Kcal"
                    onChange={handleChange}
                    />
                </div>

                <div className={classes.control}>
                    <label htmlFor ='ml'> ml</label>
                    <input
                    value={formData.volume}
                    name="volume"
                    type="number"
                    placeholder="Volume mL"
                    onChange={handleChange}
                    />
                </div>


                <div className={classes.actions}>
                    <button type='button' onClick={deleteThis}>Remove</button>
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={submitPost}>Submit</button>
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={pull}>Pull All</button>
                </div>
            </form>
        </Card>
    );
}
//Axios.post('http://localhost:3306/api/create', {depositID: props.depositID, fatPercent: props.fat, proteinPercent: props.protein, lactosePercent: props.lactose, kCal: props.kcal, volume: props.volume})
