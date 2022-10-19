export default defineEventHandler( async event => {
    const query = useQuery(event)
    const token = query.token
    const id = query.id
    if(event.req.headers.referer !== 'noreferer'){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'unauthorized'
        }))
    }
})