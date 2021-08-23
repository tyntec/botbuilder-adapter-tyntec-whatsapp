var assert = require("assert");
var axios = require("axios");
var { ActivityTypes, TurnContext } = require("botbuilder");
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

    describe("#composeTyntecWhatsAppMessageRequest", function() {
        it("should compose a text message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "text" },
                text: "A simple text message"
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "text",
                    text: "A simple text message"
                }
            });
        });

        it("should compose an audio message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "audio" },
                attachments: [
                    {
                        contentType: "audio/ac3",
                        contentUrl: "https://example.com/audio.ac3"
                    }
                ]
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "audio",
                    audio: {
                        url: "https://example.com/audio.ac3"
                    }
                }
            });
        });

        it("should compose a document message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "document" },
                text: "A document caption",
                attachments: [
                    {
                        contentType: "application/pdf",
                        contentUrl: "https://example.com/document.pdf",
                        name: "document.pdf"
                    }
                ]
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "document",
                    document: {
                        caption: "A document caption",
                        filename: "document.pdf",
                        url: "https://example.com/document.pdf"
                    }
                }
            });
        });

        it("should compose an image message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "image" },
                text: "An image caption",
                attachments: [
                    {
                        contentType: "image/png",
                        contentUrl: "https://example.com/image.png"
                    }
                ]
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "image",
                    image: {
                        caption: "An image caption",
                        url: "https://example.com/image.png"
                    }
                }
            });
        });

        it("should compose a sticker message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "sticker" },
                attachments: [
                    {
                        contentType: "image/webp",
                        contentUrl: "https://example.com/sticker.webp"
                    }
                ]
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "sticker",
                    sticker: {
                        url: "https://example.com/sticker.webp"
                    }
                }
            });
        });

        it("should compose a video message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity =  {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "video" },
                text: "A video caption",
                attachments: [
                    {
                        contentType: "video/mp4",
                        contentUrl: "https://example.com/video.mp4"
                    }
                ]
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "video",
                    video: {
                        caption: "A video caption",
                        url: "https://example.com/video.mp4"
                    }
                }
            });
        });

        it("should compose a template message request", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity =  {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: {
                    contentType: "template",
                    template: {
                        templateId: "template_id",
                        templateLanguage: "en",
                        components: {
                            header: [
                                {
                                    type: "image",
                                    image: {
                                        url: "https://example.com/image.png"
                                    }
                                }
                            ],
                            body: [
                                {
                                    type: "text",
                                    text: "lorem"
                                }
                            ]
                        }
                    }
                }
            };

            const messageRequest = adapter.composeTyntecWhatsAppMessageRequest(activity);

            assert.deepStrictEqual(messageRequest, {
                from: "+1233423454",
                to: "545345345",
                channel: "whatsapp",
                content: {
                    contentType: "template",
                    template: {
                        templateId: "template_id",
                        templateLanguage: "en",
                        components: {
                            header: [
                                {
                                    type: "image",
                                    image: {
                                        url: "https://example.com/image.png"
                                    }
                                }
                            ],
                            body: [
                                {
                                    type: "text",
                                    text: "lorem"
                                }
                            ]
                        }
                    }
                }
            });
        });

        it("should throw an error when an activity is not supported", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                channelData: {},
                channelId: "whatsapp",
                conversation: { id: "545345345" },
                from: { id: "+1233423454" },
                type: ActivityTypes.Typing
            };

            assert.throws(() =>
                adapter.composeTyntecWhatsAppMessageRequest(activity)
            )
        });

        it("should throw an error when a content type is not supported", function () {
            const adapter = new TyntecWhatsAppAdapter({
                axiosInstance: axios.create(),
                tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
            });
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: "545345345" },
                channelData: { contentType: "foo" }
            };

            assert.throws(() =>
                adapter.composeTyntecWhatsAppMessageRequest(activity)
            )
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

    describe("#sendActivities", function () {
        it("should send the activities when they are supported", async function () {
            let axiosConfigs = [];
            const axiosInstance = {
                request: async (config) => {
                    axiosConfigs.push(config);
                    return {
                        status: 202,
                        statusText: "",  // TODO
                        headers: {},  // TODO
                        data: {
                            "messageId": "77185196-664a-43ec-b14a-fe97036c697f",
                            "acceptedAt": "2019-08-24T14:15:22Z"
                        },
                        config: {},  // TODO
                        request: {}  // TODO
                    };
                }
            };
            const context = new TurnContext(
                new TyntecWhatsAppAdapter({
                    axiosInstance,
                    tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
                }),
                {
                    channelData: { contentType: "text" },
                    channelId: "whatsapp",
                    conversation: { id: "+1233423454", isGroup: false },
                    from: { id: "+1233423454" },
                    id: "77185196-664a-43ec-b14a-fe97036c697e",
                    recipient: { id: "545345345" },
                    serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
                    text: "A simple text message",
                    timestamp: new Date("2019-06-26T09:41:00.000Z"),
                    type: "message"
                }
            );
            const activities = [
                {
                    channelData: { contentType: "text" },
                    channelId: "whatsapp",
                    conversation: { id: context.activity.from.id },
                    from: { id: "545345345" },
                    text: "A simple text message 1",
                    type: ActivityTypes.Message
                },
                {
                    channelData: { contentType: "text" },
                    channelId: "whatsapp",
                    conversation: { id: context.activity.from.id },
                    from: { id: "545345345" },
                    text: "A simple text message 2",
                    type: ActivityTypes.Message
                }
            ];

            const responses = await context.sendActivities(activities);

            for (axiosConfig of axiosConfigs) {
                delete axiosConfig.validateStatus;
            };
            assert.deepStrictEqual(axiosConfigs, [
                {
                    method: "post",
                    url: "https://api.tyntec.com/conversations/v3/messages",
                    headers: {
                        "apikey": "ABcdefGhI1jKLMNOPQRst2UVWx345yz6",
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    data: {
                        to: '+1233423454',
                        from: '545345345',
                        channel: "whatsapp",
                        content: {
                            contentType: 'text',
                            text: 'A simple text message 1'
                        }
                    }
                },
                {
                    method: "post",
                    url: "https://api.tyntec.com/conversations/v3/messages",
                    headers: {
                        "apikey": "ABcdefGhI1jKLMNOPQRst2UVWx345yz6",
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    data: {
                        to: '+1233423454',
                        from: '545345345',
                        channel: "whatsapp",
                        content: {
                            contentType: 'text',
                            text: 'A simple text message 2'
                        }
                    }
                }
            ]);
            assert.deepStrictEqual(responses, [
                {
                    id: "77185196-664a-43ec-b14a-fe97036c697f"
                },
                {
                    id: "77185196-664a-43ec-b14a-fe97036c697f"
                }
            ]);
        });

        it("should throw an error when an activity is not supported", async function () {
            let axiosConfig = undefined;
            const axiosInstance = {
                request: async (config) => {
                    axiosConfig = config;
                }
            };
            const context = new TurnContext(
                new TyntecWhatsAppAdapter({
                    axiosInstance,
                    tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
                }),
                {
                    channelData: { contentType: "text" },
                    channelId: "whatsapp",
                    conversation: { id: "+1233423454", isGroup: false },
                    from: { id: "+1233423454" },
                    id: "77185196-664a-43ec-b14a-fe97036c697e",
                    recipient: { id: "545345345" },
                    serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
                    text: "A simple text message",
                    timestamp: new Date("2019-06-26T09:41:00.000Z"),
                    type: "message"
                }
            );
            const activity = {
                channelData: {},
                channelId: "whatsapp",
                conversation: { id: context.activity.from.id },
                from: { id: "545345345" },
                type: ActivityTypes.Typing
            };

            await assert.rejects(
                context.sendActivity(activity)
            )

            assert.strictEqual(axiosConfig, undefined);
        });

        it("should throw an error when an unsuccessful response is returned", async function () {
            const axiosInstance = {
                request: async () => {
                    return {
                        status: 400,
                        statusText: "Bad Request",
                        headers: {
                            "content-length": "129",
                            "content-type": "application/json",
                            "date": "Mon, 23 Aug 2021 08:35:10 GMT",
                            "server": "nginx"
                        },
                        data: {
                            "type": "https://docs.tyntec.com/problems",
                            "title": "Missing parameters",
                            "status": 400,
                            "detail": "Mandatory parameter [to] missing"
                        },
                        config: {
                            url: "https://example.com/channels/whatsapp/accounts"
                        },
                        request: {}
                    };
                }
            };
            const context = new TurnContext(
                new TyntecWhatsAppAdapter({
                    axiosInstance,
                    tyntecApikey: "ABcdefGhI1jKLMNOPQRst2UVWx345yz6"
                }),
                {
                    channelData: { contentType: "text" },
                    channelId: "whatsapp",
                    conversation: { id: "+1233423454", isGroup: false },
                    from: { id: "+1233423454" },
                    id: "77185196-664a-43ec-b14a-fe97036c697e",
                    recipient: { id: "545345345" },
                    serviceUrl: "https://api.tyntec.com/conversations/v3/messages",
                    text: "A simple text message",
                    timestamp: new Date("2019-06-26T09:41:00.000Z"),
                    type: "message"
                }
            );
            const activity = {
                channelData: { contentType: "text" },
                channelId: "whatsapp",
                conversation: { id: context.activity.from.id },
                from: { id: "545345345" },
                text: "A simple text message 1",
                type: ActivityTypes.Message
            };

            await assert.rejects(
                context.sendActivity(activity)
            )
        });
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