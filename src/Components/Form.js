import PropTypes from "prop-types";
import React, { Component } from "react";
import { useState ,useEffect,useRef} from "react";
import axios, * as others from "axios";
import { FaExchangeAlt } from "react-icons/fa";
import { RxSpeakerLoud } from "react-icons/rx";
import { MdOutlineClose, MdOutlineContentCopy,MdOutlineDone} from "react-icons/md";
import Spinner from 'react-bootstrap/Spinner';


function Form() {

  const [To, setTo] = useState("en");
  const [Convert, setConvert] = useState("en");
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");
  const [options, setOptions] = useState([]);
  const [Icopy,setIcopy]=useState(false);
  const [Loading,setLoading]=useState(false)
  const textarearef = useRef(null)
  
  useEffect(() => {
    axios({
      method: "get",
      url: "https://libretranslate.com/languages",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => console.log(err));
  });


  const translate=async()=>{
    if(Convert==To){
      setoutput(input)
    }
    else{
      setLoading(true)
      setoutput("Loading.."); 
      try{
          const encodedParams = new URLSearchParams();
          encodedParams.append("source_language",Convert);
          encodedParams.append("target_language", To);
          encodedParams.append("text", input);
      
          const trans = {
            method: "post",
            url: "https://text-translator2.p.rapidapi.com/translate",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "51f919484dmsh1025f8582815105p152442jsn758463367543",
              "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
            },
            data: encodedParams,
          };
          await axios.request(trans)
          .then((res) => {
                  setoutput(res.data.data.translatedText);
            })
      }catch(error){
        console.error(error)
      }      
    }
    setLoading(false)
  };

  const speak=()=>{
    let utterance= new SpeechSynthesisUtterance(input);
    return speechSynthesis.speak(utterance);
  };

  const erase=()=>{
    setinput("");
  };

  const exchange=()=>{
    const temp=Convert;
    setConvert(To);
    setTo(temp);
  }

  const copy=()=>{
    textarearef.current.select();
    document.execCommand("copy");
    setIcopy(true);
    setTimeout(() => {
      setIcopy(false)
    }, 2000);
  }


  return (
    <div className="form">
      <select
        className="opt"
        value={Convert}
        onChange={(e) => setConvert(e.target.value)}
      >
        {options.map((opt) => {
          return (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          );
        })}
      </select>
      <button onClick={exchange} className="exchange">
        <FaExchangeAlt />
      </button>
      <select
        className="opt"
        value={To}
        onChange={(e) => setTo(e.target.value)}
      >
        {options.map((opt) => {
          return (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          );
        })}
      </select>
      <div className="data">
        <div className="data1">
          <textarea
            cols="50"
            rows="10"
            placeholder="Enter Text"
            value={input}
            onInput={(e) => setinput(e.target.value)}
          ></textarea>
          <button className="spk" onClick={speak}>
            <RxSpeakerLoud />
          </button>
          <button onClick={erase} className="spk ers">
            <MdOutlineClose />
          </button>
        </div>
        <div className="data2">
          <textarea
            cols="50"
            rows="10"
            placeholder="Translation"
            value={output}
            ref={textarearef}
            readOnly
          ></textarea>
          <button onClick={copy} className="spk ers toggle">
            {Icopy ? <MdOutlineDone /> : <MdOutlineContentCopy />}
          </button>
        </div>
      </div>
      <div>
        <button type="button" onClick={translate}>
          Translate
        </button>
      </div>
      <div className="bottom">
      </div>
    </div>
  );
}

export default Form;
