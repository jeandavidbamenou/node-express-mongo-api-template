// middlewar for server internal error handing
export function repportServerInternalError(err, req, res, next)
{
    console.error(err.stack)
    res.status(500).json({error: `server internal error`})
}

// take a request handler as an argument and provide for it an error safe wrapper
export function makeErrorSafe(requestHandler)
{
    return (req, res, next) => Promise.resolve(requestHandler(req, res, next)).catch(next)
}
