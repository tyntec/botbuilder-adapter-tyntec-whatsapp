var assert = require("assert");
var axios = require("axios");
var EventEmitter = require("events");
var { TyntecWhatsAppAdapter } = require("../lib/index");

describe("TyntecWhatsAppAdapter", function() {
    describe("constructor", function() {
        it("should initialize #axiosInstance", function () {
            const axiosInstance = axios.create();
            const settings = {
                axiosInstance,
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            };

            const adapter = new TyntecWhatsAppAdapter(settings);

            assert.strictEqual(adapter.axiosInstance, axiosInstance);
        });

        it("should initialize #tyntecApikey", function () {
            const settings = {
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            };

            const adapter = new TyntecWhatsAppAdapter(settings);

            assert.strictEqual(adapter.tyntecApikey, "ABcdefGhI1jKLMNOPQRst2UVWx345yz6");
        });

        it("should initialize #maxBodySize if maxBodySize is not present", function () {
            const settings = {
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            };

            const adapter = new TyntecWhatsAppAdapter(settings);

            assert.strictEqual(adapter.maxBodySize, 1024);
        });

        it("should initialize #maxBodySize if maxBodySize is present", function () {
            const settings = {
                axiosInstance: axios.create(),
                maxBodySize: 512,
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            };

            const adapter = new TyntecWhatsAppAdapter(settings);

            assert.strictEqual(adapter.maxBodySize, 512);
        });
    });
    
    describe("#processActivity", function() {
        it("should process the request when the body is not present", async function () {
            let logicContext = undefined;
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            const promise = adapter.processActivity(req, res, (context) => {
                logicContext = {
                    activity: context.activity,
                    adapter: context.adapter
                }
            });

            req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
            req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
            req.emit("end");
            await promise;
            assert.deepStrictEqual(logicContext.activity, {
                channelData: { contentType: "text" },
                channelId: "whatsapp",
                conversation: { id: "+1233423454", isGroup: false, name: undefined },
                from: { id: "+1233423454", name: undefined },
                id: "77185196-664a-43ec-b14a-fe97036c697e",
                recipient: { id: "545345345" },
                replyToId: undefined,
                serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
                text: "A simple text message",
                timestamp: new Date("2019-06-26T09:41:00.000Z"),
                type: "message"
            });
            assert.strictEqual(logicContext.adapter, adapter);
        });

        it("should process the request when the body is present", async function () {
            let logicContext = undefined;
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                },
                body: {
                    "channel": "whatsapp",
                    "content": {
                        "contentType": "text",
                        "text": "A simple text message"
                    },
                    "event": "MoMessage",
                    "from": "+1233423454",
                    "messageId": "77185196-664a-43ec-b14a-fe97036c697e",
                    "timestamp": "2019-06-26T11:41:00",
                    "to": "545345345"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            await adapter.processActivity(req, res, (context) => {
                logicContext = {
                    activity: context.activity,
                    adapter: context.adapter
                }
            });

            assert.deepStrictEqual(logicContext.activity, {
                channelData: { contentType: "text" },
                channelId: "whatsapp",
                conversation: { id: "+1233423454", isGroup: false, name: undefined },
                from: { id: "+1233423454", name: undefined },
                id: "77185196-664a-43ec-b14a-fe97036c697e",
                recipient: { id: "545345345" },
                replyToId: undefined,
                serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
                text: "A simple text message",
                timestamp: new Date("2019-06-26T09:41:00.000Z"),
                type: "message"
            });
            assert.strictEqual(logicContext.adapter, adapter);
        });

        it("should return response 200 when the request is valid", async function () {
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            const promise = adapter.processActivity(req, res, () => null);

            req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
            req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
            req.emit("end");
            await promise;
            assert.strictEqual(res.statusCode, 200);
            assert.strictEqual(res.endCalled, true);
        });

        it("should run the middleware pipeline when the request is valid", async function () {
            const middlewareCalls = [];
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            adapter.use(async (context, next) => {
                middlewareCalls.push("1a");
                await next();
                middlewareCalls.push("1b");
            });
            adapter.use(async (context, next) => {
                middlewareCalls.push("2a");
                await next();
                middlewareCalls.push("2b");
            });

            const promise = adapter.processActivity(req, res, () => null);

            req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
            req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
            req.emit("end");
            await promise;
            assert.deepStrictEqual(middlewareCalls, ["1a", "2a", "2b", "1b"]);
        });

        it("should support short circuits", async function () {
            let logicContext = undefined;
            const middlewareCalls = [];
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            adapter.use(async () => {
                middlewareCalls.push("1");
            });
            adapter.use(async (context, next) => {
                middlewareCalls.push("2a");
                await next();
                middlewareCalls.push("2b");
            });

            const promise = adapter.processActivity(req, res, (context) => {
                logicContext = {
                    activity: context.activity,
                    adapter: context.adapter
                }
            });

            req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
            req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
            req.emit("end");
            await promise;
            assert.deepStrictEqual(middlewareCalls, ["1"]);
            assert.strictEqual(logicContext, undefined);
        });

        it("should fail gracefully when the request is too large", async function () {
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "229",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            const promise = adapter.processActivity(req, res, () => null);

            req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text message\"},\"event\":\"MoMessage\",\"from\":");
            req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
            req.emit("end");
            await promise;
            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.endCalled, true);
        });

        it("should fail gracefully when the request is not valid JSON", async function () {
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "1",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            const promise = adapter.processActivity(req, res, () => null);

            req.emit("data", "{");
            req.emit("end");
            await promise;
            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.endCalled, true);
        });

        it("should fail gracefully when the request is not valid", async function () {
            const req = new WebRequestStub({
                method: "POST",
                headers: {
                    "host": "example.com",
                    "content-length": "2",
                    "content-type": "application/json",
                    "accept": "*/*"
                }
            });
            const res = new WebResponseStub();
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });

            const promise = adapter.processActivity(req, res, () => null);

            req.emit("data", "{}");
            req.emit("end");
            await promise;
            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.endCalled, true);
        });
    });

    it("should fail gracefully when no error handler is present", async function () {
        const req = new WebRequestStub({
            method: "POST",
            headers: {
                "host": "example.com",
                "content-length": "229",
                "content-type": "application/json",
                "accept": "*/*"
            }
        });
        const res = new WebResponseStub();
        const adapter = new TyntecWhatsAppAdapter({
            axiosInstance: axios.create(),
            tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
        });
        adapter.use(async () => {
            throw new Error();
        });

        const promise = adapter.processActivity(req, res, () => null);

        req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
        req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
        req.emit("end");
        await promise;
        assert.strictEqual(res.statusCode, 500);
        assert.strictEqual(res.endCalled, true);
    });

    it("should call the error handler when present", async function () {
        let errorHandlerArguments = undefined;
        const error = new Error();
        const req = new WebRequestStub({
            method: "POST",
            headers: {
                "host": "example.com",
                "content-length": "229",
                "content-type": "application/json",
                "accept": "*/*"
            }
        });
        const res = new WebResponseStub();
        const adapter = new TyntecWhatsAppAdapter({
            axiosInstance: axios.create(),
            tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
        });
        adapter.onTurnError = async (context, error) => {
            errorHandlerArguments = {
                context: {
                    activity: context.activity,
                    adapter: context.adapter
                },
                error
            };
        };
        adapter.use(async () => {
            throw error;
        });

        const promise = adapter.processActivity(req, res, () => null);

        req.emit("data", "{\"channel\":\"whatsapp\",\"content\":{\"contentType\":\"text\",\"text\":\"A simple text message\"},\"event\":\"MoMessage\",\"from\":");
        req.emit("data", "\"+1233423454\",\"messageId\":\"77185196-664a-43ec-b14a-fe97036c697e\",\"timestamp\":\"2019-06-26T11:41:00\",\"to\":\"545345345\"}");
        req.emit("end");
        await promise;
        assert.deepStrictEqual(errorHandlerArguments.context.activity, {
            channelData: { contentType: "text" },
            channelId: "whatsapp",
            conversation: { id: "+1233423454", isGroup: false, name: undefined },
            from: { id: "+1233423454", name: undefined },
            id: "77185196-664a-43ec-b14a-fe97036c697e",
            recipient: { id: "545345345" },
            replyToId: undefined,
            serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
            text: "A simple text message",
            timestamp: new Date("2019-06-26T09:41:00.000Z"),
            type: "message"
        });
        assert.strictEqual(errorHandlerArguments.context.adapter, adapter);
        assert.strictEqual(errorHandlerArguments.error, error);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.endCalled, true);
    });
});

class WebRequestStub extends EventEmitter {
    constructor(opts) {
        super();
        if (opts.body !== undefined) {
            this.body = opts.body;
        }
        if (opts.headers !== undefined) {
            this.headers = opts.headers;
        }
        if (opts.method !== undefined) {
            this.method = opts.method;
        }
        if (opts.params !== undefined) {
            this.params = opts.params;
        }
        if (opts.query !== undefined) {
            this.query = opts.query;
        }
    }
}

class WebResponseStub {
    end(args) {
        if (args !== undefined) {
            throw new Error(`Arguments not supported: ${args}`);
        }
        this.endCalled = true;
        return this;
    }

    send(body) {
        this.body = body;
        return this;
    }

    status(code) {
        this.statusCode = code;
        return code;
    }
}
