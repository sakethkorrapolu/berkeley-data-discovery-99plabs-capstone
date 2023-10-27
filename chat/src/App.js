//https://www.youtube.com/watch?v=EzkWAviyYgg
//https://www.youtube.com/watch?v=6r_QBgq-seA
//https://medium.com/black-tech-diva/hide-your-api-keys-7635e181a06c


import './App.css';
import gptLogo from "./assets/chatgpt.svg";
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useState, useRef, useEffect } from 'react';


function App() {

  const [res, setRes] = useState("")
  
  // useEffect(() => {
  //   fetch("/api/llm").then(res => res.json()).then(data => (setResult(data.result)))
  // })

  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi, I am the Data Analyst in a Box! My role is to answer any of your data analysis inquiries about 99P Labs' V2X dataset. Ask away: I can answer quantitative questions about the dataset (by querying it for you!) and generate visualizations. Feel free to click on the sample prompts on the left.",
    isBot: true
  }]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  const handleSend = () => { //async () => {
    const text = input;
    setInput(''); //clear input box after input is sent to model
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = "that's great man"; //await sendMsgToOpenAI(text); //// send var text to model
    
    // const textData = {'text': text};
    // fetch('/api/llm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json',
    //   },
    //   body: JSON.stringify(textData)
    // })
    //   .then((response) => response.json())
    //   .then((data) => setRes(data.res))
    //   .catch((error) => {
    //     console.error('Error: ', error);
    //   })
      
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ])
    console.log(res);
  }

  const handleEnter = (e) => {//async (e) => {
    if (e.key === 'Enter') handleSend(); // await handleSend();
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    //const res = "that's great man"; //await sendMsgToOpenAI(text); //// send var text to model
    
    const textData = {'text': text};
    console.log("llm input:", textData)

    await fetch('/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(textData)
    }).then((response) => response.json())
      .then((data) => setRes(data.res))
      .catch((error) => {
        console.error('Error: ', error);
      })

    // const llmRes = await fetch('/api/llm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json',
    //   },
    //   body: JSON.stringify(textData)
    // })

    // const data = llmRes.json()
    // setRes(data.res)

    console.log("returned reponse: ", res);

    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ])
    // console.log(res);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">99P Labs Chatbot</span></div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="Restart Chat" className="addBtn" />Restart Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What size is the trips summary dataset?"}><img src={msgIcon} alt="Query" />What size is the trips summary dataset?</button>
            <button className="query" onClick={handleQuery} value={"Which segment had the longest trip?"}><img src={msgIcon} alt="Query" />Which segment had the longest trip?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Rocket" className="listItemsImg" />Upgrade to Pro</div>
        </div>        
      </div>
      <div className="main">
        <div className="chats">
          {/* <div className="chat">
            <img className="chatImg" src={userIcon} alt="" /><p className="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" /><p className="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div> */}
          {messages.map((message, i) => 
            <div key={i} className={message.isBot?"chat bot":"chat"}>
              <img className="chatImg" src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send a message" value={input} onKeyDown={handleEnter} onChange={(e)=>setInput(e.target.value)}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>This model uses GPT-3.5 Turbo, LangChain, and PandasAI. Note that it is not conversational and does not retain memory of previous messages.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
