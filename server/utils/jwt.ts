import jwt from 'jsonwebtoken'
import jwt_decode, { JwtPayload } from 'jwt-decode'

const refreshTokenTime = "1h"

const generateAccessToken = (user) => {

    const config = useRuntimeConfig()
    
    return jwt.sign({userId: user.id}, config.jwtAccessSecret, {expiresIn: '5min'})
}

const generateRefreshToken = (user, rememberMe = false) => {
    //Set Token Expirty Time To 7 Days if remember me is checked
    const expiresInTime = rememberMe === true ? '7d' : refreshTokenTime
    const config = useRuntimeConfig()

    return jwt.sign({user: user.id}, config.jwtRefreshSecret, {expiresIn: expiresInTime})
}

//create token 
export const genarateForgotPasswordToken = (user, secret) => {
    const config = useRuntimeConfig()
    const token = jwt.sign({user: user.id, s: secret}, config.jwtForgotSecret, {expiresIn: '10min'})

    return token
}

export const decodeForgotPasswordToken = (token) => {
    const config = useRuntimeConfig()
    try{
        return jwt.verify(token, config.jwtForgotSecret)
    }catch(err){
        
    }
}


export const decodeRefreshToken = (token) => {
    const config = useRuntimeConfig()
    try{
        const decoded =  jwt.verify(token, config.jwtRefreshSecret)
        return decoded
    }catch (err){

    }
}

export const generateTokens = (user, rememberMe:boolean = false) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user, rememberMe)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}


export const sendRefreshToken = (event, token) => {
    //decode token to get the time diff to set cookie 
    const decoded:JwtPayload = jwt_decode(token)
    //add the maxAge value when the token is set to remember me
    const timeDiff = decoded.exp - decoded.iat
    if(timeDiff > 3600){
        setCookie(event, 'refresh_token', token, {
            maxAge: timeDiff,
            httpOnly: true,
            sameSite: true,
        })
    } else {
        setCookie(event, 'refresh_token', token, {
            maxAge: timeDiff,
            httpOnly: true,
            sameSite: true,
        })
    }
}