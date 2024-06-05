# nuxt-csp3

> 弱點掃描遇到 CSP 中度嚴重性 問題

1.用了 nonce-value 後，就不需再加 strict-dynamic

2. nuxt.config.js 新增
build: {
        extractCSS: true,
}

<img width="1551" alt="截圖 2024-06-05 下午1 36 41" src="https://github.com/chiuchihyung/nuxt-csp3/assets/285322/885b1dfc-a0cf-4f9d-9760-bc5caccd6d04">


## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

