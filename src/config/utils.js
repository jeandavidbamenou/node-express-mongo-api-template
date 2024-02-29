export async function errorSafeWrapper(requesthandler)
{
    return async function(req, res, next)
    {
        try
        {
            await requesthandler(req, res, next)
        }
        catch(error)
        {
            console.log(`${error.name}: ${error.message}`)
            res.status(500).json({error: 'server bug'})
        }
    }
}

export function pickValue(obj, path)
{
    return path.split(':').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : undefined, obj)
}

export function requireRequestBodyField(path, fields)
{
    return function(request, response, next)
    {
        const obj = pickValue(request, path)

        if (!obj || !fields.every(field => obj.hasOwnProperty(field)))
            return response.status(401).json({error: 'invalide request body'})
        next()
    }
}
