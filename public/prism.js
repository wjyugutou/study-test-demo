/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+css-extras+json+json5+jsonp+markdown+jsx+tsx+typescript&plugins=line-highlight+line-numbers+inline-color+previewers+match-braces */
/// <reference lib="WebWorker"/>

const _self = (typeof window !== 'undefined')
  ? window // if in browser
  : (
      (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
        ? self // if in worker
        : {} // if in node js
    )

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
const Prism = (function (_self) {
  // Private helper vars
  const lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
  let uniqueId = 0

  // The grammar object for plaintext
  const plainTextGrammar = {}

  var _ = {
    /**
     * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
     * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
     * additional languages or plugins yourself.
     *
     * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
     *
     * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.manual = true;
     * // add a new <script> to load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    manual: _self.Prism && _self.Prism.manual,
    /**
     * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
     * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
     * own worker, you don't want it to do this.
     *
     * By setting this value to `true`, Prism will not add its own listeners to the worker.
     *
     * You obviously have to change this value before Prism executes. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.disableWorkerMessageHandler = true;
     * // Load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

    /**
     * A namespace for utility methods.
     *
     * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
     * change or disappear at any time.
     *
     * @namespace
     * @memberof Prism
     */
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token)
          return new Token(tokens.type, encode(tokens.content), tokens.alias)
				 else if (Array.isArray(tokens))
          return tokens.map(encode)
				 else
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00A0/g, ' ')
      },

      /**
       * Returns the name of the type of the given value.
       *
       * @param {any} o
       * @returns {string}
       * @example
       * type(null)      === 'Null'
       * type(undefined) === 'Undefined'
       * type(123)       === 'Number'
       * type('foo')     === 'String'
       * type(true)      === 'Boolean'
       * type([1, 2])    === 'Array'
       * type({})        === 'Object'
       * type(String)    === 'Function'
       * type(/abc+/)    === 'RegExp'
       */
      type(o) {
        return Object.prototype.toString.call(o).slice(8, -1)
      },

      /**
       * Returns a unique number for the given object. Later calls will still return the same number.
       *
       * @param {object} obj
       * @returns {number}
       */
      objId(obj) {
        if (!obj.__id)
          Object.defineProperty(obj, '__id', { value: ++uniqueId })

        return obj.__id
      },

      /**
       * Creates a deep clone of the given object.
       *
       * The main intended use of this function is to clone language definitions.
       *
       * @param {T} o
       * @param {Record<number, any>} [visited]
       * @returns {T}
       * @template T
       */
      clone: function deepClone(o, visited) {
        visited = visited || {}

        let clone; let id
        switch (_.util.type(o)) {
          case 'Object':
            id = _.util.objId(o)
            if (visited[id])
              return visited[id]

            clone = /** @type {Record<string, any>} */ ({})
            visited[id] = clone

            for (const key in o) {
              if (o.hasOwnProperty(key))
                clone[key] = deepClone(o[key], visited)
            }

            return /** @type {any} */ (clone)

          case 'Array':
            id = _.util.objId(o)
            if (visited[id])
              return visited[id]

            clone = []
            visited[id] = clone;

            (/** @type {Array} */(/** @type {any} */(o))).forEach((v, i) => {
              clone[i] = deepClone(v, visited)
            })

            return /** @type {any} */ (clone)

          default:
            return o
        }
      },

      /**
       * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
       *
       * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
       *
       * @param {Element} element
       * @returns {string}
       */
      getLanguage(element) {
        while (element) {
          const m = lang.exec(element.className)
          if (m)
            return m[1].toLowerCase()

          element = element.parentElement
        }
        return 'none'
      },

      /**
       * Sets the Prism `language-xxxx` class of the given element.
       *
       * @param {Element} element
       * @param {string} language
       * @returns {void}
       */
      setLanguage(element, language) {
        // remove all `language-xxxx` classes
        // (this might leave behind a leading space)
        element.className = element.className.replace(RegExp(lang, 'gi'), '')

        // add the new `language-xxxx` class
        // (using `classList` will automatically clean up spaces for us)
        element.classList.add(`language-${language}`)
      },

      /**
       * Returns the script element that is currently executing.
       *
       * This does __not__ work for line script element.
       *
       * @returns {HTMLScriptElement | null}
       */
      currentScript() {
        if (typeof document === 'undefined')
          return null

        if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */)
          return /** @type {any} */ (document.currentScript)

        // IE11 workaround
        // we'll get the src of the current script by parsing IE11's error stack trace
        // this will not work for inline scripts

        try {
          throw new Error()
        }
        catch (err) {
          // Get file src url from stack. Specifically works with the format of stack traces in IE.
          // A stack will look like this:
          //
          // Error
          //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
          //    at Global code (http://localhost/components/prism-core.js:606:1)

          const src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1]
          if (src) {
            const scripts = document.getElementsByTagName('script')
            for (const i in scripts) {
              if (scripts[i].src == src)
                return scripts[i]
            }
          }
          return null
        }
      },

      /**
       * Returns whether a given class is active for `element`.
       *
       * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
       * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
       * given class is just the given class with a `no-` prefix.
       *
       * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
       * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
       * ancestors have the given class or the negated version of it, then the default activation will be returned.
       *
       * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
       * version of it, the class is considered active.
       *
       * @param {Element} element
       * @param {string} className
       * @param {boolean} [defaultActivation]
       * @returns {boolean}
       */
      isActive(element, className, defaultActivation) {
        const no = `no-${className}`

        while (element) {
          const classList = element.classList
          if (classList.contains(className))
            return true

          if (classList.contains(no))
            return false

          element = element.parentElement
        }
        return !!defaultActivation
      },
    },

    /**
     * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
     *
     * @namespace
     * @memberof Prism
     * @public
     */
    languages: {
      /**
       * The grammar for plain, unformatted text.
       */
      plain: plainTextGrammar,
      plaintext: plainTextGrammar,
      text: plainTextGrammar,
      txt: plainTextGrammar,

      /**
       * Creates a deep copy of the language with the given id and appends the given tokens.
       *
       * If a token in `redef` also appears in the copied language, then the existing token in the copied language
       * will be overwritten at its original position.
       *
       * ## Best practices
       *
       * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
       * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
       * understand the language definition because, normally, the order of tokens matters in Prism grammars.
       *
       * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
       * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
       *
       * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
       * @param {Grammar} redef The new tokens to append.
       * @returns {Grammar} The new language created.
       * @public
       * @example
       * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
       *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
       *     // at its original position
       *     'comment': { ... },
       *     // CSS doesn't have a 'color' token, so this token will be appended
       *     'color': /\b(?:red|green|blue)\b/
       * });
       */
      extend(id, redef) {
        const lang = _.util.clone(_.languages[id])

        for (const key in redef)
          lang[key] = redef[key]

        return lang
      },

      /**
       * Inserts tokens _before_ another token in a language definition or any other grammar.
       *
       * ## Usage
       *
       * This helper method makes it easy to modify existing languages. For example, the CSS language definition
       * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
       * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
       * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
       * this:
       *
       * ```js
       * Prism.languages.markup.style = {
       *     // token
       * };
       * ```
       *
       * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
       * before existing tokens. For the CSS example above, you would use it like this:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'cdata', {
       *     'style': {
       *         // token
       *     }
       * });
       * ```
       *
       * ## Special cases
       *
       * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
       * will be ignored.
       *
       * This behavior can be used to insert tokens after `before`:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'comment', {
       *     'comment': Prism.languages.markup.comment,
       *     // tokens after 'comment'
       * });
       * ```
       *
       * ## Limitations
       *
       * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
       * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
       * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
       * deleting properties which is necessary to insert at arbitrary positions.
       *
       * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
       * Instead, it will create a new object and replace all references to the target object with the new one. This
       * can be done without temporarily deleting properties, so the iteration order is well-defined.
       *
       * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
       * you hold the target object in a variable, then the value of the variable will not change.
       *
       * ```js
       * var oldMarkup = Prism.languages.markup;
       * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
       *
       * assert(oldMarkup !== Prism.languages.markup);
       * assert(newMarkup === Prism.languages.markup);
       * ```
       *
       * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
       * object to be modified.
       * @param {string} before The key to insert before.
       * @param {Grammar} insert An object containing the key-value pairs to be inserted.
       * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
       * object to be modified.
       *
       * Defaults to `Prism.languages`.
       * @returns {Grammar} The new grammar object.
       * @public
       */
      insertBefore(inside, before, insert, root) {
        root = root || /** @type {any} */ (_.languages)
        const grammar = root[inside]
        /** @type {Grammar} */
        const ret = {}

        for (const token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (const newToken in insert) {
                if (insert.hasOwnProperty(newToken))
                  ret[newToken] = insert[newToken]
              }
            }

            // Do not insert token which also occur in insert. See #1525
            if (!insert.hasOwnProperty(token))
              ret[token] = grammar[token]
          }
        }

        const old = root[inside]
        root[inside] = ret

        // Update references in other language definitions
        _.languages.DFS(_.languages, function (key, value) {
          if (value === old && key != inside)
            this[key] = ret
        })

        return ret
      },

      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type, visited) {
        visited = visited || {}

        const objId = _.util.objId

        for (const i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i)

            const property = o[i]
            const propertyType = _.util.type(property)

            if (propertyType === 'Object' && !visited[objId(property)]) {
              visited[objId(property)] = true
              DFS(property, callback, null, visited)
            }
            else if (propertyType === 'Array' && !visited[objId(property)]) {
              visited[objId(property)] = true
              DFS(property, callback, i, visited)
            }
          }
        }
      },
    },

    plugins: {},

    /**
     * This is the most high-level function in Prism’s API.
     * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
     * each one of them.
     *
     * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
     *
     * @param {boolean} [async] Same as in {@link Prism.highlightAllUnder}.
     * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
     * @memberof Prism
     * @public
     */
    highlightAll(async, callback) {
      _.highlightAllUnder(document, async, callback)
    },

    /**
     * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
     * {@link Prism.highlightElement} on each one of them.
     *
     * The following hooks will be run:
     * 1. `before-highlightall`
     * 2. `before-all-elements-highlight`
     * 3. All hooks of {@link Prism.highlightElement} for each element.
     *
     * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
     * @param {boolean} [async] Whether each element is to be highlighted asynchronously using Web Workers.
     * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
     * @memberof Prism
     * @public
     */
    highlightAllUnder(container, async, callback) {
      const env = {
        callback,
        container,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      }

      _.hooks.run('before-highlightall', env)

      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector))

      _.hooks.run('before-all-elements-highlight', env)

      for (var i = 0, element; (element = env.elements[i++]);)
        _.highlightElement(element, async === true, env.callback)
    },

    /**
     * Highlights the code inside a single element.
     *
     * The following hooks will be run:
     * 1. `before-sanity-check`
     * 2. `before-highlight`
     * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
     * 4. `before-insert`
     * 5. `after-highlight`
     * 6. `complete`
     *
     * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
     * the element's language.
     *
     * @param {Element} element The element containing the code.
     * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
     * @param {boolean} [async] Whether the element is to be highlighted asynchronously using Web Workers
     * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
     * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
     *
     * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
     * asynchronous highlighting to work. You can build your own bundle on the
     * [Download page](https://prismjs.com/download.html).
     * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
     * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
     * @memberof Prism
     * @public
     */
    highlightElement(element, async, callback) {
      // Find language
      const language = _.util.getLanguage(element)
      const grammar = _.languages[language]

      // Set language on the element, if not present
      _.util.setLanguage(element, language)

      // Set language on the parent, for styling
      let parent = element.parentElement
      if (parent && parent.nodeName.toLowerCase() === 'pre')
        _.util.setLanguage(parent, language)

      const code = element.textContent

      const env = {
        element,
        language,
        grammar,
        code,
      }

      function insertHighlightedCode(highlightedCode) {
        env.highlightedCode = highlightedCode

        _.hooks.run('before-insert', env)

        env.element.innerHTML = env.highlightedCode

        _.hooks.run('after-highlight', env)
        _.hooks.run('complete', env)
        callback && callback.call(env.element)
      }

      _.hooks.run('before-sanity-check', env)

      // plugins may change/add the parent/element
      parent = env.element.parentElement
      if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex'))
        parent.setAttribute('tabindex', '0')

      if (!env.code) {
        _.hooks.run('complete', env)
        callback && callback.call(env.element)
        return
      }

      _.hooks.run('before-highlight', env)

      if (!env.grammar) {
        insertHighlightedCode(_.util.encode(env.code))
        return
      }

      if (async && _self.Worker) {
        const worker = new Worker(_.filename)

        worker.onmessage = function (evt) {
          insertHighlightedCode(evt.data)
        }

        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true,
        }))
      }
      else {
        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language))
      }
    },

    /**
     * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
     * and the language definitions to use, and returns a string with the HTML produced.
     *
     * The following hooks will be run:
     * 1. `before-tokenize`
     * 2. `after-tokenize`
     * 3. `wrap`: On each {@link Token}.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @param {string} language The name of the language definition passed to `grammar`.
     * @returns {string} The highlighted HTML.
     * @memberof Prism
     * @public
     * @example
     * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
     */
    highlight(text, grammar, language) {
      const env = {
        code: text,
        grammar,
        language,
      }
      _.hooks.run('before-tokenize', env)
      if (!env.grammar)
        throw new Error(`The language "${env.language}" has no grammar.`)

      env.tokens = _.tokenize(env.code, env.grammar)
      _.hooks.run('after-tokenize', env)
      return Token.stringify(_.util.encode(env.tokens), env.language)
    },

    /**
     * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
     * and the language definitions to use, and returns an array with the tokenized code.
     *
     * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
     *
     * This method could be useful in other contexts as well, as a very crude parser.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @returns {TokenStream} An array of strings and tokens, a token stream.
     * @memberof Prism
     * @public
     * @example
     * let code = `var foo = 0;`;
     * let tokens = Prism.tokenize(code, Prism.languages.javascript);
     * tokens.forEach(token => {
     *     if (token instanceof Prism.Token && token.type === 'number') {
     *         console.log(`Found numeric literal: ${token.content}`);
     *     }
     * });
     */
    tokenize(text, grammar) {
      const rest = grammar.rest
      if (rest) {
        for (const token in rest)
          grammar[token] = rest[token]

        delete grammar.rest
      }

      const tokenList = new LinkedList()
      addAfter(tokenList, tokenList.head, text)

      matchGrammar(text, tokenList, grammar, tokenList.head, 0)

      return toArray(tokenList)
    },

    /**
     * @namespace
     * @memberof Prism
     * @public
     */
    hooks: {
      all: {},

      /**
       * Adds the given callback to the list of callbacks for the given hook.
       *
       * The callback will be invoked when the hook it is registered for is run.
       * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
       *
       * One callback function can be registered to multiple hooks and the same hook multiple times.
       *
       * @param {string} name The name of the hook.
       * @param {HookCallback} callback The callback function which is given environment variables.
       * @public
       */
      add(name, callback) {
        const hooks = _.hooks.all

        hooks[name] = hooks[name] || []

        hooks[name].push(callback)
      },

      /**
       * Runs a hook invoking all registered callbacks with the given environment variables.
       *
       * Callbacks will be invoked synchronously and in the order in which they were registered.
       *
       * @param {string} name The name of the hook.
       * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
       * @public
       */
      run(name, env) {
        const callbacks = _.hooks.all[name]

        if (!callbacks || !callbacks.length)
          return

        for (var i = 0, callback; (callback = callbacks[i++]);)
          callback(env)
      },
    },

    Token,
  }
  _self.Prism = _

  // Typescript note:
  // The following can be used to import the Token type in JSDoc:
  //
  //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

  /**
   * Creates a new token.
   *
   * @param {string} type See {@link Token#type type}
   * @param {string | TokenStream} content See {@link Token#content content}
   * @param {string|string[]} [alias] The alias(es) of the token.
   * @param {string} [matchedStr] A copy of the full string this token was created from.
   * @class
   * @global
   * @public
   */
  function Token(type, content, alias, matchedStr) {
    /**
     * The type of the token.
     *
     * This is usually the key of a pattern in a {@link Grammar}.
     *
     * @type {string}
     * @see GrammarToken
     * @public
     */
    this.type = type
    /**
     * The strings or tokens contained by this token.
     *
     * This will be a token stream if the pattern matched also defined an `inside` grammar.
     *
     * @type {string | TokenStream}
     * @public
     */
    this.content = content
    /**
     * The alias(es) of the token.
     *
     * @type {string|string[]}
     * @see GrammarToken
     * @public
     */
    this.alias = alias
    // Copy of the full string this token was created from
    this.length = (matchedStr || '').length | 0
  }

  /**
   * A token stream is an array of strings and {@link Token Token} objects.
   *
   * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
   * them.
   *
   * 1. No adjacent strings.
   * 2. No empty strings.
   *
   *    The only exception here is the token stream that only contains the empty string and nothing else.
   *
   * @typedef {Array<string | Token>} TokenStream
   * @global
   * @public
   */

  /**
   * Converts the given token or token stream to an HTML representation.
   *
   * The following hooks will be run:
   * 1. `wrap`: On each {@link Token}.
   *
   * @param {string | Token | TokenStream} o The token or token stream to be converted.
   * @param {string} language The name of current language.
   * @returns {string} The HTML representation of the token or token stream.
   * @memberof Token
   * @static
   */
  Token.stringify = function stringify(o, language) {
    if (typeof o == 'string')
      return o

    if (Array.isArray(o)) {
      let s = ''
      o.forEach((e) => {
        s += stringify(e, language)
      })
      return s
    }

    const env = {
      type: o.type,
      content: stringify(o.content, language),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language,
    }

    const aliases = o.alias
    if (aliases) {
      if (Array.isArray(aliases))
        Array.prototype.push.apply(env.classes, aliases)
			 else
        env.classes.push(aliases)
    }

    _.hooks.run('wrap', env)

    let attributes = ''
    for (const name in env.attributes)
      attributes += ` ${name}="${(env.attributes[name] || '').replace(/"/g, '&quot;')}"`

    return `<${env.tag} class="${env.classes.join(' ')}"${attributes}>${env.content}</${env.tag}>`
  }

  /**
   * @param {RegExp} pattern
   * @param {number} pos
   * @param {string} text
   * @param {boolean} lookbehind
   * @returns {RegExpExecArray | null}
   */
  function matchPattern(pattern, pos, text, lookbehind) {
    pattern.lastIndex = pos
    const match = pattern.exec(text)
    if (match && lookbehind && match[1]) {
      // change the match to remove the text matched by the Prism lookbehind group
      const lookbehindLength = match[1].length
      match.index += lookbehindLength
      match[0] = match[0].slice(lookbehindLength)
    }
    return match
  }

  /**
   * @param {string} text
   * @param {LinkedList<string | Token>} tokenList
   * @param {any} grammar
   * @param {LinkedListNode<string | Token>} startNode
   * @param {number} startPos
   * @param {RematchOptions} [rematch]
   * @returns {void}
   * @private
   *
   * @typedef RematchOptions
   * @property {string} cause
   * @property {number} reach
   */
  function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    for (const token in grammar) {
      if (!grammar.hasOwnProperty(token) || !grammar[token])
        continue

      let patterns = grammar[token]
      patterns = Array.isArray(patterns) ? patterns : [patterns]

      for (let j = 0; j < patterns.length; ++j) {
        if (rematch && rematch.cause == `${token},${j}`)
          return

        const patternObj = patterns[j]
        const inside = patternObj.inside
        const lookbehind = !!patternObj.lookbehind
        const greedy = !!patternObj.greedy
        const alias = patternObj.alias

        if (greedy && !patternObj.pattern.global) {
          // Without the global flag, lastIndex won't work
          const flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0]
          patternObj.pattern = RegExp(patternObj.pattern.source, `${flags}g`)
        }

        /** @type {RegExp} */
        const pattern = patternObj.pattern || patternObj

        for ( // iterate the token list and keep track of the current token/string position
          let currentNode = startNode.next, pos = startPos;
          currentNode !== tokenList.tail;
          pos += currentNode.value.length, currentNode = currentNode.next
        ) {
          if (rematch && pos >= rematch.reach)
            break

          let str = currentNode.value

          if (tokenList.length > text.length) {
            // Something went terribly wrong, ABORT, ABORT!
            return
          }

          if (str instanceof Token)
            continue

          let removeCount = 1 // this is the to parameter of removeBetween
          var match

          if (greedy) {
            match = matchPattern(pattern, pos, text, lookbehind)
            if (!match || match.index >= text.length)
              break

            var from = match.index
            const to = match.index + match[0].length
            let p = pos

            // find the node that contains the match
            p += currentNode.value.length
            while (from >= p) {
              currentNode = currentNode.next
              p += currentNode.value.length
            }
            // adjust pos (and p)
            p -= currentNode.value.length
            pos = p

            // the current node is a Token, then the match starts inside another Token, which is invalid
            if (currentNode.value instanceof Token)
              continue

            // find the last node which is affected by this match
            for (
              let k = currentNode;
              k !== tokenList.tail && (p < to || typeof k.value === 'string');
              k = k.next
            ) {
              removeCount++
              p += k.value.length
            }
            removeCount--

            // replace with the new match
            str = text.slice(pos, p)
            match.index -= pos
          }
          else {
            match = matchPattern(pattern, 0, str, lookbehind)
            if (!match)
              continue
          }

          var from = match.index
          const matchStr = match[0]
          const before = str.slice(0, from)
          const after = str.slice(from + matchStr.length)

          const reach = pos + str.length
          if (rematch && reach > rematch.reach)
            rematch.reach = reach

          let removeFrom = currentNode.prev

          if (before) {
            removeFrom = addAfter(tokenList, removeFrom, before)
            pos += before.length
          }

          removeRange(tokenList, removeFrom, removeCount)

          const wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr)
          currentNode = addAfter(tokenList, removeFrom, wrapped)

          if (after)
            addAfter(tokenList, currentNode, after)

          if (removeCount > 1) {
            // at least one Token object was removed, so we have to do some rematching
            // this can only happen if the current pattern is greedy

            /** @type {RematchOptions} */
            const nestedRematch = {
              cause: `${token},${j}`,
              reach,
            }
            matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch)

            // the reach might have been extended because of the rematching
            if (rematch && nestedRematch.reach > rematch.reach)
              rematch.reach = nestedRematch.reach
          }
        }
      }
    }
  }

  /**
   * @typedef LinkedListNode
   * @property {T} value
   * @property {LinkedListNode<T> | null} prev The previous node.
   * @property {LinkedListNode<T> | null} next The next node.
   * @template T
   * @private
   */

  /**
   * @template T
   * @private
   */
  function LinkedList() {
    /** @type {LinkedListNode<T>} */
    const head = { value: null, prev: null, next: null }
    /** @type {LinkedListNode<T>} */
    const tail = { value: null, prev: head, next: null }
    head.next = tail

    /** @type {LinkedListNode<T>} */
    this.head = head
    /** @type {LinkedListNode<T>} */
    this.tail = tail
    this.length = 0
  }

  /**
   * Adds a new node with the given value to the list.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {T} value
   * @returns {LinkedListNode<T>} The added node.
   * @template T
   */
  function addAfter(list, node, value) {
    // assumes that node != list.tail && values.length >= 0
    const next = node.next

    const newNode = { value, prev: node, next }
    node.next = newNode
    next.prev = newNode
    list.length++

    return newNode
  }
  /**
   * Removes `count` nodes after the given node. The given node will not be removed.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {number} count
   * @template T
   */
  function removeRange(list, node, count) {
    let next = node.next
    for (var i = 0; i < count && next !== list.tail; i++)
      next = next.next

    node.next = next
    next.prev = node
    list.length -= i
  }
  /**
   * @param {LinkedList<T>} list
   * @returns {T[]}
   * @template T
   */
  function toArray(list) {
    const array = []
    let node = list.head.next
    while (node !== list.tail) {
      array.push(node.value)
      node = node.next
    }
    return array
  }

  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _
    }

    if (!_.disableWorkerMessageHandler) {
      // In worker
      _self.addEventListener('message', (evt) => {
        const message = JSON.parse(evt.data)
        const lang = message.language
        const code = message.code
        const immediateClose = message.immediateClose

        _self.postMessage(_.highlight(code, _.languages[lang], lang))
        if (immediateClose)
          _self.close()
      }, false)
    }

    return _
  }

  // Get current script and highlight
  const script = _.util.currentScript()

  if (script) {
    _.filename = script.src

    if (script.hasAttribute('data-manual'))
      _.manual = true
  }

  function highlightAutomaticallyCallback() {
    if (!_.manual)
      _.highlightAll()
  }

  if (!_.manual) {
    // If the document state is "loading", then we'll use DOMContentLoaded.
    // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
    // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
    // might take longer one animation frame to execute which can create a race condition where only some plugins have
    // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
    // See https://github.com/PrismJS/prism/issues/2102
    const readyState = document.readyState
    if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
      document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback)
    }
    else {
      if (window.requestAnimationFrame)
        window.requestAnimationFrame(highlightAutomaticallyCallback)
			 else
        window.setTimeout(highlightAutomaticallyCallback, 16)
    }
  }

  return _
}(_self))

