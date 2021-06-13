import './App.css';
import List from './List.js';
import db from "./firebase.js";
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from "firebase";

function App() {

  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");

  // const [{ isOver }, addToListRef ] = useDrop({
  //   accept: "List1",
  //   collect: (monitor) => ({
  //     isOver: ! !monitor.isOver()
  //   })
  // });

  // const [{ isOver: isCardOver }, removeFromListRef ] = useDrop({
  //   accept: "List2",
  //   collect: (monitor) => ({
  //     isOver: ! !monitor.isOver()
  //   })
  // });


  useEffect(() => {
        
    db.collection("lists")
    .orderBy("timestamp", "desc")
    .onSnapshot( 
        (snapshot) => setLists(snapshot.docs.map( (doc) => ({ id:doc.id, data:doc.data() }) ))
    );

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("lists").add(

        {
            title: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }

    );
    setInput("");
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Trello Board</h1>
        <hr/>
        <div className="list__adder">
        <form>
            <input 
                value= {input}
                onChange={ (e) => setInput(e.target.value) }
                
                placeholder={`Lists Name`}
            />

            <button disabled={!input} onClick={handleSubmit} type="submit">
                Add
            </button>
          </form>
        </div>
      </div>

      <div className="app__lists">
        
        {lists.map(
                  (list) => (
                      <List
                          className="list"
                          Key={list.id}
                          listId={list.id}
                          title={list.data.title}
                          timestamp={list.data.timestamp}    
                      />
                  )

              )}
      </div>

    
    </div>
  );
}

export default App;
