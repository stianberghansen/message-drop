'use client';

import { useState } from "react";
import { decryptMessage, encryptMessage } from "./utils";

export default function Encrypter({ hostname, iv }: { hostname: string, iv: Uint8Array }): JSX.Element {
    const [rawData, setRawData] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [decrypted, setDecrypted] = useState<string>("");
    const [encryptedContent, setEncryptedContent] = useState<ArrayBuffer>(new ArrayBuffer(0));

    const onHandleEncryptMessage = async (): Promise<void> => {
        const encrypted_content = await encryptMessage(rawData, iv, password);
        setEncryptedContent(encrypted_content);
    }

    async function handleDecryptMessage(encryptedContent: ArrayBuffer, iv: Uint8Array, password: string) {
        const text = await decryptMessage(encryptedContent, iv, password);
        setDecrypted(text);
    }

    const createSecretUrl = (): string => {
        const asciiText = new TextDecoder().decode(encryptedContent);
        const url = `${hostname}` + "/decrypt?crypt=" + `${asciiText}`;
        return url;
    }

    return (
        <>
            <h1>Encrypt a secret message</h1>
            <label htmlFor="message">Set hidden string</label>
            <input type="text" onChange={(e) => setRawData(e.target.value)} id="message" />
            <label htmlFor="pwd">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} id="pwd" />
            <input type="submit" onClick={() => onHandleEncryptMessage()} value="Encrypt" />
            <p onClick={() => navigator.clipboard.writeText(createSecretUrl())}
            >
                {createSecretUrl()}
            </p>
            <input type="submit"
                onClick={(e) => {
                    e.preventDefault()
                    handleDecryptMessage(encryptedContent, iv, password)
                }}
                value="Decrypt"
            />
            <input type="text" value={decrypted} readOnly />
        </>
    )
};