const server = require("./server");
const launchServer = async () => {
    this.expressServer = server;
    try {
        this.expressServer.launch();
    }
    catch (error) {
        // @ts-ignore It is an error object, of course it will have a message
        console.error("Express Server failure", error.message);
        await this.expressServer.close();
    }
};

launchServer().catch(e => console.error(e));
