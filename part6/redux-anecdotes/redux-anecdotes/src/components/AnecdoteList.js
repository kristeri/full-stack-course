import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterText = useSelector((state) => state.filter);

  const vote = (anectode) => {
    dispatch(voteAnecdote(anectode.id));
    dispatch(setNotification(`You voted '${anectode.content}'`, 5));
  };

  return (
    <>
      <Filter />
      <Notification />
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .filter((anecdote) => {
          return anecdote.content.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
        })
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
        ))}
    </>
  );
};

export default AnecdoteList;
