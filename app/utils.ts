export const IV_SIZE = 16;

export async function hashEncode(str: string): Promise<CryptoKey> {
    const encodedMessage = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedMessage);
    return await window.crypto.subtle.importKey(
        "raw",
        new Uint8Array(hashBuffer).buffer,
        "AES-CTR",
        false,
        ["encrypt", "decrypt"],
    );
}

export async function decryptMessage(ciphertext: ArrayBuffer, iv: Uint8Array, password: string): Promise<string> {
    const ivUint8Arr = Uint8Array.from(iv);
    const key = await hashEncode(password);
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: ivUint8Arr,
            length: 128
        },
        key,
        ciphertext,
    );
    const decoded = new TextDecoder().decode(decrypted);
    return decoded;
}

export async function encryptMessage(rawData: string, iv: Uint8Array, password: string) {
    // hash the message
    const key_encoded = await hashEncode(password);
    const encodedText = new TextEncoder().encode(rawData);
    const ivUint8Arr = Uint8Array.from(iv);
    return await window.crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter: ivUint8Arr,
            length: 128,
        },
        key_encoded,
        encodedText,
    );
}

export function parseCryptChunks(crypt: string): [Uint8Array, string] {
    const ivChunk = crypt.split("").slice(0, IV_SIZE).toString();
    const iv = Buffer.from(ivChunk, "utf-8");
    const message = crypt.split("").slice(IV_SIZE, crypt.length).toString();
    return [iv, message];
}
