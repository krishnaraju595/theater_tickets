module.exports = class Endpoint {
    /**
     * This class can be used to create a new endpoint very easily by specifying the path along with the handler.
     *
     * All types are properly specified and hence you should be able to use intellisense
     * @param {String} path
     * @param {import("express").RequestHandler} handler
     * @param {"get" | "post" | "put" | "patch" | "delete"} method
     */
    constructor (path, handler, method = "get") {
        /**
         * @type {String}
         */
        this.path = path;
        /**
         * @type {import("express").RequestHandler}
         */
        this.handler = handler;
        /**
         * @type {"get" | "post" | "put" | "patch" | "delete"}
         */
        this.method = method;
    }
};
