var assert = require("assert");
var { composeTyntecRequestConfig, composeTyntecSendWhatsAppMessageRequestConfig } = require("../../lib/tyntec/axios");

describe("composeTyntecSendWhatsAppMessageRequestConfig", function() {
    it("should return a request to send a WhatsApp message", function() {
        const apikey = "ABcdefGhI1jKLMNOPQRst2UVWx345yz6";
        const data = {
            to: "+1233423454",
            from: "545345345",
            channel: "whatsapp",
            content: {
                contentType: "text",
                text: "A simple text message"
            }
        };

        const config = composeTyntecSendWhatsAppMessageRequestConfig(apikey, data);

        assert.strictEqual(config.method, "post");
        assert.strictEqual(config.url, "https://api.tyntec.com/conversations/v3/messages");
        assert.strictEqual(config.headers["accept"], "application/json");
        assert.strictEqual(config.headers["apikey"], "ABcdefGhI1jKLMNOPQRst2UVWx345yz6");
        assert.strictEqual(config.headers["content-type"], "application/json");
        assert.deepStrictEqual(config.data, data);
    });
});