if (typeof module !== 'undefined' && module.exports)
  module.exports = Prism

// hack for components to work correctly in node.js
if (typeof global !== 'undefined')
  global.Prism = Prism

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */

Prism.languages.markup = {
  comment: {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true,
  },
  prolog: {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true,
  },
  doctype: {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null, // see below
      },
      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true,
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/,
    },
  },
  cdata: {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true,
  },
  tag: {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+:/,
        },
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            {
              pattern: /^=/,
              alias: 'attr-equals',
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true,
            },
          ],
        },
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>/]+/,
        inside: {
          namespace: /^[^\s>/:]+:/,
        },
      },

    },
  },
  entity: [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: 'named-entity',
    },
    /&#x?[\da-f]{1,8};/i,
  ],
}

Prism.languages.markup.tag.inside['attr-value'].inside.entity
	= Prism.languages.markup.entity
Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', (env) => {
  if (env.type === 'entity')
    env.attributes.title = env.content.replace(/&amp;/, '&')
})

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    const includedCdataInside = {}
    includedCdataInside[`language-${lang}`] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang],
    }
    includedCdataInside.cdata = /^<!\[CDATA\[|\]\]>$/i

    const inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside,
      },
    }
    inside[`language-${lang}`] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang],
    }

    const def = {}
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, () => { return tagName }), 'i'),
      lookbehind: true,
      greedy: true,
      inside,
    }

    Prism.languages.insertBefore('markup', 'cdata', def)
  },
})
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value(attrName, lang) {
    Prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(
        `${/(^|["'\s])/.source}(?:${attrName})${/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source}`,
        'i',
      ),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            value: {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, `language-${lang}`],
              inside: Prism.languages[lang],
            },
            punctuation: [
              {
                pattern: /^=/,
                alias: 'attr-equals',
              },
              /"|'/,
            ],
          },
        },
      },
    })
  },
})

