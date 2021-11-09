import React, { useState } from 'react';
import useCounter from './useCounter';
// init, read, update
// share logic
function SubscribeBox() {
  const [state, setState] = useState({
    subscribe: false,
    likeWithoutCustomHook: 0,
    dislikeWithoutCustomHook: 0,
  });

  // With Custom Hook karena state nya sudah berada pada useCounter.js
  const [like, handleLike, handleTripleLike] = useCounter(0);
  const [dislike, handleDislike] = useCounter(0);

  const handleSubscribe = () => {
    setState({
      ...state,
      subscribe: !state.subscribe,
    });
  };

  const handleLikeWithoutCustomHook = () => {
    // Ketika handleTripleLikeWithoutCustomHook dijalankan harusnya kan dijalankan 3 kali, ternyata hanya dijalankan 1 kali, ini karena setState ini berjalan secara asychronus, solusi nya adalah menggunakan updater func/callback, caranya menjadi seperti ini
    setState(currentState => ({
      ...state,
      likeWithoutCustomHook: currentState.likeWithoutCustomHook + 1,
    }));

    // Sebelum dirubah menjadi callback
    // setState({
    //   ...state,
    //   likeWithoutCustomHook: state.likeWithoutCustomHook + 1,
    // });
  };

  const handleDislikeWithoutCustomHook = () => {
    setState({
      ...state,
      dislikeWithoutCustomHook: state.dislikeWithoutCustomHook + 1,
    });
  };

  const handleTripleLikeWithoutCustomHook = () => {
    // Tujuan nya likeWithoutCustomHook di tambah 3 kali
    handleLikeWithoutCustomHook()
    handleLikeWithoutCustomHook()
    handleLikeWithoutCustomHook()
  };

  return (
    <div>
      <p>
        <button onClick={handleSubscribe}>
          {state.subscribe ? 'Subscribe' : 'Unsubscribe'}
        </button>
        <span> {JSON.stringify(state.subscribe)} </span>
      </p>

      <h2>Without Custom Hook</h2>
      <p>
        <button onClick={handleLikeWithoutCustomHook}>
          {' '}
          Like Without Custom Hook
        </button>
        <span> {state.likeWithoutCustomHook} </span>
      </p>
      <p>
        <button onClick={handleDislikeWithoutCustomHook}>
          {' '}
          Dislike Without Custom Hook
        </button>
        <span> {state.dislikeWithoutCustomHook} </span>
      </p>
      <p>
        <button onClick={handleTripleLikeWithoutCustomHook}>
          {' '}
          Triple Like Without Custom Hook
        </button>
        <span> {state.likeWithoutCustomHook}</span>
      </p>

      <h2>With Custom Hook</h2>
      <p>
        <button onClick={handleLike}> Like </button>
        <span> {like} </span>
      </p>
      <p>
        <button onClick={handleDislike}> Dislike </button>
        <span> {dislike} </span>
      </p>
      <p>
        <button onClick={handleTripleLike}> Triple Like</button>
        <span> {like}</span>
      </p>
    </div>
  );
}

export default SubscribeBox;
