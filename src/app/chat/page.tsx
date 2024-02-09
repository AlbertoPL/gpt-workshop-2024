'use client'

import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat() {
    const [money, setMoney] = useState(200);
    const [endurance, setEndurance] = useState(50);
    const [dignity, setDignity] = useState(50);
    function updateStats(message: Message) {
        if (message) {
            const regex = /\{[^{}]*\}/;
            const match = message.content.match(regex);
            if (match) {
                try {
                    const formattedString = match[0].replace(/([\{\s,])(\w+)(?=:)/g, '$1"$2"').replace('+', '');
                    const statsObj: {money: number; endurance: number; dignity: number; } = JSON.parse(formattedString);
                    console.log(statsObj)
                    setMoney(money + statsObj.money);
                    setDignity(dignity + statsObj.dignity);
                    setEndurance(endurance + statsObj.endurance);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                }
            }
        }
    }
    const { messages, input, handleInputChange, handleSubmit } = useChat({onFinish: (message) => {updateStats(message)}});


  return (
    <>
    { (money <= 0 || endurance <=0 || dignity <= 0)  &&  <div className='game-over'>GAME OVER</div>}
    <div className='stats-container'>
        <span>{`Money: ${money} `}</span>
        <span>{`Endurance: ${endurance}`}</span>
        <span>{`Dignity: ${dignity}`}</span>
    </div>
    <div className='chat-container'>
        <div className='chat'>
            {messages.map(m => (
                <div key={m.id}>
                    <strong>{m.role}:</strong> {m.content}
                </div>
            ))}

            <form onSubmit={handleSubmit} className='chat-input'>
                <input
                className='chat-input-field'
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    </div>
    </>
  );
}