Prism.languages.html = Prism.languages.markup
Prism.languages.mathml = Prism.languages.markup
Prism.languages.svg = Prism.languages.markup

Prism.languages.xml = Prism.languages.extend('markup', {})
Prism.languages.ssml = Prism.languages.xml
Prism.languages.atom = Prism.languages.xml
Prism.languages.rss = Prism.languages.xml;

(function (Prism) {
  const string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/

  Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp(`@[\\w-](?:${/[^;{\s"']|\s+(?!\s)/.source}|${string.source})*?${/(?:;|(?=\s*\{))/.source}`),
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: 'selector',
        },
        'keyword': {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true,
        },
        // See rest below
      },
    },
    url: {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp(`\\burl\\((?:${string.source}|${/(?:[^\\\r\n()"']|\\[\s\S])*/.source})\\)`, 'i'),
      greedy: true,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp(`^${string.source}$`),
          alias: 'url',
        },
      },
    },
    selector: {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|${string.source})*(?=\\s*\\{)`),
      lookbehind: true,
    },
    string: {
      pattern: string,
      greedy: true,
    },
    property: {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true,
    },
    important: /!important\b/i,
    function: {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true,
    },
    punctuation: /[(){};:,]/,
  }

  Prism.languages.css.atrule.inside.rest = Prism.languages.css

  const markup = Prism.languages.markup
  if (markup) {
    markup.tag.addInlined('style', 'css')
    markup.tag.addAttribute('style', 'css')
  }
}(Prism))

Prism.languages.clike = {
  'comment': [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true,
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true,
    },
  ],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /[.\\]/,
    },
  },
  'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  'boolean': /\b(?:false|true)\b/,
  'function': /\b\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /[<>]=?|[!=]={0,2}|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  'punctuation': /[{}[\];(),.:]/,
}

Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true,
    },
  ],
  'keyword': [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true,
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|[($\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true,
    },
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(
      `${/(^|[^\w$])/.source
			 }(?:${

			   // constant
			  /NaN|Infinity/.source
				 }|${
				   // binary integer
				 /0[bB][01]+(?:_[01]+)*n?/.source
				 }|${
				   // octal integer
				 /0[oO][0-7]+(?:_[0-7]+)*n?/.source
				 }|${
				   // hexadecimal integer
				 /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source
				 }|${
				   // decimal bigint
				 /\d+(?:_\d+)*n/.source
				 }|${
				   // decimal number (integer or float) but no bigint
				 /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			 })${
			 /(?![\w$])/.source}`,
    ),
    lookbehind: true,
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      `${/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
      + /\//.source
			 }(?:${
			 /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\[\r\n])+\/[dgimyus]{0,7}/.source
			 }|${
			   // `v` flag syntax. This supports 3 levels of nested character classes.
			 /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source
			 })${
			   // lookahead
			 /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source}`,
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: Prism.languages.regex,
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/,
    },
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function',
  },
  'parameter': [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
  ],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
})

Prism.languages.insertBefore('javascript', 'string', {
  'hashbang': {
    pattern: /^#!.*/,
    greedy: true,
    alias: 'comment',
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string',
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation',
          },
          'rest': Prism.languages.javascript,
        },
      },
      'string': /[\s\S]+/,
    },
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: 'property',
  },
})

Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/im,
    lookbehind: true,
    alias: 'property',
  },
})

if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined('script', 'javascript')

  // add attribute support for all DOM events.
  // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    'javascript',
  )
}

Prism.languages.js = Prism.languages.javascript;

(function (Prism) {
  const string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  let selectorInside

  Prism.languages.css.selector = {
    pattern: Prism.languages.css.selector.pattern,
    lookbehind: true,
    inside: selectorInside = {
      'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      'pseudo-class': /:[-\w]+/,
      'class': /\.[-\w]+/,
      'id': /#[-\w]+/,
      'attribute': {
        pattern: RegExp(`\\[(?:[^[\\]"']|${string.source})*\\]`),
        greedy: true,
        inside: {
          'punctuation': /^\[|\]$/,
          'case-sensitivity': {
            pattern: /(\s)[si]$/i,
            lookbehind: true,
            alias: 'keyword',
          },
          'namespace': {
            pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
            lookbehind: true,
            inside: {
              punctuation: /\|$/,
            },
          },
          'attr-name': {
            pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
            lookbehind: true,
          },
          'attr-value': [
            string,
            {
              pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
              lookbehind: true,
            },
          ],
          'operator': /[|~*^$]?=/,
        },
      },
      'n-th': [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: true,
          inside: {
            number: /[\dn]+/,
            operator: /[+-]/,
          },
        },
        {
          pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
          lookbehind: true,
        },
      ],
      'combinator': /[>+~]|\|\|/,

      // the `tag` token has been existed and removed.
      // because we can't find a perfect tokenize to match it.
      // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.

      'punctuation': /[(),]/,
    },
  }

  Prism.languages.css.atrule.inside['selector-function-argument'].inside = selectorInside

  Prism.languages.insertBefore('css', 'property', {
    variable: {
      pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
      lookbehind: true,
    },
  })

  const unit = {
    pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
    lookbehind: true,
  }
  // 123 -123 .123 -.123 12.3 -12.3
  const number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true,
  }

  Prism.languages.insertBefore('css', 'function', {
    operator: {
      pattern: /(\s)[+\-*/](?=\s)/,
      lookbehind: true,
    },
    // CAREFUL!
    // Previewers and Inline color use hexcode and color.
    hexcode: {
      pattern: /\B#[\da-f]{3,8}\b/i,
      alias: 'color',
    },
    color: [
      {
        pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
        lookbehind: true,
      },
      {
        pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          unit,
          number,
          function: /[\w-]+(?=\()/,
          punctuation: /[(),]/,
        },
      },
    ],
    // it's important that there is no boundary assertion after the hex digits
    entity: /\\[\da-f]{1,8}/i,
    unit,
    number,
  })
}(Prism))

