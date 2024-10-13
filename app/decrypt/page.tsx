'use client';

import { useState } from "react";
import { decryptMessage, parseCryptChunks } from "../utils";

export default function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}
) {
    const [password, setPassword] = useState<string>("");
    const crypt = searchParams['crypt'];

    const handleDecryptMessage = async () => {
        if (typeof crypt == 'string') {
            const [iv, message] = parseCryptChunks(crypt);
            const decryptedData = await decryptMessage(message, iv, password);
            console.log(decryptedData);
        }
    }

    return (
        <div>
            <h1>Hello</h1>
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} id="password" />
            <input type="submit" onClick={() => handleDecryptMessage()} />
        </div>
    )
}