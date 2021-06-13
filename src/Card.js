import React from 'react';
import './Card.css';
import db from "./firebase";
import CloseIcon from '@material-ui/icons/Close';

function Card({cardKey, cardId, timestamp, cardTitle, cardDesc, listId }) {

    const handleCardDelete = (e) => {
        e.preventDefault();

        db
        .collection("lists")
        .doc(listId)
        .collection("cards")
        .doc(cardId)
        .delete()

    };

    return (
        <div className="card">
            <div className="card__head">
                <h1>{cardTitle}</h1>
                <CloseIcon className="closeIcon" onClick={handleCardDelete} />
            </div>
            <hr></hr>
            <div className="card__content">
                <p>{cardDesc}</p>
                <p>{new Date(timestamp).toDateString()}</p>
            </div>

        </div>
    )
}

export default Card;
