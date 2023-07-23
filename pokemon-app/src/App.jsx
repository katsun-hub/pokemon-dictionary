import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { getAllPokemon, getPokemon } from './hooks/useGetAllPoke';
import { Card } from './components/organisms/Card';
import { Navbar } from './components/organisms/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokeDate = async () => {
      //すべてのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    }
    fetchPokeDate();
  }, []);

  const loadPokemon = async (result) => {
    const _pokemonData = await Promise.all(
      result.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  const onClickPrev = async () => {
    if (!prevURL) return;
    setLoading(true);
    const res = await getAllPokemon(prevURL);
    await loadPokemon(res.results);
    setPrevURL(res.previous);
    setLoading(false);

  };

  const onClickNext = async () => {
    setLoading(true);
    const res = await getAllPokemon(nextURL);
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (<p className="loading">ロード中・・・</p>
        ) : (
          <>
            <SContainer className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </SContainer>
            <SButtonWrap className="btn">
              <SButton onClick={onClickPrev}>前へ</SButton>
              <SButton onClick={onClickNext}>次へ</SButton>
            </SButtonWrap>
          </>
        )}
      </div>
    </>
  );
}

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const SButtonWrap = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const SButton = styled.button`
  width: 80px;
  font-size: 20px;
  font-weight: 700;
  background-color: antiquewhite;
  color: #333;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 2px 8px 10px #777;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(5px);
    box-shadow: none;
    cursor: pointer;
  }
`;

export default App;