// https://www.json.org/json-en.html
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true,
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: 'keyword',
  },
}

Prism.languages.webmanifest = Prism.languages.json;

(function (Prism) {
  const string = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/

  Prism.languages.json5 = Prism.languages.extend('json', {
    property: [
      {
        pattern: RegExp(`${string.source}(?=\\s*:)`),
        greedy: true,
      },
      {
        pattern: /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/i,
        alias: 'unquoted',
      },
    ],
    string: {
      pattern: string,
      greedy: true,
    },
    number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
  })
}(Prism))

Prism.languages.jsonp = Prism.languages.extend('json', {
  punctuation: /[{}[\]();,.]/,
})

Prism.languages.insertBefore('jsonp', 'punctuation', {
  function: /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/i,
});

(function (Prism) {
  // Allow only one line break
  const inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source

  /**
   * This function is intended for the creation of the bold or italic pattern.
   *
   * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
   *
   * _Note:_ Keep in mind that this adds a capturing group.
   *
   * @param {string} pattern
   * @returns {RegExp}
   */
  function createInline(pattern) {
    pattern = pattern.replace(/<inner>/g, () => { return inner })
    return RegExp(`${/((?:^|[^\\])(?:\\{2})*)/.source}(?:${pattern})`)
  }

  const tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source
  const tableRow = /\|?__(?:\|__)+\|?(?:\n|\r\n?|$)/.source.replace(/__/g, () => { return tableCell })
  const tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source

  Prism.languages.markdown = Prism.languages.extend('markup', {})
  Prism.languages.insertBefore('markdown', 'prolog', {
    'front-matter-block': {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: true,
      greedy: true,
      inside: {
        'punctuation': /^---|---$/,
        'front-matter': {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ['yaml', 'language-yaml'],
          inside: Prism.languages.yaml,
        },
      },
    },
    'blockquote': {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: 'punctuation',
    },
    'table': {
      pattern: RegExp(`^${tableRow}${tableLine}(?:${tableRow})*`, 'm'),
      inside: {
        'table-data-rows': {
          pattern: RegExp(`^(${tableRow}${tableLine})(?:${tableRow})*$`),
          lookbehind: true,
          inside: {
            'table-data': {
              pattern: RegExp(tableCell),
              inside: Prism.languages.markdown,
            },
            'punctuation': /\|/,
          },
        },
        'table-line': {
          pattern: RegExp(`^(${tableRow})${tableLine}$`),
          lookbehind: true,
          inside: {
            punctuation: /\||:?-{3,}:?/,
          },
        },
        'table-header-row': {
          pattern: RegExp(`^${tableRow}$`),
          inside: {
            'table-header': {
              pattern: RegExp(tableCell),
              alias: 'important',
              inside: Prism.languages.markdown,
            },
            'punctuation': /\|/,
          },
        },
      },
    },
    'code': [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: true,
        alias: 'keyword',
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: true,
        inside: {
          'code-block': {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: true,
          },
          'code-language': {
            pattern: /^(```).+/,
            lookbehind: true,
          },
          'punctuation': /```/,
        },
      },
    ],
    'title': [
      {
        // title 1
        // =======

        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:={2,}|-{2,})(?=[ \t]*$)/m,
        alias: 'important',
        inside: {
          punctuation: /={2,}$|-{2,}$/,
        },
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: true,
        alias: 'important',
        inside: {
          punctuation: /^#+|#+$/,
        },
      },
    ],
    'hr': {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: 'punctuation',
    },
    'list': {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: true,
      alias: 'punctuation',
    },
    'url-reference': {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true,
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    'bold': {
      // **strong**
      // __strong__

      // allow one nested instance of italic text using the same delimiter
      pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /\*\*|__/,
      },
    },
    'italic': {
      // *em*
      // _em_

      // allow one nested instance of bold text using the same delimiter
      pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /[*_]/,
      },
    },
    'strike': {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /~~?/,
      },
    },
    'code-snippet': {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: true,
      greedy: true,
      alias: ['code', 'keyword'],
    },
    'url': {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {}, // see below
        },
        variable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: true,
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: true,
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: true,
        },
      },
    },
  });

  ['url', 'bold', 'italic', 'strike'].forEach((token) => {
    ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach((inside) => {
      if (token !== inside)
        Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside]
    })
  })

  Prism.hooks.add('after-tokenize', (env) => {
    if (env.language !== 'markdown' && env.language !== 'md')
      return

    function walkTokens(tokens) {
      if (!tokens || typeof tokens === 'string')
        return

      for (let i = 0, l = tokens.length; i < l; i++) {
        const token = tokens[i]

        if (token.type !== 'code') {
          walkTokens(token.content)
          continue
        }

        /*
				 * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
				 * is optional. But the grammar is defined so that there is only one case we have to handle:
				 *
				 * token.content = [
				 *     <span class="punctuation">```</span>,
				 *     <span class="code-language">xxxx</span>,
				 *     '\n', // exactly one new lines (\r or \n or \r\n)
				 *     <span class="code-block">...</span>,
				 *     '\n', // exactly one new lines again
				 *     <span class="punctuation">```</span>
				 * ];
				 */

        const codeLang = token.content[1]
        const codeBlock = token.content[3]

        if (codeLang && codeBlock
          && codeLang.type === 'code-language' && codeBlock.type === 'code-block'
          && typeof codeLang.content === 'string') {
          // this might be a language that Prism does not support

          // do some replacements to support C++, C#, and F#
          let lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp')
          // only use the first word
          lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase()
          const alias = `language-${lang}`

          // add alias
          if (!codeBlock.alias)
            codeBlock.alias = [alias]
					 else if (typeof codeBlock.alias === 'string')
            codeBlock.alias = [codeBlock.alias, alias]
					 else
            codeBlock.alias.push(alias)
        }
      }
    }

    walkTokens(env.tokens)
  })

  Prism.hooks.add('wrap', (env) => {
    if (env.type !== 'code-block')
      return

    let codeLang = ''
    for (let i = 0, l = env.classes.length; i < l; i++) {
      const cls = env.classes[i]
      const match = /language-(.+)/.exec(cls)
      if (match) {
        codeLang = match[1]
        break
      }
    }

    const grammar = Prism.languages[codeLang]

    if (!grammar) {
      if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
        const id = `md-${new Date().valueOf()}-${Math.floor(Math.random() * 1e16)}`
        env.attributes.id = id

        Prism.plugins.autoloader.loadLanguages(codeLang, () => {
          const ele = document.getElementById(id)
          if (ele)
            ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang)
        })
      }
    }
    else {
      env.content = Prism.highlight(textContent(env.content), grammar, codeLang)
    }
  })

  const tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi')

  /**
   * A list of known entity names.
   *
   * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
   *
   * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
   */
  const KNOWN_ENTITY_NAMES = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
  }

  // IE 11 doesn't support `String.fromCodePoint`
  const fromCodePoint = String.fromCodePoint || String.fromCharCode

  /**
   * Returns the text content of a given HTML source code string.
   *
   * @param {string} html
   * @returns {string}
   */
  function textContent(html) {
    // remove all tags
    let text = html.replace(tagPattern, '')

    // decode known entities
    text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, (m, code) => {
      code = code.toLowerCase()

      if (code[0] === '#') {
        let value
        if (code[1] === 'x')
          value = Number.parseInt(code.slice(2), 16)
				 else
          value = Number(code.slice(1))

        return fromCodePoint(value)
      }
      else {
        const known = KNOWN_ENTITY_NAMES[code]
        if (known)
          return known

        // unable to decode
        return m
      }
    })

    return text
  }

  Prism.languages.md = Prism.languages.markdown
}(Prism));

(function (Prism) {
  const javascript = Prism.util.clone(Prism.languages.javascript)

  const space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source
  const braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source
  let spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source

  /**
   * @param {string} source
   * @param {string} [flags]
   */
  function re(source, flags) {
    source = source
      .replace(/<S>/g, () => { return space })
      .replace(/<BRACES>/g, () => { return braces })
      .replace(/<SPREAD>/g, () => { return spread })
    return RegExp(source, flags)
  }

  spread = re(spread).source

  Prism.languages.jsx = Prism.languages.extend('markup', javascript)
  Prism.languages.jsx.tag.pattern = re(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source,
  )

  Prism.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>/]*/
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/
  Prism.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/
  Prism.languages.jsx.tag.inside.comment = javascript.comment

  Prism.languages.insertBefore('inside', 'attr-name', {
    spread: {
      pattern: re(/<SPREAD>/.source),
      inside: Prism.languages.jsx,
    },
  }, Prism.languages.jsx.tag)

  Prism.languages.insertBefore('inside', 'special-attr', {
    script: {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: 'language-javascript',
      inside: {
        'script-punctuation': {
          pattern: /^=(?=\{)/,
          alias: 'punctuation',
        },
        'rest': Prism.languages.jsx,
      },
    },
  }, Prism.languages.jsx.tag)

  // The following will handle plain text inside tags
  const stringifyToken = function (token) {
    if (!token)
      return ''

    if (typeof token === 'string')
      return token

    if (typeof token.content === 'string')
      return token.content

    return token.content.map(stringifyToken).join('')
  }

  const walkTokens = function (tokens) {
    const openedTags = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      let notTagNorBrace = false

      if (typeof token !== 'string') {
        if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
          // We found a tag, now find its kind

          if (token.content[0].content[0].content === '</') {
            // Closing tag
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              // Pop matching opening tag
              openedTags.pop()
            }
          }
          else {
            if (token.content[token.content.length - 1].content === '/>') {
              // Autoclosed tag, ignore
            }
            else {
              // Opening tag
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0,
              })
            }
          }
        }
        else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
          // Here we might have entered a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces++
        }
        else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
          // Here we might have left a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces--
        }
        else {
          notTagNorBrace = true
        }
      }
      if (notTagNorBrace || typeof token === 'string') {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          // Here we are inside a tag, and not inside a JSX context.
          // That's plain text: drop any tokens matched.
          let plainText = stringifyToken(token)

          // And merge text with adjacent text
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
            plainText += stringifyToken(tokens[i + 1])
            tokens.splice(i + 1, 1)
          }
          if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
            plainText = stringifyToken(tokens[i - 1]) + plainText
            tokens.splice(i - 1, 1)
            i--
          }

          tokens[i] = new Prism.Token('plain-text', plainText, null, plainText)
        }
      }

      if (token.content && typeof token.content !== 'string')
        walkTokens(token.content)
    }
  }

  Prism.hooks.add('after-tokenize', (env) => {
    if (env.language !== 'jsx' && env.language !== 'tsx')
      return

    walkTokens(env.tokens)
  })
}(Prism));

