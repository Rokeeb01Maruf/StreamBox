import { db } from "./database"
import { verify } from "../utils/hashing"
import type { userInputType, SigninDetailType } from "../utils/type"
import { hash } from "../utils/hashing"
import { storeCurrentUser } from "../utils/session"

export const signUpUser = async ({ email, nickname, password }: userInputType) => {
    const passwordHash = await hash(password)
    try {
        const user = await db.users.where("email").equals(email).first()
        if (user){
            return (
                { success: false, message: "user already exists" }
            )
        }else{
            const storeUser = await db.users.add(
                {
                    id: crypto.randomUUID(),
                    email: email,
                    nickname: nickname,
                    password: passwordHash
                }
            )
            const user = await getUser(storeUser)
            if (!user) {
                return { success: false, message: "failed to create an account" }
            }
            storeCurrentUser(user.id)
            return ({
                success: true,
                message: "user signed up successfully",
                data: {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname
                }
            })
        }
    } catch (err) {
        return { success: false, message: "failed to create an account" }
    }
}

export const getUser = async (id: string) => {
    const user = await db.users.get(id)
    return user
}

export const signInUser = async ({ email, password }: SigninDetailType) => {
    let user
    try {
        user = await db.users.where("email").equals(email).first()
    } catch (err) {
        return { success: false, message: "invalid email or password" }
    }

    if (!user) {
        return { success: false, message: "invalid email or password" }
    }

    const verifyPass = await verify({ password: password, hash: user.password })

    if (!verifyPass) return { success: false, message: "invalid email or password" }

    storeCurrentUser(user.id)

    return ({
        success: true,
        message: "signin successfully",
        data: {
            id: user.id,
            email: user.email,
            nickname: user.nickname
        }
    })
}

export const getCurrentUser = async () => {
    const currentUser = localStorage.getItem("streambox_current_user")
    if (!currentUser) return { success: false, message: "user is unauthenticated", data: {} }

    const user = await db.users.get(currentUser)

    if (!user) {
        return { success: false, message: "user is unauthenticated", data: {} };
    } else {
        return {
            success: true,
            message: "user is authenticated",
            data: {
                id: user.id,
                email: user.email,
                nickname: user.nickname
            }
        }
    }
}

export const signOutUser =  () => {
    localStorage.removeItem("streambox_current_user")
    return true
}

export const getWatchHistory = async(userId :string) => {
    const data = await db.watchHistory.where("userId").equals(userId).toArray()
    return data
}

export const addToWatchHistory = async(movieId :number) => {
    const user = await getCurrentUser()
    if(user.success === true && user.data.id){
        try{
            await db.watchHistory
            .where("[userId+movieId]")
            .equals([user.data.id, movieId])
            .modify({watchedAt: Date.now()})
        }catch(err){
            await db.watchHistory
            .add({
                id: crypto.randomUUID(),
                userId: user.data.id,
                movieId: movieId,
                watchedAt: Date.now()
            })
        }
        return({
            success: true,
            message: "added to watch history"
        })
    }
    return
}