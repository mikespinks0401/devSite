import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { getUserById } from '../db/user';






export default defineEventHandler( async event => {
    const requestedUrl = event.req.url
    //Require all paths that are not login or Register with Auth in pathname to require Authorization Header
    if(!requestedUrl.includes('auth')){
        return
    }
    if(requestedUrl.includes('login') || requestedUrl.includes('register')){
        return
    }
    //Check For Required Authorization Header
    const authorization = event.req.headers.authorization
    //Return If Header is missing
    if(!authorization){
        return
    }

    const authToken = authorization.split(" ")[1]
    if(!authToken){
        return
    }
    try{      
        const decoded:JwtPayload = jwt_decode(authToken)
        const userId = decoded.userId
        const user = await getUserById(userId)
        event.req.context.auth = {
            user: user
        }
    } catch (err){
        return
    }
})