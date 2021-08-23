var assert = require("assert");
var axios = require("axios");
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
});
