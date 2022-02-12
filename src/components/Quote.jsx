import React,{useState, useEffect} from 'react';
import "../css/Quote.css";
import {useSpring, config, animated} from 'react-spring';

export default function Quote() {
    const author = "Chuck Norris";

    const randomNumber = (min, max) => (
        Math.floor(Math.random()*(max-min))+min
    )

    const [color, setColor] = useState(true);
    const [numColor, setNumColor] = useState(randomNumber(0,321));
    const [beforeColor, setBeforeColor] = useState(numColor);
    const [phrase, setPhrase] = useState("");
    // const [beforePhrase, setBeforePhrase] = useState(phrase);
    const [opac, setOpac] = useState(0);
    const [befOpac, setBefOpac] = useState(1);
    let light2 = false;

    // const springColor = useSpring({
    //     from:{ color: `hsl(${beforeColor}, 60%, 58%)`},
    //     color:`hsl(${numColor}, 60%, 58%)`,
    //     config: { mass: 40, tension: 170, friction: 26, clamp: true }
    // })

    const springBackgroundColor = useSpring({
        from:{ backgroundColor: `hsl(${beforeColor}, 60%, 58%)`},
        backgroundColor:`hsl(${numColor}, 60%, 58%)`,
        config: { mass: 40, tension: 170, friction: 26, clamp: true }
    })

    const springText = useSpring({
        from:{ 
            opacity: opac,
            color: `hsl(${beforeColor}, 60%, 58%)`,
            display: opac?"":"none"
        },
        to:{
            opacity: befOpac,
            color:`hsl(${numColor}, 60%, 58%)`,
            display: befOpac?"":"none"
        },
        config: { mass: 40, tension: 170, friction: 26, clamp: true }
    })

    const springTextR = useSpring({
        from:{ opacity: befOpac, 
            color: `hsl(${beforeColor}, 60%, 58%)`,
            display: befOpac?"":"none"
        },
        to:{
            opacity:opac,
            color:`hsl(${numColor}, 60%, 58%)`,
            display: opac?"":"none"
        },
        config: { mass: 40, tension: 170, friction: 26, clamp: true }
    })

    function lightEffect(id){
        let button = document.getElementById(id);
        if(light2){
            button.style.backgroundColor = `hsl(${numColor}, 60%, 70%)`;
        } else {
            button.style.backgroundColor = `hsl(${numColor}, 60%, 58%)`;
        }
    }

    useEffect(() => {
        fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
        .then(data => {
            setPhrase(data.value);
        })
    },[color])

    return (
        <animated.div style = {springBackgroundColor} id="quote-bg">
            <animated.main id='quote-box'>
                <animated.div>
                    <animated.h2 
                        style = {springText}
                        id="text" className="texts">
                            <i id="quoteSymbol" className="bi bi-quote"></i>{` ${opac?"":phrase}`}
                    </animated.h2>
                    <animated.h2 
                        style = {springTextR}
                        id="text2" className="texts">
                            <i id="quoteSymbol2" className="bi bi-quote"></i>{` ${opac?phrase:""}`}
                    </animated.h2>
                    <animated.p style={springText} id="author" className="authors">-{author}</animated.p>
                    <animated.p style={springTextR} id="author2" className="authors">-{author}</animated.p>
                </animated.div>
                <div id="buttons">
                    <animated.button 
                        style={springBackgroundColor} 
                        id="new-quote" 
                        onMouseOver={()=>{
                            light2 = true;
                            lightEffect("new-quote");
                        }} 
                        onMouseLeave={()=>{
                            light2 = false;
                            lightEffect("new-quote");
                        }} 
                        onClick={() => {
                            setBeforeColor(numColor);
                            setNumColor(randomNumber(1,361));
                            // setBeforePhrase(phrase);
                            setColor(!color);
                        
                            if(opac){
                                setOpac(0);
                                setBefOpac(1);
                            }else{
                                setOpac(1);
                                setBefOpac(0);
                            }}
                        }>New quote</animated.button>
                    <animated.a 
                        style={springBackgroundColor}
                        onMouseEnter={()=>{
                            // setLight2(false);
                            light2 = !light2;
                            lightEffect("tweet-quote");
                        }} 
                        onMouseLeave={()=>{
                            // setLight2(true);
                            light2 = !light2;
                            lightEffect("tweet-quote");
                        }}  
                        href="https://twitter.com/intent/tweet" target="_blank" id="tweet-quote">
                            <i className="bi bi-twitter"></i>
                    </animated.a>
                </div>
            </animated.main>
            <h2>by Darker69🐱‍👤</h2>      
        </animated.div>
    )
}