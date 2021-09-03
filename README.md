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

You can find the full quick start guide in the [tyntec Docs Center](https://www.tyntec.com/docs/whatsapp-business-api-integration-microsoft-bot-framework).


## Installation

Install Tyntec WhatsApp Adapter by running:

```shell
$ npm install botbuilder-adapter-tyntec-whatsapp
```


## Features

At the moment, the adapter supports only:

* receiving WhatsApp messages (`processActivity`) and
* sending WhatsApp messages (`sendActivities`),

See the API Reference in the [docs/](./docs) directory for more information
about how to use the library and what are the current limitations.


## Support

If you are having issues, please let us know
* either via https://www.tyntec.com/get-help-support
* or support@tyntec.com

## License

This project is distributed under the MIT license.
