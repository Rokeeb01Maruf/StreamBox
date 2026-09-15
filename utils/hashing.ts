import { argon2id, argon2Verify } from "hash-wasm"

export const hash = async(password :string) => {
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const result = await argon2id(
        {
            password : password,
            salt : salt,
            parallelism: 1,
            iterations: 3,
            memorySize: 65536,
            hashLength: 32,
            outputType: "encoded"
        }
    )

    return result
}

export const verify = async({password, hash}:{password: string, hash : string}) => {

    const result = await argon2Verify(
        {
            password: password, 
            hash:hash,
        }
    )
    return result
}