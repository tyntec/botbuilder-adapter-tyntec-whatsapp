import {Activity, ActivityTypes, BotAdapter, ConversationAccount, ConversationReference, ChannelAccount, ResourceResponse, TurnContext, WebRequest, WebResponse} from "botbuilder";
import axios, {AxiosInstance} from "axios";
import {ITyntecMoMessage, ITyntecWhatsAppMessageRequest} from "./tyntec/messages";
import {composeTyntecRequestConfig, composeTyntecSendWhatsAppMessageRequestConfig, parseTyntecSendWhatsAppMessageResponse} from "./tyntec/axios";

export interface ITyntecWhatsAppAdapterSettings {
    maxBodySize?: number;
    tyntecApikey: string;
}

export class TyntecWhatsAppAdapter extends BotAdapter {
    private axiosClient: AxiosInstance;
    public maxBodySize = 1024;
    public tyntecApikey: string;

    constructor(settings: ITyntecWhatsAppAdapterSettings) {
        super();

        this.axiosClient = axios.create({
            validateStatus: () => true
        });
        if (settings.maxBodySize !== undefined) {
            this.maxBodySize = settings.maxBodySize;
        }
        this.tyntecApikey = settings.tyntecApikey;
    }

    async continueConversation(reference: Partial<ConversationReference>, logic: (revocableContext: TurnContext) => Promise<void>): Promise<void> {
        throw Error("Operation continueConversation not supported.");
    }

    async deleteActivity(context: TurnContext, reference: Partial<ConversationReference>): Promise<void> {
        throw Error("Operation deleteActivity not supported.");
    }

