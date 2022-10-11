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

export const decodeRefreshToken = (token) => {
    const config = useRuntimeConfig()

    try{
        return jwt.verify(token, config.jwtRefreshSecret)
    }catch (err){
        return null
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

    if(timeDiff > 3000){
        setCookie(event.res, 'refresh_token', token, {
            maxAge: timeDiff,
            httpOnly: true,
            sameSite: true,
        })
    } else {
        setCookie(event.res, 'refresh_token', token, {
            httpOnly: true,
            sameSite: true,
        })
    }
}