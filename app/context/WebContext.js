"use client"

import { createContext, useContext, useState } from "react";

const WebContext = createContext();

export const WebProvider = ({children}) => {
    const [url, setUrl] = useState('');
    const [preferredUrl, setPreferredUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    return(
        <WebContext.Provider value={{url, setUrl, preferredUrl, setPreferredUrl, shortUrl, setShortUrl}}>
            {children}
        </WebContext.Provider>
    )
}

export const useFormStates = () => useContext(WebContext);

