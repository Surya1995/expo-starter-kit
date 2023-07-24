let config;

const local = {
    api_url: "https://fakestoreapi.com",
};

const dev = {
    api_url: "https://fakestoreapi.com",
};

const prod = {
    api_url: "https://fakestoreapi.com",
};

config = dev;

if (process.env.NODE_ENV === "local") {
    config = local;
}

if (process.env.NODE_ENV === "prod") {
    config = prod;
}

export default config;