(function (Prism) {
  Prism.languages.typescript = Prism.languages.extend('javascript', {
    'class-name': {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null, // see below
    },
    'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
  })

  // The keywords TypeScript adds to JavaScript
  Prism.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[{*]|$))/,
  )

  // doesn't work with TS because TS is too complex
  delete Prism.languages.typescript.parameter
  delete Prism.languages.typescript['literal-property']

  // a version of typescript specifically for highlighting types
  const typeInside = Prism.languages.extend('typescript', {})
  delete typeInside['class-name']

  Prism.languages.typescript['class-name'].inside = typeInside

  Prism.languages.insertBefore('typescript', 'function', {
    'decorator': {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        at: {
          pattern: /^@/,
          alias: 'operator',
        },
        function: /^[\s\S]+/,
      },
    },
    'generic-function': {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/i,
      greedy: true,
      inside: {
        function: /^#?(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/i,
        generic: {
          pattern: /<[\s\S]+/, // everything after the first <
          alias: 'class-name',
          inside: typeInside,
        },
      },
    },
  })

  Prism.languages.ts = Prism.languages.typescript
}(Prism));

(function (Prism) {
  const typescript = Prism.util.clone(Prism.languages.typescript)
  Prism.languages.tsx = Prism.languages.extend('jsx', typescript)

  // doesn't work with TS because TS is too complex
  delete Prism.languages.tsx.parameter
  delete Prism.languages.tsx['literal-property']

  // This will prevent collisions between TSX tags and TS generic types.
  // Idea by https://github.com/karlhorky
  // Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928
  const tag = Prism.languages.tsx.tag
  tag.pattern = RegExp(`${/(^|[^\w$]|(?=<\/))/.source}(?:${tag.pattern.source})`, tag.pattern.flags)
  tag.lookbehind = true
}(Prism));

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined' || !document.querySelector)
    return

  const LINE_NUMBERS_CLASS = 'line-numbers'
  const LINKABLE_LINE_NUMBERS_CLASS = 'linkable-line-numbers'
  const NEW_LINE_EXP = /\n(?!$)/g

  /**
   * @param {string} selector
   * @param {ParentNode} [container]
   * @returns {HTMLElement[]}
   */
  function $$(selector, container) {
    return Array.prototype.slice.call((container || document).querySelectorAll(selector))
  }

  /**
   * Returns whether the given element has the given class.
   *
   * @param {Element} element
   * @param {string} className
   * @returns {boolean}
   */
  function hasClass(element, className) {
    return element.classList.contains(className)
  }

  /**
   * Calls the given function.
   *
   * @param {() => any} func
   * @returns {void}
   */
  function callFunction(func) {
    func()
  }

  // Some browsers round the line-height, others don't.
  // We need to test for it to position the elements properly.
  const isLineHeightRounded = (function () {
    let res
    return function () {
      if (typeof res === 'undefined') {
        const d = document.createElement('div')
        d.style.fontSize = '13px'
        d.style.lineHeight = '1.5'
        d.style.padding = '0'
        d.style.border = '0'
        d.innerHTML = '&nbsp;<br />&nbsp;'
        document.body.appendChild(d)
        // Browsers that round the line-height should have offsetHeight === 38
        // The others should have 39.
        res = d.offsetHeight === 38
        document.body.removeChild(d)
      }
      return res
    }
  }())

  /**
   * Returns the top offset of the content box of the given parent and the content box of one of its children.
   *
   * @param {HTMLElement} parent
   * @param {HTMLElement} child
   */
  function getContentBoxTopOffset(parent, child) {
    const parentStyle = getComputedStyle(parent)
    const childStyle = getComputedStyle(child)

    /**
     * Returns the numeric value of the given pixel value.
     *
     * @param {string} px
     */
    function pxToNumber(px) {
      return +px.substr(0, px.length - 2)
    }

    return child.offsetTop
      + pxToNumber(childStyle.borderTopWidth)
      + pxToNumber(childStyle.paddingTop)
      - pxToNumber(parentStyle.paddingTop)
  }

  /**
   * Returns whether the Line Highlight plugin is active for the given element.
   *
   * If this function returns `false`, do not call `highlightLines` for the given element.
   *
   * @param {HTMLElement | null | undefined} pre
   * @returns {boolean}
   */
  function isActiveFor(pre) {
    if (!pre || !/pre/i.test(pre.nodeName))
      return false

    if (pre.hasAttribute('data-line'))
      return true

    if (pre.id && Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
      // Technically, the line numbers plugin is also necessary but this plugin doesn't control the classes of
      // the line numbers plugin, so we can't assume that they are present.
      return true
    }

    return false
  }

  let scrollIntoView = true

  Prism.plugins.lineHighlight = {
    /**
     * Highlights the lines of the given pre.
     *
     * This function is split into a DOM measuring and mutate phase to improve performance.
     * The returned function mutates the DOM when called.
     *
     * @param {HTMLElement} pre
     * @param {string | null} [lines]
     * @param {string} [classes]
     * @returns {() => void}
     */
    highlightLines: function highlightLines(pre, lines, classes) {
      lines = typeof lines === 'string' ? lines : (pre.getAttribute('data-line') || '')

      const ranges = lines.replace(/\s+/g, '').split(',').filter(Boolean)
      const offset = +pre.getAttribute('data-line-offset') || 0

      const parseMethod = isLineHeightRounded() ? Number.parseInt : Number.parseFloat
      const lineHeight = parseMethod(getComputedStyle(pre).lineHeight)
      const hasLineNumbers = Prism.util.isActive(pre, LINE_NUMBERS_CLASS)
      const codeElement = pre.querySelector('code')
      const parentElement = hasLineNumbers ? pre : codeElement || pre
      const mutateActions = /** @type {(() => void)[]} */ ([])
      const lineBreakMatch = codeElement.textContent.match(NEW_LINE_EXP)
      const numberOfLines = lineBreakMatch ? lineBreakMatch.length + 1 : 1
      /**
       * The top offset between the content box of the <code> element and the content box of the parent element of
       * the line highlight element (either `<pre>` or `<code>`).
       *
       * This offset might not be zero for some themes where the <code> element has a top margin. Some plugins
       * (or users) might also add element above the <code> element. Because the line highlight is aligned relative
       * to the <pre> element, we have to take this into account.
       *
       * This offset will be 0 if the parent element of the line highlight element is the `<code>` element.
       */
      const codePreOffset = !codeElement || parentElement == codeElement ? 0 : getContentBoxTopOffset(pre, codeElement)

      ranges.forEach((currentRange) => {
        const range = currentRange.split('-')

        const start = +range[0]
        let end = +range[1] || start
        end = Math.min(numberOfLines + offset, end)

        if (end < start)
          return

        /** @type {HTMLElement} */
        const line = pre.querySelector(`.line-highlight[data-range="${currentRange}"]`) || document.createElement('div')

        mutateActions.push(() => {
          line.setAttribute('aria-hidden', 'true')
          line.setAttribute('data-range', currentRange)
          line.className = `${classes || ''} line-highlight`
        })

        // if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
        if (hasLineNumbers && Prism.plugins.lineNumbers) {
          const startNode = Prism.plugins.lineNumbers.getLine(pre, start)
          const endNode = Prism.plugins.lineNumbers.getLine(pre, end)

          if (startNode) {
            const top = `${startNode.offsetTop + codePreOffset}px`
            mutateActions.push(() => {
              line.style.top = top
            })
          }

          if (endNode) {
            const height = `${(endNode.offsetTop - startNode.offsetTop) + endNode.offsetHeight}px`
            mutateActions.push(() => {
              line.style.height = height
            })
          }
        }
        else {
          mutateActions.push(() => {
            line.setAttribute('data-start', String(start))

            if (end > start)
              line.setAttribute('data-end', String(end))

            line.style.top = `${(start - offset - 1) * lineHeight + codePreOffset}px`

            line.textContent = new Array(end - start + 2).join(' \n')
          })
        }

        mutateActions.push(() => {
          line.style.width = `${pre.scrollWidth}px`
        })

        mutateActions.push(() => {
          // allow this to play nicely with the line-numbers plugin
          // need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
          parentElement.appendChild(line)
        })
      })

      const id = pre.id
      if (hasLineNumbers && Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS) && id) {
        // This implements linkable line numbers. Linkable line numbers use Line Highlight to create a link to a
        // specific line. For this to work, the pre element has to:
        //  1) have line numbers,
        //  2) have the `linkable-line-numbers` class or an ascendant that has that class, and
        //  3) have an id.

        if (!hasClass(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
          // add class to pre
          mutateActions.push(() => {
            pre.classList.add(LINKABLE_LINE_NUMBERS_CLASS)
          })
        }

        const start = Number.parseInt(pre.getAttribute('data-start') || '1')

        // iterate all line number spans
        $$('.line-numbers-rows > span', pre).forEach((lineSpan, i) => {
          const lineNumber = i + start
          lineSpan.onclick = function () {
            const hash = `${id}.${lineNumber}`

            // this will prevent scrolling since the span is obviously in view
            scrollIntoView = false
            location.hash = hash
            setTimeout(() => {
              scrollIntoView = true
            }, 1)
          }
        })
      }

      return function () {
        mutateActions.forEach(callFunction)
      }
    },
  }

  function applyHash() {
    const hash = location.hash.slice(1)

    // Remove pre-existing temporary lines
    $$('.temporary.line-highlight').forEach((line) => {
      line.parentNode.removeChild(line)
    })

    const range = (hash.match(/\.([\d,-]+)$/) || [, ''])[1]

    if (!range || document.getElementById(hash))
      return

    const id = hash.slice(0, hash.lastIndexOf('.'))
    const pre = document.getElementById(id)

    if (!pre)
      return

    if (!pre.hasAttribute('data-line'))
      pre.setAttribute('data-line', '')

    const mutateDom = Prism.plugins.lineHighlight.highlightLines(pre, range, 'temporary ')
    mutateDom()

    if (scrollIntoView)
      document.querySelector('.temporary.line-highlight').scrollIntoView()
  }

  let fakeTimer = 0 // Hack to limit the number of times applyHash() runs

  Prism.hooks.add('before-sanity-check', (env) => {
    const pre = env.element.parentElement
    if (!isActiveFor(pre))
      return

    /*
		 * Cleanup for other plugins (e.g. autoloader).
		 *
		 * Sometimes <code> blocks are highlighted multiple times. It is necessary
		 * to cleanup any left-over tags, because the whitespace inside of the <div>
		 * tags change the content of the <code> tag.
		 */
    let num = 0
    $$('.line-highlight', pre).forEach((line) => {
      num += line.textContent.length
      line.parentNode.removeChild(line)
    })
    // Remove extra whitespace
    if (num && /^(?: \n)+$/.test(env.code.slice(-num)))
      env.code = env.code.slice(0, -num)
  })

  Prism.hooks.add('complete', function completeHook(env) {
    const pre = env.element.parentElement
    if (!isActiveFor(pre))
      return

    clearTimeout(fakeTimer)

    const hasLineNumbers = Prism.plugins.lineNumbers
    const isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers

    if (hasClass(pre, LINE_NUMBERS_CLASS) && hasLineNumbers && !isLineNumbersLoaded) {
      Prism.hooks.add('line-numbers', completeHook)
    }
    else {
      const mutateDom = Prism.plugins.lineHighlight.highlightLines(pre)
      mutateDom()
      fakeTimer = setTimeout(applyHash, 1)
    }
  })

  window.addEventListener('hashchange', applyHash)
  window.addEventListener('resize', () => {
    const actions = $$('pre')
      .filter(isActiveFor)
      .map((pre) => {
        return Prism.plugins.lineHighlight.highlightLines(pre)
      })

    actions.forEach(callFunction)
  })
}());

