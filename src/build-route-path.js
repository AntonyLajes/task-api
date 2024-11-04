export function buildRoutePath(url){
    const routePathParamsRegex = /:([a-zA-Z]+)/g
    const pathWithParams = url.replaceAll(routePathParamsRegex, `(?<$1>[a-z0-9\-_]+)`)
    const pathWithRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    
    return pathWithRegex
}