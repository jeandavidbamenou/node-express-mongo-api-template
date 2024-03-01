export function repportServerInternalError(err, req, res, next)
{
    console.error(err.stack)
    res.status(500).json({error: `server internal error`})
}

export function makeErrorSafe(requestHandler)
{
    return (req, res, next) => Promise.resolve(requestHandler(req, res, next)).catch(next)
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
            return response.status(401).json({ error: 'invalide request body' })
        next()
    }
}
