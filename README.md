# Tyntec WhatsApp Adapter

A [Microsoft Bot Framework](https://www.botframework.com/) adapter for handling
connectivity with the WhatsApp channel in tyntec Conversations API.

It is a TypeScript library that allows your bots to use WhatsApp through the
tyntec Conversations API. The adapter supports two-way (incoming and outgoing)
messaging with templates, free-form and rich media.

Look how easy it is to use:

```typescript
import axios from 'axios';
import { TyntecWhatsAppAdapter } from 'botbuilder-adapter-tyntec-whatsapp';

const axiosInstance = axios.create();

const adapter = new TyntecWhatsAppAdapter({
    axiosInstance,
    tyntecApikey: 'API_KEY'
});

// ... your bot and server initialization ...

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await myBot.run(context);
    });
});
```

## Features

At the moment, the adapter supports:

* receiving WhatsApp messages and
* sending WhatsApp messages,

where the messages that can be received can be, at the moment:

* text non-group messages,
* audio non-group messages,
* document non-group messages,
* image non-group messages,
* sticker non-group messages and
* video non-group messages

and the activities that can be sent as WhatsApp messages are limited to:

* `Activity.attachmentLayout`: undefined attachment layouts,
* `Activity.attachments`: at most one attachment,
* `Activity.attachments.content`: undefined attachment contents,
* `Activity.attachments.contentUrl`: defined attachment content URLs,
* `Activity.attachments.thumbnailUrl`: undefined attachment thumbnail URLs,
* `Activity.channelData.contentType`: `audio`, `document`, `image`, `sticker`,
  `template`, `text` and `video` message content types,
* `Activity.channelId`: `whatsapp` channel IDs,
* `Activity.deliveryMode`: undefined delivery modes,
* `Activity.entities`: undefined entities,
* `Activity.expiration`: undefined expirations,
* `Activity.from`: defined `from` fields,
* `Activity.importance`: undefined importance,
* `Activity.inputHint`: undefined input hints,
* `Activity.listenFor`: undefined listen for,
* `Activity.locale`: undefined locale,
* `Activity.replyToId`: undefined reply to IDs,
* `Activity.semanticAction`: undefined semantic actions,
* `Activity.speak`: undefined speaks,
* `Activity.suggestedActions`: undefined suggested actions,
* `Activity.textFormat`: undefined text formats and
* `Activity.type`: `message` types


## Installation

Install Tyntec WhatsApp Adapter by running:

```shell
$ npm install botbuilder-adapter-tyntec-whatsapp
```


## Documentation

* Microsoft Bot Framework SDK documentation: https://docs.microsoft.com/en-us/azure/bot-service/index-bf-sdk
* tyntec WhatsApp Business documentation: https://www.tyntec.com/docs/docs-center-whatsapp-business-api-overview


## Support

If you are having issues, please let us know
* either via https://www.tyntec.com/get-help-support
* or support@tyntec.com

## License

This project is distributed under the MIT license.
