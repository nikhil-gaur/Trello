import React from 'react';
import './List.css';
import Card from './Card';
import db from "./firebase";
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from "firebase";
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function List({Key, listId, timestamp, title }) {

    const [cards, setCards] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [descInput, setDescInput] = useState("");


    useEffect(() => {
        let unsubcribe;
        if (listId) {
            unsubcribe = db
                .collection("lists")
                .doc(listId)
                .collection("cards")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setCards(snapshot.docs.map((doc) => ({ id:doc.id, data:doc.data() }) ));
                });
    
            }
        return () => {
            unsubcribe();
        }
        
    }, [listId]);


    const handleCardSubmit = (e) => {
        e.preventDefault();

        db
        .collection("lists")
        .doc(listId)
        .collection("cards").add(

            {
                cardTitle: titleInput,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                description: descInput,
            }

        );

        // Some Clever DB stuff

        setTitleInput("");
        setDescInput("");
        console.log(new Date(timestamp)());
       
    };

    const handleListDelete = (e) => {
        e.preventDefault();

        db
        .collection("lists")
        .doc(listId)
        .delete()

    };


    return (
        <div className="list">
            <div className="list__head">
                <h1 className="listhead__title">{title}</h1>
                <CloseIcon className="crossIcon" onClick={handleListDelete}></CloseIcon>
            </div>
            <hr></hr>

            <div className="list__content">
            {cards.map(
                  (card) => (
                      <Card
                          className="card"
                          cardKey={card.id}
                          cardId={card.id}
                          cardTitle={card.data.cardTitle}
                          cardDesc={card.data.description}
                          timestamp={card.data.timestamp}    
                          listId={listId}
                      />
                  )

              )}
            </div>
            <div className="card__adder">
                <form>
                    <input 
                        value= {titleInput}
                        onChange={ (e) => setTitleInput(e.target.value) }
                        placeholder={`Card Title`}
                    />
                    <input 
                        value= {descInput}
                        onChange={ (e) => setDescInput(e.target.value) }
                        placeholder={`Card Description`}
                    />

                    <AddCircleOutlineIcon disabled={!titleInput} onClick={handleCardSubmit} type="submit" />
                    
                </form>
            </div>
           
        </div>
    )
}

export default List;
