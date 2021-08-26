# `class TyntecWhatsAppAdapter extends BotAdapter`

`TyntecWhatsAppAdapter` is an implementation of a bot adapter that connects a
bot to WhatsApp through the tyntec Conversations API.

Methods:
* [`public constructor(settings: ITyntecWhatsAppAdapterSettings)`](#public-constructorsettings-ityntecwhatsappadaptersettings)

If you want more information about bot adapters, see the [Microsoft Bot Framework SDK documentation](https://docs.microsoft.com/en-us/azure/bot-service/index-bf-sdk).


## `public constructor(settings: ITyntecWhatsAppAdapterSettings)`

Initializes the adapter. It sets the `axiosInstance` property to the value of
`settings.axiosInstance`, the `maxBodySize` property to the value of
`settings.maxBodySize` and the `tyntecApikey` property to the value of
`settings.tyntecApikey`. If `settings.maxBodySize` is not provided, the
`maxBodySize` property is set to `1024` by default.
