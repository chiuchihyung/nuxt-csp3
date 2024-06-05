import { randomBytes } from 'crypto'

const nonce = randomBytes(24).toString('base64')

export default function cspModule() {
  // Set nuxt CSP options.
  this.options.render.csp = {
    reportOnly: false,
    hashAlgorithm: 'sha256',
    // Make sure unsafe-inline is always sent along with generated hashes to support browsers not compatible with CSP2.
    unsafeInlineCompatibility: true,
    policies: {
      // https://csp.withgoogle.com/docs/strict-csp.html
      'script-src': [
        // A random nonce as well as hashes for inline scripts are added to script-src
        // by nuxt.
        // Allow the execution of scripts dynamically added to the page, as long as they were loaded by a safe, already-trusted script.
        // This requires CSP3. Browsers that support this will ignore unsafe-inline, unsafe-eval, self and host based source lists.
       // "'strict-dynamic'",
        // Allow unsafe inline scripts. This is used as a fallback for browsers that do not support CSP2.
        // Browsers supporting CSP2 will ignore unsafe-inline because we set a nonce and hashes.
        "'unsafe-inline'",
        // Allow scripts to be loaded from all hosts. This is used as a fallback for browsers that do not support CSP3
        // to make our site compatible with those older browsers. We don't have full protection in those older browsers.
        "'self'",
        `'nonce-${nonce}'`
      ],
      // Prevents fetching and executing plugin resources embedded using <object>, <embed> or <applet> tags.
      // The most common example is Flash.
      'object-src': ["'none'"],
      // Disables <base> URIs, preventing attackers from changing the locations of scripts loaded from relative URLs.
      'base-uri': ["'none'"],
      'require-trusted-types-for': ["'script'"],
      'style-src': [`'nonce-${nonce}'`,"'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:'],
      'connect-src': ["'self'"],
      'frame-src': ["'self'"],
      'frame-ancestors': ["'self'"],
      'font-src': ["'self'",'data:'],
      'media-src': ["'self'"],
      'manifest-src': ["'self'"],
      'worker-src': ["'self'"],
      'form-action': ["'self'"]
    },

    // script-src, style-src, img-src, connect-src, frame-src, frame-ancestors, font-src, media-src, manifest-src, worker-src, form-action
  }

  this.nuxt.hook('vue-renderer:ssr:context', (context) => {
    // Generate a 128 bit random nonce every request.
    // const nonce = randomBytes(5).toString('base64')
    // Inject nonce into vuex state before state is serialized into window.__NUXT__.
    context.nuxt.state.nonce = nonce
  })

  this.nuxt.hook(
    'render:route',
    (url, result, context) => {
      // Extract nonce generated in render:routeContext.
      const nonce = context.nuxt.state.nonce
      // Add nonce to cspScriptSrcHashes. Nuxt will populate all entries in this array
      // to the csp header and meta tags as part of the script-src csp policy.

      result.cspScriptSrcHashes.push(`'nonce-${nonce}'`)
      result.html  = result.html.replace(/<script/g, `<script nonce="${nonce}"`).replace(/<style/g, `<style nonce="${nonce}"`)
    }
  )

  this.nuxt.hook('render:routeContext', (context) => {
    //console.log(context)  
  })


}