    async processActivity(req: WebRequest, res: WebResponse, logic: (context: TurnContext) => Promise<any>): Promise<void> {
        try {
            const requestBody = await new Promise((resolve: (value: ITyntecMoMessage) => void, reject: (reason?: any) => void) => {
                if (req.body !== undefined) {
                    return resolve(req.body);
                }

                let requestJson = '';
                req.on!('data', (chunk: string) => {
                    if (requestJson.length + chunk.length > this.maxBodySize) {
                        reject(new Error(`Request body too large: > ${this.maxBodySize}`));
                    }

                    requestJson += chunk;
                });
                req.on!('end', (): void => {
                    try {
                        resolve(JSON.parse(requestJson));
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            const activity = await this.parseTyntecWhatsAppMessageEvent(requestBody);
            const context = new TurnContext(this as any, activity);
            await this.runMiddleware(context, logic);

            res.status(200);
            res.end();
        } catch (e) {
            res.status(500);
            res.send(`Failed to process request: ${e}`);
            res.end();
        }
    }

    async sendActivities(context: TurnContext, activities: Partial<Activity>[]): Promise<ResourceResponse[]> {
        const responses: ResourceResponse[] = [];
        for (const activity of activities) {
            const tyntecRequest = this.composeTyntecWhatsAppMessageRequest(activity);
            const axiosRequest = composeTyntecSendWhatsAppMessageRequestConfig(this.tyntecApikey, tyntecRequest);

            const axiosResponse = await this.axiosClient.request(axiosRequest);

            const messageId = parseTyntecSendWhatsAppMessageResponse(axiosResponse);
            responses.push({id: messageId});
        }
        return responses;
    }

    async updateActivity(context: TurnContext, activity: Partial<Activity>): Promise<ResourceResponse | void> {
        throw Error("Operation updateActivity not supported.");
    }

    protected composeTyntecWhatsAppMessageRequest(activity: Partial<Activity>): ITyntecWhatsAppMessageRequest {
        if (activity.attachmentLayout !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.attachmentLayout not supported: ${activity.attachmentLayout}`);
        }
        if (activity.channelId !== "whatsapp") {
            throw Error(`TyntecWhatsAppAdapter: Activity.channelId other than whatsapp not supported: ${activity.channelId}`);
        }
        if (activity.conversation === undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.conversation is required: ${activity.conversation}`);
        }
        if (activity.deliveryMode !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.deliveryMode not supported: ${activity.deliveryMode}`);
        }
        if (activity.entities !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.entities not supported: ${activity.entities}`);
        }
        if (activity.expiration !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.expiration not supported: ${activity.expiration}`);
        }
        if (activity.from === undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.from is required: ${activity.from}`);
        }
        if (activity.id !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.id not supported: ${activity.id}`);
        }
        if (activity.importance !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.importance not supported: ${activity.importance}`);
        }
        if (activity.inputHint !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.inputHint not supported: ${activity.inputHint}`);
        }
        if (activity.listenFor !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.listenFor not supported: ${activity.listenFor}`);
        }
        if (activity.locale !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.locale not supported: ${activity.locale}`);
        }
        if (activity.replyToId !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.replyToId not supported: ${activity.replyToId}`);
        }
        if (activity.semanticAction !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.semanticAction not supported: ${activity.semanticAction}`);
        }
        if (activity.speak !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.speak not supported: ${activity.speak}`);
        }
        if (activity.suggestedActions !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.suggestedActions not supported: ${activity.suggestedActions}`);
        }
        if (activity.textFormat !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.textFormat not supported: ${activity.textFormat}`);
        }
        if (activity.type !== ActivityTypes.Message) {
            throw Error(`TyntecWhatsAppAdapter: Activity.type other than ${ActivityTypes.Message} not supported: ${activity.type}`);
        }

        if (activity.channelData.contentType === "text") {
            if (activity.attachments !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both text Activity.channelData.contentType and Activity.attachments not supported: ${activity.channelData.contentType} and ${JSON.stringify(activity.attachments)}`);
            }
            if (activity.channelData.template !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both text Activity.channelData.contentType and Activity.channelData.template not supported: ${activity.channelData.contentType} and ${JSON.stringify(activity.channelData.template)}`);
            }
            if (activity.text === undefined) {
                throw Error(`TyntecWhatsAppAdapter: text Activity.channelData.contentType requires Activity.text: ${activity.text}`);
            }

            return {
                from: activity.from.id,
                to: activity.conversation.id,
                channel: "whatsapp",
                content: {
                    contentType: "text",
                    text: activity.text
                }
            };
        }
        if (activity.channelData.contentType === "audio" || activity.channelData.contentType === "document" || activity.channelData.contentType === "image" || activity.channelData.contentType === "sticker" || activity.channelData.contentType === "video") {
            if (activity.attachments === undefined || activity.attachments.length !== 1) {
                throw Error(`TyntecWhatsAppAdapter: other than exactly one Activity.attachments not supported: ${activity.attachments?.length}`);
            }
            if (activity.attachments[0].content !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: Activity.attachments.content not supported: ${activity.attachments[0].content}`);
            }
            if (activity.attachments[0].contentUrl === undefined) {
                throw Error(`TyntecWhatsAppAdapter: Activity.attachments.contentUrl is required: ${activity.attachments[0].contentUrl}`);
            }
            if (activity.attachments[0].thumbnailUrl !== undefined) {
                console.warn(`TyntecWhatsAppAdapter: Activity.attachments.thumbnailUrl not supported: ${activity.attachments[0].thumbnailUrl}`);
            }
            if (activity.channelData.template !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both Activity.text and Activity.channelData.template not supported: ${activity.text} and ${JSON.stringify(activity.channelData.template)}`);
            }

            if (activity.channelData.contentType === "audio") {
                if (activity.text !== undefined) {
                    throw Error(`TyntecWhatsAppAdapter: both audio Activity.channelData.contentType and Activity.text not supported: ${activity.channelData.contentType} and ${activity.text}`);
                }

                return {
                    from: activity.from.id,
                    to: activity.conversation.id,
                    channel: "whatsapp",
                    content: {
                        audio: {
                            url: activity.attachments[0].contentUrl
                        },
                        contentType: "audio"
                    }
                };
            }
            if (activity.channelData.contentType === "document") {
                return {
                    from: activity.from.id,
                    to: activity.conversation.id,
                    channel: "whatsapp",
                    content: {
                        contentType: "document",
                        document: {
                            caption: activity.text,
                            filename: activity.attachments[0].name,
                            url: activity.attachments[0].contentUrl
                        }
                    }
                };
            }
            if (activity.channelData.contentType === "image") {
                return {
                    from: activity.from.id,
                    to: activity.conversation.id,
                    channel: "whatsapp",
                    content: {
                        contentType: "image",
                        image: {
                            caption: activity.text,
                            url: activity.attachments[0].contentUrl
                        }
                    }
                };
            }
            if (activity.channelData.contentType === "sticker") {
                if (activity.text !== undefined) {
                    throw Error(`TyntecWhatsAppAdapter: both sticker Activity.channelData.contentType and Activity.text not supported: ${activity.channelData.contentType} and ${activity.text}`);
                }

                return {
                    from: activity.from.id,
                    to: activity.conversation.id,
                    channel: "whatsapp",
                    content: {
                        contentType: "sticker",
                        sticker: {
                            url: activity.attachments[0].contentUrl
                        }
                    }
                };
            }
            if (activity.channelData.contentType === "video") {
                return {
                    from: activity.from.id,
                    to: activity.conversation.id,
                    channel: "whatsapp",
                    content: {
                        contentType: "video",
                        video: {
                            caption: activity.text,
                            url: activity.attachments[0].contentUrl
                        }
                    }
                };
            }
        }
        if (activity.channelData.contentType === "template") {
            if (activity.attachments !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both Activity.attachments and template Activity.channelData.contentType not supported: ${JSON.stringify(activity.attachments)} and ${JSON.stringify(activity.channelData.template)}`);
            }
            if (activity.channelData.template === undefined) {
                throw Error(`TyntecWhatsAppAdapter: template Activity.channelData.contentType requires Activity.channelData.template: ${activity.channelData.template}`);
            }
            if (activity.text !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both Activity.text and template Activity.channelData.contentType not supported: ${activity.text} and ${JSON.stringify(activity.channelData.template)}`);
            }

            return {
                from: activity.from.id,
                to: activity.conversation.id,
                channel: "whatsapp",
                content: {
                    contentType: "template",
                    template: activity.channelData.template
                }
            };
        }
        throw Error(`TyntecWhatsAppAdapter: invalid input: ${activity}`);
    }

    protected async parseTyntecWhatsAppMessageEvent(event: ITyntecMoMessage): Promise<Partial<Activity>> {
        if (event.event !== "MoMessage") {
            throw Error(`TyntecWhatsAppAdapter: ITyntecMoMessage.event other than MoMessage not supported: ${event.event}`)
        }
        if (event.content.contentType === "media" && (event.content.media.type !== "audio" && event.content.media.type !== "document" && event.content.media.type !== "image" && event.content.media.type !== "sticker" && event.content.media.type !== "video")) {
            throw Error(`TyntecWhatsAppAdapter: ITyntecMoMessage.content.media.type other than audio, document, image, sticker and video not supported: ${event.content.media.type}`);
        }
        if (event.groupId !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: ITyntecMoMessage.groupId not supported: ${event.groupId}`)
        }
        if (event.to === undefined) {
            throw Error(`TyntecWhatsAppAdapter: ITyntecMoMessage.to is required: ${event.to}`)
        }

        const tyntecSendWhatsAppMessageRequestConfig = composeTyntecSendWhatsAppMessageRequestConfig(this.tyntecApikey, {from: "example", to: "example", channel: "whatsapp", content: {contentType: "text", text: "example"}});

        const conversation: Partial<ConversationAccount> = {
            id: event.from,
            isGroup: false,
            name: event.whatsapp?.senderName
        };
        const from: Partial<ChannelAccount> = {
            id: event.from,
            name: event.whatsapp?.senderName
        };
        const recipient: Partial<ChannelAccount> = {
            id: event.to
        };
        const activity: Partial<Activity> = {
            channelData: {},
            channelId: event.channel,
            conversation: conversation as ConversationAccount,
            from: from as ChannelAccount,
            id: event.messageId,
            recipient: recipient as ChannelAccount,
            replyToId: event.context?.messageId,
            serviceUrl: tyntecSendWhatsAppMessageRequestConfig.url,
            timestamp: event.timestamp !== undefined ? new Date(event.timestamp) : undefined,
            type: ActivityTypes.Message
        };
        if (event.content.contentType === "text") {
            activity.channelData.contentType = "text";
            activity.text = event.content.text;
            return activity;
        }
        if (event.content.contentType === "media") {
            const mediaRequest = composeTyntecRequestConfig("get", event.content.media.url, this.tyntecApikey, "*/*");
            let mediaResponse;
            try{
                mediaResponse = await this.axiosClient.request(mediaRequest);
            } catch (e) {
                throw new Error(`Failed to download media: ${e.response.status}: ${JSON.stringify(e.response.data)}`);
            }

            activity.attachments = [
                {
                    contentType: mediaResponse.headers["content-type"],
                    contentUrl: event.content.media.url
                }
            ];
            activity.channelData.contentType = event.content.media.type;
            activity.text = event.content.media.caption;
            return activity;
        }
        throw Error(`TyntecWhatsAppAdapter: invalid input: ${JSON.stringify(event)}`);
    }
}
