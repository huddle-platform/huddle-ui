
const productionConfig= {
    gqlUrl:'https://huddle.ridilla.eu/api/query',
    kratosUrl:'https://huddle.ridilla.eu/.ory/kratos',
}
const localConfig= {
    gqlUrl: 'http://localhost:8080/api/query',
    kratosUrl: 'http://localhost:8090',
}

const config=productionConfig
export default config