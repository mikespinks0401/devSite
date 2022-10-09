import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {

    const config = useRuntimeConfig()
    
    return jwt.sign({userId: user.id}, config.jwtAccessSecret, {expiresIn: '5min'})
}

const generateRefreshToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({user: user.id }, config.jwtRefreshSecret, {expiresIn: '3d'})
}

export const decodeRefreshToken = (token) => {
    const config = useRuntimeConfig()

    try{
        return jwt.verify(token, config.jwtRefreshSecret)
    }catch (err){
        return null
    }
}

export const generateTokens = (user) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }

}