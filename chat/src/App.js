//https://www.youtube.com/watch?v=EzkWAviyYgg
//https://www.youtube.com/watch?v=6r_QBgq-seA
//https://medium.com/black-tech-diva/hide-your-api-keys-7635e181a06c


import './App.css';
import gptLogo from "./assets/99p-logo-light.png";
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import sendBtn from "./assets/send.svg";
import userIcon from './assets/user-icon-dark.png';
import gptImgLogo from './assets/99p-logo-dark-chat.png';
import visual from './assets/temp_chart.png';
import { useState, useRef, useEffect } from 'react';

function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi, I am the Data Analyst in a Box! My role is to answer any of your data analysis inquiries about 99P Labs' V2X dataset. Ask away: I can answer quantitative questions about the dataset (by querying it for you!) and generate visualizations. Feel free to click on the sample prompts on the left.",
    isBot: true
  }]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  const handleSend = async () => {
    const text = input;
    setInput(''); //clear input box after input is sent to model
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: "Question answering in progress...", isBot: true }
    ])

    const textData = { 'text': text };
    console.log("llm input:", textData)

    await fetch('/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textData)
    }).then((response) => response.json())
      .then((data) => setMessages([
        ...messages,
        { text, isBot: false },
        { text: data.res, isBot: true }
      ]))
      .catch((error) => {
        console.error('Error: ', error);
      })
  }

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: "Question answering in progress...", isBot: true }
    ])

    const textData = { 'text': text };
    console.log("llm input:", textData)

    await fetch('/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textData)
    }).then((response) => response.json())
      .then((data) => setMessages([
        ...messages,
        { text, isBot: false },
        { text: data.res, isBot: true }
      ]))
      .catch((error) => {
        console.error('Error: ', error);
      })
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">CHATBOT</span></div>
          <button className="midBtn" onClick={() => { window.location.reload() }}><img src={addBtn} alt="Restart Chat" className="addBtn" />Restart Chat</button>
          <div className="upperSideBottom">
            <p className="heading">EXAMPLE TASKS</p>
            <span className="queryTopic">Summarization</span>
            <button className="query" onClick={handleQuery} value={"How many total trips were taken in this dataset?"}><img src={msgIcon} alt="Query" />How many total trips were taken in this dataset?</button>
            <span className="queryTopic">Calculation</span>
            <button className="query" onClick={handleQuery} value={"What are the average amounts of storage used per vehicle identified by their full media version name?"}><img src={msgIcon} alt="Query" />What are the average amounts of storage used per vehicle identified by their full media version name?</button>
            <span className="queryTopic">Visualization</span>
            <button className="query" onClick={handleQuery} value={"Plot the distribution of lengths of trips for each device for the top 10 most popular devices."}><img src={msgIcon} alt="Query" />Plot the distribution of lengths of trips for each device for the top 10 most popular devices.</button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              {message.text === "visual" ? (
                <img className="visual" src={visual} alt="Visual" />
              ) : (
                <p className="txt">{message.text}</p>
              )}
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Ask a question..." value={input} onKeyDown={handleEnter} onChange={(e) => setInput(e.target.value)} /><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>This model uses GPT-3.5 Turbo, LangChain, and PandasAI. Note that it is not conversational and does not retain memory of previous messages.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
