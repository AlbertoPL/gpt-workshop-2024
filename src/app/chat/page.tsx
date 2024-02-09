'use client'

import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
    const [money, setMoney] = useState(200);
    const [endurance, setEndurance] = useState(50);
    const [dignity, setDignity] = useState(50);
    const ref = useRef<HTMLDivElement>(null);

    function scrollDown() {
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });   
    }

    function updateStats(message: Message) {
        if (message) {
            const regex = /\{[^{}]*\}/;
            const match = message.content.match(regex);
            if (match) {
                try {
                    const formattedString = match[0].replace(/([\{\s,])(\w+)(?=:)/g, '$1"$2"').replaceAll('+', '');
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
    const { messages, input, handleInputChange, handleSubmit } = useChat({onFinish: (message) => {
        updateStats(message);
        scrollDown();
    }});
   
    useEffect(() => {
        if (messages.length) {
            scrollDown();
        }
      }, [messages.length]);

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
            {messages.map(m => { m.content = m.content.replace(/\{[^{}]*\}/g, ''); return m; }).map((m, index) => (
                <div key={m.id} className="paragraph">
                    <strong>{m.role === "user" ? "You" : "Narrator"}:</strong> {m.content}
                    {index === messages.length - 1 && <div ref={ref} />}
                </div>
            ))}

            <form onSubmit={handleSubmit} className='chat-input'>
                <input
                className='chat-input-field'
                    value={input}
                    placeholder="What do you want to do next?"
                    onChange={handleInputChange}
                />
            </form>
        </div>
    </div>
    </>
  );
}