// plugin line-numbers
(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined')
    return
  /**
   * Plugin name which is used as a class name for <pre> which is activating the plugin
   *
   * @type {string}
   */
  const PLUGIN_NAME = 'line-numbers'

  /**
   * Regular expression used for determining line breaks
   *
   * @type {RegExp}
   */
  const NEW_LINE_EXP = /\n(?!$)/g

  /**
   * Global exports
   */
  const config = Prism.plugins.lineNumbers = {
    /**
     * Get node for provided line number
     *
     * @param {Element} element pre element
     * @param {number} number line number
     * @returns {Element|undefined}
     */
    getLine(element, number) {
      if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME))
        return

      const lineNumberRows = element.querySelector('.line-numbers-rows')
      if (!lineNumberRows)
        return

      const lineNumberStart = Number.parseInt(element.getAttribute('data-start'), 10) || 1
      const lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1)

      if (number < lineNumberStart)
        number = lineNumberStart

      if (number > lineNumberEnd)
        number = lineNumberEnd

      const lineIndex = number - lineNumberStart

      return lineNumberRows.children[lineIndex]
    },

    /**
     * Resizes the line numbers of the given element.
     *
     * This function will not add line numbers. It will only resize existing ones.
     *
     * @param {HTMLElement} element A `<pre>` element with line numbers.
     * @returns {void}
     */
    resize(element) {
      resizeElements([element])
    },

    /**
     * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
     * the current viewport.
     *
     * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
     *
     * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
     *
     * @type {boolean}
     */
    assumeViewportIndependence: true,
  }

  /**
   * Resizes the given elements.
   *
   * @param {HTMLElement[]} elements
   */
  function resizeElements(elements) {
    elements = elements.filter((e) => {
      const codeStyles = getStyles(e)
      const whiteSpace = codeStyles['white-space']
      return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line'
    })

    if (elements.length == 0)
      return

    const infos = elements.map((element) => {
      const codeElement = element.querySelector('code')
      const lineNumbersWrapper = element.querySelector('.line-numbers-rows')
      if (!codeElement || !lineNumbersWrapper)
        return undefined

      /** @type {HTMLElement} */
      let lineNumberSizer = element.querySelector('.line-numbers-sizer')
      const codeLines = codeElement.textContent.split(NEW_LINE_EXP)

      if (!lineNumberSizer) {
        lineNumberSizer = document.createElement('span')
        lineNumberSizer.className = 'line-numbers-sizer'

        codeElement.appendChild(lineNumberSizer)
      }

      lineNumberSizer.innerHTML = '0'
      lineNumberSizer.style.display = 'block'

      const oneLinerHeight = lineNumberSizer.getBoundingClientRect().height
      lineNumberSizer.innerHTML = ''

      return {
        element,
        lines: codeLines,
        lineHeights: [],
        oneLinerHeight,
        sizer: lineNumberSizer,
      }
    }).filter(Boolean)

    infos.forEach((info) => {
      const lineNumberSizer = info.sizer
      const lines = info.lines
      const lineHeights = info.lineHeights
      const oneLinerHeight = info.oneLinerHeight

      lineHeights[lines.length - 1] = undefined
      lines.forEach((line, index) => {
        if (line && line.length > 1) {
          const e = lineNumberSizer.appendChild(document.createElement('span'))
          e.style.display = 'block'
          e.textContent = line
        }
        else {
          lineHeights[index] = oneLinerHeight
        }
      })
    })

    infos.forEach((info) => {
      const lineNumberSizer = info.sizer
      const lineHeights = info.lineHeights

      let childIndex = 0
      for (let i = 0; i < lineHeights.length; i++) {
        if (lineHeights[i] === undefined)
          lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height
      }
    })

    infos.forEach((info) => {
      const lineNumberSizer = info.sizer
      const wrapper = info.element.querySelector('.line-numbers-rows')

      lineNumberSizer.style.display = 'none'
      lineNumberSizer.innerHTML = ''

      info.lineHeights.forEach((height, lineNumber) => {
        wrapper.children[lineNumber].style.height = `${height}px`
      })
    })
  }

  /**
   * Returns style declarations for the element
   *
   * @param {Element} element
   */
  function getStyles(element) {
    if (!element)
      return null

    return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null)
  }

  let lastWidth
  window.addEventListener('resize', () => {
    if (config.assumeViewportIndependence && lastWidth === window.innerWidth)
      return

    lastWidth = window.innerWidth

    resizeElements(Array.prototype.slice.call(document.querySelectorAll(`pre.${PLUGIN_NAME}`)))
  })

  Prism.hooks.add('complete', (env) => {
    if (!env.code)
      return

    const code = /** @type {Element} */ (env.element)
    const pre = /** @type {HTMLElement} */ (code.parentNode)

    // works only for <code> wrapped inside <pre> (not inline)
    if (!pre || !/pre/i.test(pre.nodeName))
      return

    // Abort if line numbers already exists
    if (code.querySelector('.line-numbers-rows'))
      return

    // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
    if (!Prism.util.isActive(code, PLUGIN_NAME))
      return

    // Remove the class 'line-numbers' from the <code>
    code.classList.remove(PLUGIN_NAME)
    // Add the class 'line-numbers' to the <pre>
    pre.classList.add(PLUGIN_NAME)

    const match = env.code.match(NEW_LINE_EXP)
    const linesNum = match ? match.length + 1 : 1
    let lineNumbersWrapper

    const lines = new Array(linesNum + 1).join('<span></span>')

    lineNumbersWrapper = document.createElement('span')
    lineNumbersWrapper.setAttribute('aria-hidden', 'true')
    lineNumbersWrapper.className = 'line-numbers-rows'
    lineNumbersWrapper.innerHTML = lines

    if (pre.hasAttribute('data-start'))
      pre.style.counterReset = `linenumber ${Number.parseInt(pre.getAttribute('data-start'), 10) - 1}`

    env.element.appendChild(lineNumbersWrapper)

    resizeElements([pre])

    Prism.hooks.run('line-numbers', env)
  })

  Prism.hooks.add('line-numbers', (env) => {
    env.plugins = env.plugins || {}
    env.plugins.lineNumbers = true
  })
}());

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined')
    return

  // Copied from the markup language definition
  const HTML_TAG = /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g

  // a regex to validate hexadecimal colors
  const HEX_COLOR = /^#?([\da-f]{3,4}|(?:[\da-f]{2}){3,4})$/i

  /**
   * Parses the given hexadecimal representation and returns the parsed RGBA color.
   *
   * If the format of the given string is invalid, `undefined` will be returned.
   * Valid formats are: `RGB`, `RGBA`, `RRGGBB`, and `RRGGBBAA`.
   *
   * Hexadecimal colors are parsed because they are not fully supported by older browsers, so converting them to
   * `rgba` functions improves browser compatibility.
   *
   * @param {string} hex
   * @returns {string | undefined}
   */
  function parseHexColor(hex) {
    const match = HEX_COLOR.exec(hex)
    if (!match)
      return undefined

    hex = match[1] // removes the leading "#"

    // the width and number of channels
    const channelWidth = hex.length >= 6 ? 2 : 1
    const channelCount = hex.length / channelWidth

    // the scale used to normalize 4bit and 8bit values
    const scale = channelWidth == 1 ? 1 / 15 : 1 / 255

    // normalized RGBA channels
    const channels = []
    for (let i = 0; i < channelCount; i++) {
      const int = Number.parseInt(hex.substr(i * channelWidth, channelWidth), 16)
      channels.push(int * scale)
    }
    if (channelCount == 3)
      channels.push(1) // add alpha of 100%

    // output
    const rgb = channels.slice(0, 3).map((x) => {
      return String(Math.round(x * 255))
    }).join(',')
    const alpha = String(Number(channels[3].toFixed(3))) // easy way to round 3 decimal places

    return `rgba(${rgb},${alpha})`
  }

  /**
   * Validates the given Color using the current browser's internal implementation.
   *
   * @param {string} color
   * @returns {string | undefined}
   */
  function validateColor(color) {
    const s = new Option().style
    s.color = color
    return s.color ? color : undefined
  }

  /**
   * An array of function which parse a given string representation of a color.
   *
   * These parser serve as validators and as a layer of compatibility to support color formats which the browser
   * might not support natively.
   *
   * @type {((value: string) => (string|undefined))[]}
   */
  const parsers = [
    parseHexColor,
    validateColor,
  ]

  Prism.hooks.add('wrap', (env) => {
    if (env.type === 'color' || env.classes.includes('color')) {
      const content = env.content

      // remove all HTML tags inside
      const rawText = content.split(HTML_TAG).join('')

      let color
      for (let i = 0, l = parsers.length; i < l && !color; i++)
        color = parsers[i](rawText)

      if (!color)
        return

      const previewElement = `<span class="inline-color-wrapper"><span class="inline-color" style="background-color:${color};"></span></span>`
      env.content = previewElement + content
    }
  })
}());

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined' || !Function.prototype.bind)
    return

  const previewers = {
    // gradient must be defined before color and angle
    gradient: {
      create: (function () {
        // Stores already processed gradients so that we don't
        // make the conversion every time the previewer is shown
        const cache = {}

        /**
         * Returns a W3C-valid linear gradient
         *
         * @param {string} prefix Vendor prefix if any ("-moz-", "-webkit-", etc.)
         * @param {string} func Gradient function name ("linear-gradient")
         * @param {string[]} values Array of the gradient function parameters (["0deg", "red 0%", "blue 100%"])
         */
        const convertToW3CLinearGradient = function (prefix, func, values) {
          // Default value for angle
          let angle = '180deg'

          if (/^(?:-?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|rad)|to\b|top|right|bottom|left)/.test(values[0])) {
            angle = values.shift()
            if (!angle.includes('to ')) {
              // Angle uses old keywords
              // W3C syntax uses "to" + opposite keywords
              if (angle.includes('top')) {
                if (angle.includes('left'))
                  angle = 'to bottom right'
								 else if (angle.includes('right'))
                  angle = 'to bottom left'
								 else
                  angle = 'to bottom'
              }
              else if (angle.includes('bottom')) {
                if (angle.includes('left'))
                  angle = 'to top right'
								 else if (angle.includes('right'))
                  angle = 'to top left'
								 else
                  angle = 'to top'
              }
              else if (angle.includes('left')) {
                angle = 'to right'
              }
              else if (angle.includes('right')) {
                angle = 'to left'
              }
              else if (prefix) {
                // Angle is shifted by 90deg in prefixed gradients
                if (angle.includes('deg'))
                  angle = `${90 - Number.parseFloat(angle)}deg`
								 else if (angle.includes('rad'))
                  angle = `${Math.PI / 2 - Number.parseFloat(angle)}rad`
              }
            }
          }

          return `${func}(${angle},${values.join(',')})`
        }

        /**
         * Returns a W3C-valid radial gradient
         *
         * @param {string} prefix Vendor prefix if any ("-moz-", "-webkit-", etc.)
         * @param {string} func Gradient function name ("linear-gradient")
         * @param {string[]} values Array of the gradient function parameters (["0deg", "red 0%", "blue 100%"])
         */
        const convertToW3CRadialGradient = function (prefix, func, values) {
          if (!values[0].includes('at')) {
            // Looks like old syntax

            // Default values
            let position = 'center'
            let shape = 'ellipse'
            let size = 'farthest-corner'

            if (/\b(?:bottom|center|left|right|top)\b|^\d+/.test(values[0])) {
              // Found a position
              // Remove angle value, if any
              position = values.shift().replace(/\s*-?\d+(?:deg|rad)\s*/, '')
            }
            if (/\b(?:circle|closest|contain|cover|ellipse|farthest)\b/.test(values[0])) {
              // Found a shape and/or size
              const shapeSizeParts = values.shift().split(/\s+/)
              if (shapeSizeParts[0] && (shapeSizeParts[0] === 'circle' || shapeSizeParts[0] === 'ellipse'))
                shape = shapeSizeParts.shift()

              if (shapeSizeParts[0])
                size = shapeSizeParts.shift()

              // Old keywords are converted to their synonyms
              if (size === 'cover')
                size = 'farthest-corner'
							 else if (size === 'contain')
                size = 'clothest-side'
            }

            return `${func}(${shape} ${size} at ${position},${values.join(',')})`
          }
          return `${func}(${values.join(',')})`
        }

        /**
         * Converts a gradient to a W3C-valid one
         * Does not support old webkit syntax (-webkit-gradient(linear...) and -webkit-gradient(radial...))
         *
         * @param {string} gradient The CSS gradient
         */
        const convertToW3CGradient = function (gradient) {
          if (cache[gradient])
            return cache[gradient]

          const parts = gradient.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/)
          // "", "-moz-", etc.
          const prefix = parts && parts[1]
          // "linear-gradient", "radial-gradient", etc.
          const func = parts && parts[2]

          const values = gradient.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, '').split(/\s*,\s*/)

          if (func.includes('linear'))
            return cache[gradient] = convertToW3CLinearGradient(prefix, func, values)
					 else if (func.includes('radial'))
            return cache[gradient] = convertToW3CRadialGradient(prefix, func, values)

          return cache[gradient] = `${func}(${values.join(',')})`
        }

        return function () {
          new Prism.plugins.Previewer('gradient', function (value) {
            this.firstChild.style.backgroundImage = ''
            this.firstChild.style.backgroundImage = convertToW3CGradient(value)
            return !!this.firstChild.style.backgroundImage
          }, '*', function () {
            this._elt.innerHTML = '<div></div>'
          })
        }
      }()),
      tokens: {
        gradient: {
          pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:hsl|rgb)a?\(.+?\)|[^)])+\)/gi,
          inside: {
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      },
      languages: {
        css: true,
        less: true,
        sass: [
          {
            lang: 'sass',
            before: 'punctuation',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['variable-line'],
          },
          {
            lang: 'sass',
            before: 'punctuation',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['property-line'],
          },
        ],
        scss: true,
        stylus: [
          {
            lang: 'stylus',
            before: 'func',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
          },
          {
            lang: 'stylus',
            before: 'func',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
          },
        ],
      },
    },
    angle: {
      create() {
        new Prism.plugins.Previewer('angle', function (value) {
          const num = Number.parseFloat(value)
          let unit = value.match(/[a-z]+$/i)
          let max; let percentage
          if (!num || !unit)
            return false

          unit = unit[0]

          switch (unit) {
            case 'deg':
              max = 360
              break
            case 'grad':
              max = 400
              break
            case 'rad':
              max = 2 * Math.PI
              break
            case 'turn':
              max = 1
          }

          percentage = 100 * num / max
          percentage %= 100

          this[`${num < 0 ? 'set' : 'remove'}Attribute`]('data-negative', '')
          this.querySelector('circle').style.strokeDasharray = `${Math.abs(percentage)},500`
          return true
        }, '*', function () {
          this._elt.innerHTML = '<svg viewBox="0 0 64 64">'
          + '<circle r="16" cy="32" cx="32"></circle>'
          + '</svg>'
        })
      },
      tokens: {
        angle: /(?:\b|\B-|(?=\B\.))(?:\d+(?:\.\d+)?|\.\d+)(?:deg|g?rad|turn)\b/i,
      },
      languages: {
        css: true,
        less: true,
        markup: {
          lang: 'markup',
          before: 'punctuation',
          inside: 'inside',
          root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
        },
        sass: [
          {
            lang: 'sass',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['property-line'],
          },
          {
            lang: 'sass',
            before: 'operator',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['variable-line'],
          },
        ],
        scss: true,
        stylus: [
          {
            lang: 'stylus',
            before: 'func',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
          },
          {
            lang: 'stylus',
            before: 'func',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
          },
        ],
      },
    },
    color: {
      create() {
        new Prism.plugins.Previewer('color', function (value) {
          this.style.backgroundColor = ''
          this.style.backgroundColor = value
          return !!this.style.backgroundColor
        })
      },
      tokens: {
        color: [Prism.languages.css.hexcode].concat(Prism.languages.css.color),
      },
      languages: {
        // CSS extras is required, so css and scss are not necessary
        css: false,
        less: true,
        markup: {
          lang: 'markup',
          before: 'punctuation',
          inside: 'inside',
          root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
        },
        sass: [
          {
            lang: 'sass',
            before: 'punctuation',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['variable-line'],
          },
          {
            lang: 'sass',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['property-line'],
          },
        ],
        scss: false,
        stylus: [
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
          },
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
          },
        ],
      },
    },
    easing: {
      create() {
        new Prism.plugins.Previewer('easing', function (value) {
          value = {
            'linear': '0,0,1,1',
            'ease': '.25,.1,.25,1',
            'ease-in': '.42,0,1,1',
            'ease-out': '0,0,.58,1',
            'ease-in-out': '.42,0,.58,1',
          }[value] || value

          let p = value.match(/-?(?:\d+(?:\.\d+)?|\.\d+)/g)

          if (p.length === 4) {
            p = p.map((p, i) => { return (i % 2 ? 1 - p : p) * 100 })

            this.querySelector('path').setAttribute('d', `M0,100 C${p[0]},${p[1]}, ${p[2]},${p[3]}, 100,0`)

            const lines = this.querySelectorAll('line')
            lines[0].setAttribute('x2', p[0])
            lines[0].setAttribute('y2', p[1])
            lines[1].setAttribute('x2', p[2])
            lines[1].setAttribute('y2', p[3])

            return true
          }

          return false
        }, '*', function () {
          this._elt.innerHTML = '<svg viewBox="-20 -20 140 140" width="100" height="100">'
          + '<defs>'
          + '<marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth">'
          + '<circle cx="2" cy="2" r="1.5" />'
          + '</marker>'
          + '</defs>'
          + '<path d="M0,100 C20,50, 40,30, 100,0" />'
          + '<line x1="0" y1="100" x2="20" y2="50" marker-start="url(#prism-previewer-easing-marker)" marker-end="url(#prism-previewer-easing-marker)" />'
          + '<line x1="100" y1="0" x2="40" y2="30" marker-start="url(#prism-previewer-easing-marker)" marker-end="url(#prism-previewer-easing-marker)" />'
          + '</svg>'
        })
      },
      tokens: {
        easing: {
          pattern: /\bcubic-bezier\((?:-?(?:\d+(?:\.\d+)?|\.\d+),\s*){3}-?(?:\d+(?:\.\d+)?|\.\d+)\)\B|\b(?:ease(?:-in)?(?:-out)?|linear)(?=[\s;}]|$)/i,
          inside: {
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      },
      languages: {
        css: true,
        less: true,
        sass: [
          {
            lang: 'sass',
            inside: 'inside',
            before: 'punctuation',
            root: Prism.languages.sass && Prism.languages.sass['variable-line'],
          },
          {
            lang: 'sass',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['property-line'],
          },
        ],
        scss: true,
        stylus: [
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
          },
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
          },
        ],
      },
    },

    time: {
      create() {
        new Prism.plugins.Previewer('time', function (value) {
          const num = Number.parseFloat(value)
          let unit = value.match(/[a-z]+$/i)
          if (!num || !unit)
            return false

          unit = unit[0]
          this.querySelector('circle').style.animationDuration = 2 * num + unit
          return true
        }, '*', function () {
          this._elt.innerHTML = '<svg viewBox="0 0 64 64">'
          + '<circle r="16" cy="32" cx="32"></circle>'
          + '</svg>'
        })
      },
      tokens: {
        time: /(?:\b|\B-|(?=\B\.))(?:\d+(?:\.\d+)?|\.\d+)m?s\b/i,
      },
      languages: {
        css: true,
        less: true,
        markup: {
          lang: 'markup',
          before: 'punctuation',
          inside: 'inside',
          root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value'],
        },
        sass: [
          {
            lang: 'sass',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['property-line'],
          },
          {
            lang: 'sass',
            before: 'operator',
            inside: 'inside',
            root: Prism.languages.sass && Prism.languages.sass['variable-line'],
          },
        ],
        scss: true,
        stylus: [
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside,
          },
          {
            lang: 'stylus',
            before: 'hexcode',
            inside: 'rest',
            root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside,
          },
        ],
      },
    },
  }

  /**
   * Returns the absolute X, Y offsets for an element
   *
   * @param {HTMLElement} element
   * @returns {{top: number, right: number, bottom: number, left: number, width: number, height: number}}
   */
  const getOffset = function (element) {
    const elementBounds = element.getBoundingClientRect()
    let left = elementBounds.left
    let top = elementBounds.top
    const documentBounds = document.documentElement.getBoundingClientRect()
    left -= documentBounds.left
    top -= documentBounds.top

    return {
      top,
      right: innerWidth - left - elementBounds.width,
      bottom: innerHeight - top - elementBounds.height,
      left,
      width: elementBounds.width,
      height: elementBounds.height,
    }
  }

  const TOKEN_CLASS = 'token'
  const ACTIVE_CLASS = 'active'
  const FLIPPED_CLASS = 'flipped'

  /**
   * Previewer constructor
   *
   * @param {string} type Unique previewer type
   * @param {Function} updater Function that will be called on mouseover.
   * @param {string[]|string} [supportedLanguages] Aliases of the languages this previewer must be enabled for. Defaults to "*", all languages.
   * @param {Function} [initializer] Function that will be called on initialization.
   * @class
   */
  const Previewer = function (type, updater, supportedLanguages, initializer) {
    this._elt = null
    this._type = type
    this._token = null
    this.updater = updater
    this._mouseout = this.mouseout.bind(this)
    this.initializer = initializer

    const self = this

    if (!supportedLanguages)
      supportedLanguages = ['*']

    if (!Array.isArray(supportedLanguages))
      supportedLanguages = [supportedLanguages]

    supportedLanguages.forEach((lang) => {
      if (typeof lang !== 'string')
        lang = lang.lang

      if (!Previewer.byLanguages[lang])
        Previewer.byLanguages[lang] = []

      if (!Previewer.byLanguages[lang].includes(self))
        Previewer.byLanguages[lang].push(self)
    })
    Previewer.byType[type] = this
  }

  /**
   * Creates the HTML element for the previewer.
   */
  Previewer.prototype.init = function () {
    if (this._elt)
      return

    this._elt = document.createElement('div')
    this._elt.className = `prism-previewer prism-previewer-${this._type}`
    document.body.appendChild(this._elt)
    if (this.initializer)
      this.initializer()
  }

  /**
   * @param {Element} token
   * @returns {boolean}
   */
  Previewer.prototype.isDisabled = function (token) {
    do {
      if (token.hasAttribute && token.hasAttribute('data-previewers')) {
        const previewers = token.getAttribute('data-previewers')
        return !(previewers || '').split(/\s+/).includes(this._type)
      }
    } while ((token = token.parentNode))
    return false
  }

  /**
   * Checks the class name of each hovered element
   *
   * @param {Element} token
   */
  Previewer.prototype.check = function (token) {
    if (token.classList.contains(TOKEN_CLASS) && this.isDisabled(token))
      return

    do {
      if (token.classList && token.classList.contains(TOKEN_CLASS) && token.classList.contains(this._type))
        break
    } while ((token = token.parentNode))

    if (token && token !== this._token) {
      this._token = token
      this.show()
    }
  }

  /**
   * Called on mouseout
   */
  Previewer.prototype.mouseout = function () {
    this._token.removeEventListener('mouseout', this._mouseout, false)
    this._token = null
    this.hide()
  }

  /**
   * Shows the previewer positioned properly for the current token.
   */
  Previewer.prototype.show = function () {
    if (!this._elt)
      this.init()

    if (!this._token)
      return

    if (this.updater.call(this._elt, this._token.textContent)) {
      this._token.addEventListener('mouseout', this._mouseout, false)

      const offset = getOffset(this._token)
      this._elt.classList.add(ACTIVE_CLASS)

      if (offset.top - this._elt.offsetHeight > 0) {
        this._elt.classList.remove(FLIPPED_CLASS)
        this._elt.style.top = `${offset.top}px`
        this._elt.style.bottom = ''
      }
      else {
        this._elt.classList.add(FLIPPED_CLASS)
        this._elt.style.bottom = `${offset.bottom}px`
        this._elt.style.top = ''
      }

      this._elt.style.left = `${offset.left + Math.min(200, offset.width / 2)}px`
    }
    else {
      this.hide()
    }
  }

  /**
   * Hides the previewer.
   */
  Previewer.prototype.hide = function () {
    this._elt.classList.remove(ACTIVE_CLASS)
  }

  /**
   * Map of all registered previewers by language
   *
   * @type {{}}
   */
  Previewer.byLanguages = {}

  /**
   * Map of all registered previewers by type
   *
   * @type {{}}
   */
  Previewer.byType = {}

  /**
   * Initializes the mouseover event on the code block.
   *
   * @param {HTMLElement} elt The code block (env.element)
   * @param {string} lang The language (env.language)
   */
  Previewer.initEvents = function (elt, lang) {
    let previewers = []
    if (Previewer.byLanguages[lang])
      previewers = previewers.concat(Previewer.byLanguages[lang])

    if (Previewer.byLanguages['*'])
      previewers = previewers.concat(Previewer.byLanguages['*'])

    elt.addEventListener('mouseover', (e) => {
      const target = e.target
      previewers.forEach((previewer) => {
        previewer.check(target)
      })
    }, false)
  }
  Prism.plugins.Previewer = Previewer

  Prism.hooks.add('before-highlight', (env) => {
    for (var previewer in previewers) {
      var languages = previewers[previewer].languages
      if (env.language && languages[env.language] && !languages[env.language].initialized) {
        let lang = languages[env.language]
        if (!Array.isArray(lang))
          lang = [lang]

        lang.forEach((lang) => {
          let before; let inside; let root; let skip
          if (lang === true) {
            before = 'important'
            inside = env.language
            lang = env.language
          }
          else {
            before = lang.before || 'important'
            inside = lang.inside || lang.lang
            root = lang.root || Prism.languages
            skip = lang.skip
            lang = env.language
          }

          if (!skip && Prism.languages[lang]) {
            Prism.languages.insertBefore(inside, before, previewers[previewer].tokens, root)
            env.grammar = Prism.languages[lang]

            languages[env.language] = { initialized: true }
          }
        })
      }
    }
  })

  // Initialize the previewers only when needed
  Prism.hooks.add('after-highlight', (env) => {
    if (Previewer.byLanguages['*'] || Previewer.byLanguages[env.language])
      Previewer.initEvents(env.element, env.language)
  })

  for (const previewer in previewers)
    previewers[previewer].create()
}());

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined')
    return

  function mapClassName(name) {
    const customClass = Prism.plugins.customClass
    if (customClass)
      return customClass.apply(name, 'none')
		 else
      return name
  }

  const PARTNER = {
    '(': ')',
    '[': ']',
    '{': '}',
  }

  // The names for brace types.
  // These names have two purposes: 1) they can be used for styling and 2) they are used to pair braces. Only braces
  // of the same type are paired.
  const NAMES = {
    '(': 'brace-round',
    '[': 'brace-square',
    '{': 'brace-curly',
  }

  // A map for brace aliases.
  // This is useful for when some braces have a prefix/suffix as part of the punctuation token.
  const BRACE_ALIAS_MAP = {
    '${': '{', // JS template punctuation (e.g. `foo ${bar + 1}`)
  }

  const LEVEL_WARP = 12

  let pairIdCounter = 0

  const BRACE_ID_PATTERN = /^(pair-\d+-)(close|open)$/

  /**
   * Returns the brace partner given one brace of a brace pair.
   *
   * @param {HTMLElement} brace
   * @returns {HTMLElement}
   */
  function getPartnerBrace(brace) {
    const match = BRACE_ID_PATTERN.exec(brace.id)
    return document.querySelector(`#${match[1]}${match[2] == 'open' ? 'close' : 'open'}`)
  }

  /**
   * @this {HTMLElement}
   */
  function hoverBrace() {
    if (!Prism.util.isActive(this, 'brace-hover', true))
      return;

    [this, getPartnerBrace(this)].forEach((e) => {
      e.classList.add(mapClassName('brace-hover'))
    })
  }
  /**
   * @this {HTMLElement}
   */
  function leaveBrace() {
    [this, getPartnerBrace(this)].forEach((e) => {
      e.classList.remove(mapClassName('brace-hover'))
    })
  }
  /**
   * @this {HTMLElement}
   */
  function clickBrace() {
    if (!Prism.util.isActive(this, 'brace-select', true))
      return;

    [this, getPartnerBrace(this)].forEach((e) => {
      e.classList.add(mapClassName('brace-selected'))
    })
  }

  Prism.hooks.add('complete', (env) => {
    /** @type {HTMLElement} */
    const code = env.element
    const pre = code.parentElement

    if (!pre || pre.tagName != 'PRE')
      return

    // find the braces to match
    /** @type {string[]} */
    const toMatch = []
    if (Prism.util.isActive(code, 'match-braces'))
      toMatch.push('(', '[', '{')

    if (toMatch.length == 0) {
      // nothing to match
      return
    }

    if (!pre.__listenerAdded) {
      // code blocks might be highlighted more than once
      pre.addEventListener('mousedown', () => {
        // the code element might have been replaced
        const code = pre.querySelector('code')
        const className = mapClassName('brace-selected')
        Array.prototype.slice.call(code.querySelectorAll(`.${className}`)).forEach((e) => {
          e.classList.remove(className)
        })
      })
      Object.defineProperty(pre, '__listenerAdded', { value: true })
    }

    /** @type {HTMLSpanElement[]} */
    const punctuation = Array.prototype.slice.call(
      code.querySelectorAll(`span.${mapClassName('token')}.${mapClassName('punctuation')}`),
    )

    /** @type {{ index: number, open: boolean, element: HTMLElement }[]} */
    const allBraces = []

    toMatch.forEach((open) => {
      const close = PARTNER[open]
      const name = mapClassName(NAMES[open])

      /** @type {[number, number][]} */
      const pairs = []
      /** @type {number[]} */
      const openStack = []

      for (let i = 0; i < punctuation.length; i++) {
        const element = punctuation[i]
        if (element.childElementCount == 0) {
          let text = element.textContent
          text = BRACE_ALIAS_MAP[text] || text
          if (text === open) {
            allBraces.push({ index: i, open: true, element })
            element.classList.add(name)
            element.classList.add(mapClassName('brace-open'))
            openStack.push(i)
          }
          else if (text === close) {
            allBraces.push({ index: i, open: false, element })
            element.classList.add(name)
            element.classList.add(mapClassName('brace-close'))
            if (openStack.length)
              pairs.push([i, openStack.pop()])
          }
        }
      }

      pairs.forEach((pair) => {
        const pairId = `pair-${pairIdCounter++}-`

        const opening = punctuation[pair[0]]
        const closing = punctuation[pair[1]]

        opening.id = `${pairId}open`
        closing.id = `${pairId}close`;

        [opening, closing].forEach((e) => {
          e.addEventListener('mouseenter', hoverBrace)
          e.addEventListener('mouseleave', leaveBrace)
          e.addEventListener('click', clickBrace)
        })
      })
    })

    let level = 0
    allBraces.sort((a, b) => { return a.index - b.index })
    allBraces.forEach((brace) => {
      if (brace.open) {
        brace.element.classList.add(mapClassName(`brace-level-${level % LEVEL_WARP + 1}`))
        level++
      }
      else {
        level = Math.max(0, level - 1)
        brace.element.classList.add(mapClassName(`brace-level-${level % LEVEL_WARP + 1}`))
      }
    })
  })
}())
