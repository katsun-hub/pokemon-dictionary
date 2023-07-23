import { memo } from 'react';
import styled from 'styled-components';

export const Card = memo((props) => {
  const { pokemon } = props;
  return (
    <SCard className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <SCardName className="cardName">{pokemon.name}</SCardName>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => (
          <div>
            <span>{type.type.name}</span>
          </div>
        ))}
      </div>
      <SCardInfo className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">能力：{pokemon.abilities[0].ability.name}</p>
        </div>
      </SCardInfo>
    </SCard>
  )
})

const SCard = styled.div`
  width: 290px;
  box-shadow: 2px 8px 10px #777;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.4s ease;
  margin: auto;

  &:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

const SCardName = styled.h3`
  padding: 0;
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 0;
`;

const SCardInfo = styled.div`
  text-align: center;
`;