import React, { useEffect, useState } from 'react'

function HelloWorld() {
  const [myState, setMyState] = useState('Hi, this is my first state');
  const [pokeData, setPokeData] = useState({});

  const fetchData = async (url) => {
    let response = await fetch(url);
    let response_json = await response.json();
    return response_json;
  }

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((data) => {setPokeData(data)});
  }, []);

  return (
    <div>
      <input type='text' onChange={(event) => setMyState(event.target.value)} value={myState} />
      <div>{myState}</div>
      {pokeData.abilities !== undefined ? pokeData.abilities.map((ab) => <p>{ab.ability.name}</p>) : ""}
    </div>
  )
}
export default HelloWorld;