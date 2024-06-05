# nuxt-csp3

> 弱點掃描遇到 CSP 中度嚴重性 問題

1.用了 nonce-value 後，就不需再加 strict-dynamic

2. nuxt.config.js 新增
# build: {
#        extractCSS: true,
# }



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

