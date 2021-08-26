# `class TyntecWhatsAppAdapter extends BotAdapter`

`TyntecWhatsAppAdapter` is an implementation of a bot adapter that connects a
bot to WhatsApp through the tyntec Conversations API.

Properties:
* [`public axiosInstance: AxiosInstance`](#public-axiosinstance-axiosinstance)
* [`public maxBodySize: number`](#public-maxbodysize-number)
* [`public tyntecApikey: string`](#public-tyntecapikey-string)

Methods:
* [`public constructor(settings: ITyntecWhatsAppAdapterSettings)`](#public-constructorsettings-ityntecwhatsappadaptersettings)
* [`public processActivity(req: WebRequest, res: WebResponse, logic: (context: TurnContext) => Promise<any>): Promise<void>`](#public-processactivityreq-webrequest-res-webresponse-logic-context-turncontext--promiseany-promisevoid)

If you want more information about bot adapters, see the [Microsoft Bot Framework SDK documentation](https://docs.microsoft.com/en-us/azure/bot-service/index-bf-sdk).


## `public axiosInstance: AxiosInstance`

Is an [Axios instance](https://github.com/axios/axios) used to send requests to
the tyntec Conversations API.


## `public maxBodySize: number`

Is the maximum size of the request body accepted in `processActivity`.


## `public tyntecApikey: string`

Is a [tyntec API key](https://www.tyntec.com/docs/faq-whatsapp-business-onboarding-how-can-i-get-api-key-setup-my-whatsapp-business-account)
used to authenticate requests to the tyntec Conversations API.


## `public constructor(settings: ITyntecWhatsAppAdapterSettings)`

Initializes the adapter. It sets the `axiosInstance` property to the value of
`settings.axiosInstance`, the `maxBodySize` property to the value of
`settings.maxBodySize` and the `tyntecApikey` property to the value of
`settings.tyntecApikey`. If `settings.maxBodySize` is not provided, the
`maxBodySize` property is set to `1024` by default.


## `public processActivity(req: WebRequest, res: WebResponse, logic: (context: TurnContext) => Promise<any>): Promise<void>`

Asynchronously parses the [restify](http://restify.com/) or
[Express](http://expressjs.com/) request `req`, creates a turn context, passes
it through the middleware pipeline to the `logic` function and sets the
response `res`.

It is intended to be called from a function handler of a web server route that
is registered as a [tyntec inbound message webhook](https://www.tyntec.com/docs/docs-center-whatsapp-business-api-overview).

At the moment, only a subset of [tyntec Webhook Events](https://api.tyntec.com/reference/conversations/current.html)
is supported. These are events that meet the following criteria:

* The event must be a valid tyntec Webhook event.
* The event must be a message (`body.event === "MoMessage"`, not delivery updates).
* The event must be a WhatsApp message (`body.channel === "whatsapp"`).
* The event must not be a group message (`body.to !== undefined && body.groupId === undefined`).
* The event must be a text message (`body.content.contentType === "text"`),
  an audio message (`body.content.contentType === "media" && body.content.media.type === "audio"`),
  a document message (`body.content.contentType === "media" && body.content.media.type === "document"`),
  an image message (`body.content.contentType === "media" && body.content.media.type === "image"`),
  a sticker message (`body.content.contentType === "media" && body.content.media.type === "sticker"`) or
  a video message (`body.content.contentType === "media" && body.content.media.type === "video"`).

Supported events are turned into activities that are passed to the created turn
contexts. See [Activity.md](./Activity.md) to find out what activities may be
passed to the middleware pipeline and then to the `logic` function.

If the request is valid, the Webhook event is supported and neither the
middleware pipeline nor the `logic` function throws an error, the status code
of the response is set to 200. Otherwise, the status code is set to 500 and an
error message is written to the body.
