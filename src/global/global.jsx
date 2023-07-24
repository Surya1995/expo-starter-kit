export function convertQueryParams(params) {
    const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    return queryString;
}
