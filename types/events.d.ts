import type Config from "./config";

type PostHTMLType = (html: string, config: Config) => { html: string; config: Config };

export default interface Events {
  /**
  * Runs after the Environment config has been computed, but before Templates are processed.
  * Exposes the `config` object so you can further customize it.
  *
  * @default undefined
  *
  * @example
  * ```
  * export default {
  *   beforeCreate: async ({config}) => {
  *     // do something with `config`
  *   }
  * }
  * ```
  */
  beforeCreate?: (params: { config: Config }) => void | Promise<void>;

  /**
  * Runs after the Template's config has been computed, but just before it is compiled.
  *
  * Must return the `html` string, otherwise the original will be used.
  *
  * @default undefined
  *
  * @example
  * ```
  * export default {
  *   beforeRender: async ({html, matter, config, posthtml}) => {
  *     // do something...
  *     return html;
  *   }
  * }
  * ```
  */
  beforeRender?: (params: {
    /**
     * The Template's HTML string.
     */
    html: string;
    /**
     * The Template's Front Matter.
     */
    matter: { [key: string]: string };
    /**
     * The Template's computed config.
     */
    config: Config;
    /**
     * A function to process an HTML string with PostHTML.
     *
     * @param {string} html The HTML string to process.
     * @param {Config} config The Maizzle config object.
     */
    posthtml: PostHTMLType;
  }) => string | Promise<string>;

  /**
  * Runs after the Template has been compiled, but before any Transformers have been applied.
  *
  * Must return the `html` string, otherwise the original will be used.
  *
  * @default undefined
  *
  * @example
  * ```
  * export default {
  *   afterRender: async async ({html, matter, config, posthtml}) => {
  *     // do something...
  *     return html;
  *   }
  * }
  * ```
  */
  afterRender?: (params: {
    /**
     * The Template's HTML string.
     */
    html: string;
    /**
     * The Template's Front Matter.
     */
    matter: { [key: string]: string };
    /**
     * The Template's computed config.
     */
    config: Config;
    /**
    * A function to process an HTML string with PostHTML.
    *
    * @param {string} html The HTML string to process.
    * @param {Config} config The Maizzle config object.
    */
    posthtml: PostHTMLType;
  }) => string | Promise<string>;

  /**
  * Runs after all Transformers have been applied, just before the final HTML is returned.
  *
  * Must return the `html` string, otherwise the original will be used.
  *
  * @default undefined
  *
  * @example
  * ```
  * export default {
  *   afterTransformers: async ({html, matter, config, posthtml}) => {
  *     // do something...
  *     return html;
  *   }
  * }
  * ```
  */
  afterTransformers?: (params: {
    /**
     * The Template's HTML string.
     */
    html: string;
    /**
     * The Template's Front Matter.
     */
    matter: { [key: string]: string };
    /**
     * The Template's computed config.
     */
    config: Config;
    /**
    * A function to process an HTML string with PostHTML.
    *
    * @param {string} html The HTML string to process.
    * @param {Config} config The Maizzle config object.
    */
    posthtml: PostHTMLType;
  }) => string | Promise<string>;

  /**
  * Runs after all Templates have been compiled and output to disk.
  * `files` will contain the paths to all the files inside the `build.output.path` directory.
  *
  * @default undefined
  *
  * @example
  * ```
  * export default {
  *   afterBuild: async ({files, config}) => {
  *     // do something...
  *   }
  * }
  * ```
  */
  afterBuild?: (params: {
    /**
     * An array of paths to all the files inside the `build.output.path` directory.
     */
    files: string[];
    /**
     * The Maizzle config object.
     */
    config: Config;
  }) => string | Promise<string>;
}
