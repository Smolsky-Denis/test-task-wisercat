
const utils = {}

utils.fetch = (url, args) => {
    const requestData = {
        method: args.method,
        headers: {
            'Content-Type': 'application/json',
            ...args.headers
        }
    }

    // let requestUrl = 'http://localhost:3002' + url
    let requestUrl = 'http://' + url


    if (args.body) {
        if (typeof args.body === 'string') {
            requestData.body = args.body;
        } else {
            requestData.body = JSON.stringify(args.body);
        }
    }

    return fetch(requestUrl, requestData)
        .then((response) => {
            return response.json()
        })
}

utils.showError = () => {

}

export default utils