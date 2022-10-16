import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { getTokenByToken, deleteToken } from "~~/server/db/refreshTokens"
import { decodeRefreshToken, sendRefreshToken } from '~~/server/utils/jwt';

export default defineEventHandler(async  event => {
    
    //Make Sure Access Token User and Refresh Token User Are The Same
    
    //Get User Info From Auth Middleware
    const user = event.context.auth.user
    
    const accessTokenId = user.id
    const cookies = useCookies(event)
    const refreshToken = cookies.refresh_token
    const rToken = await getTokenByToken(refreshToken)
    if(!rToken){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'invalid request'
        }))
    }

    //Compare AccessToken Id to ID associated with refreshtoken on cookie
    if(accessTokenId !== rToken.userId){
        return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }))
        }
    //delete token from db to prevent futher authentication of token
    const deleted = await deleteToken(refreshToken)
    if(!deleted){
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Server Error'
            }))
    }
    
    deleteCookie(event, 'refresh_token')
    return {
        msg: 'Successfully Logged Out'
    }
})