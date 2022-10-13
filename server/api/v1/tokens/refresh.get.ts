import { JwtPayload } from 'jsonwebtoken';
import { getTokenByToken } from "~~/server/db/refreshTokens"
import { decodeRefreshToken, generateTokens } from "~~/server/utils/jwt"
import { getUserById } from '~~/server/db/user';

export default defineEventHandler(async event => {
    //get cookies to check for refresh token
    const cookies = useCookies(event)
    //grab refresh token from cookies
    const cookieToken = cookies.refresh_token
    //return when no cookie found
    if(!cookieToken){
        return {
            msg: 'No Token Found'
        }
    } 
    //check in db for refreshToken
    const rToken = await getTokenByToken(cookieToken)
    if(!rToken){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'invalid token'
        }))
    }
    //verify jwt with refreshSecrete and return results
    const decoded = decodeRefreshToken(rToken.token) as JwtPayload

    //throw error if token is not valid
    if(!decoded){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'invalid token'
        }))
    }
    const user = await getUserById(decoded.user)
    const { accessToken } = generateTokens(user)

    return {
        data: 
        {
            access_Token: accessToken
        }
    }

})