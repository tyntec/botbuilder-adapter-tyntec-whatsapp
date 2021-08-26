# `class TyntecWhatsAppAdapter extends BotAdapter`

`TyntecWhatsAppAdapter` is an implementation of a bot adapter that connects a
bot to WhatsApp through the tyntec Conversations API.

Properties:
* [`public axiosInstance: AxiosInstance`](#public-axiosinstance-axiosinstance)
* [`public maxBodySize: number`](#public-maxbodysize-number)
* [`public tyntecApikey: string`](#public-tyntecapikey-string)

Methods:
* [`public constructor(settings: ITyntecWhatsAppAdapterSettings)`](#public-constructorsettings-ityntecwhatsappadaptersettings)

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
