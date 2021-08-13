import {Activity, ActivityTypes, BotAdapter, ConversationReference, ResourceResponse, TextFormatTypes, TurnContext, WebRequest, WebResponse} from "botbuilder";
import {ITyntecMoMessage, ITyntecWhatsAppMessageRequest} from "./tyntec/messages";
import {TyntecClient} from "./tyntec/client";

export interface ITyntecWhatsAppAdapterSettings {
    tyntecApikey: string;
    wabaNumber: string;
}

export class TyntecWhatsAppAdapter extends BotAdapter {
    wabaNumber: string;
    private tyntecClient: TyntecClient;

    constructor(settings: ITyntecWhatsAppAdapterSettings) {
        super();

        this.tyntecClient = new TyntecClient(settings.tyntecApikey);
        this.wabaNumber = settings.wabaNumber;
    }

    async continueConversation(reference: Partial<ConversationReference>, logic: (revocableContext: TurnContext) => Promise<void>): Promise<void> {
        throw Error("Operation continueConversation not supported.");
    }

    async deleteActivity(context: TurnContext, reference: Partial<ConversationReference>): Promise<void> {
        throw Error("Operation deleteActivity not supported.");
    }

    async processActivity(req: WebRequest, res: WebResponse, logic: (context: TurnContext) => Promise<any>): Promise<void> {
        const requestBody = await new Promise((resolve: (value: ITyntecMoMessage) => void) => {
            if (req.body !== undefined) {
                return resolve(req.body);
            }

            let requestJson = '';
            req.on!('data', (chunk: string) => {
                requestJson += chunk;
            });
            req.on!('end', (): void => {
                resolve(JSON.parse(requestJson));
            });
        });

        const activity = await this.parseTyntecWhatsAppMessageEvent(requestBody);
        const context = new TurnContext(this as any, activity);
        await this.runMiddleware(context, logic);

        res.status(200);
        res.end();
    }

    async sendActivities(context: TurnContext, activities: Partial<Activity>[]): Promise<ResourceResponse[]> {
        const responses: ResourceResponse[] = [];
        for (const activity of activities) {
            const request = this.composeTyntecWhatsAppMessageRequest(activity);

            const messageId = await this.tyntecClient.sendWhatsAppMessage(request);

            responses.push({id: messageId});
        }
        return responses;
    }

    async updateActivity(context: TurnContext, activity: Partial<Activity>): Promise<ResourceResponse | void> {
        throw Error("Operation updateActivity not supported.");
    }

    protected composeTyntecWhatsAppMessageRequest(activity: Partial<Activity>): ITyntecWhatsAppMessageRequest {
        if (activity.action !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.action not supported: ${activity.action}`);
        }
        if (activity.attachmentLayout !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.attachmentLayout not supported: ${activity.attachmentLayout}`);
        }
        if (activity.callerId !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.callerId not supported: ${activity.callerId}`);
        }
        if (activity.code !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.code not supported: ${activity.code}`);
        }
        if (activity.conversation !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.conversation not supported: ${activity.conversation}`);
        }
        if (activity.deliveryMode !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.deliveryMode not supported: ${activity.deliveryMode}`);
        }
        if (activity.entities !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.entities not supported: ${activity.entities}`);
        }
        if (activity.expiration !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.expiration not supported: ${activity.expiration}`);
        }
        if (activity.from !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.from not supported: ${activity.from}`);
        }
        if (activity.historyDisclosed !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.historyDisclosed not supported: ${activity.historyDisclosed}`);
        }
        if (activity.importance !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.importance not supported: ${activity.importance}`);
        }
        if (activity.inputHint !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.inputHint not supported: ${activity.inputHint}`);
        }
        if (activity.label !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.label not supported: ${activity.label}`);
        }
        if (activity.listenFor !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.listenFor not supported: ${activity.listenFor}`);
        }
        if (activity.membersAdded !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.membersAdded not supported: ${activity.membersAdded}`);
        }
        if (activity.membersRemoved !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.membersRemoved not supported: ${activity.membersRemoved}`);
        }
        if (activity.name !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.name not supported: ${activity.name}`);
        }
        if (activity.reactionsAdded !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.reactionsAdded not supported: ${activity.reactionsAdded}`);
        }
        if (activity.reactionsRemoved !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.reactionsRemoved not supported: ${activity.reactionsRemoved}`);
        }
        if (activity.recipient !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.recipient not supported: ${activity.recipient}`);
        }
        if (activity.relatesTo !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.relatesTo not supported: ${activity.relatesTo}`);
        }
        if (activity.replyToId !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.replyToId not supported: ${activity.replyToId}`);
        }
        if (activity.semanticAction !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.semanticAction not supported: ${activity.semanticAction}`);
        }
        if (activity.serviceUrl !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.serviceUrl not supported: ${activity.serviceUrl}`);
        }
        if (activity.speak !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.speak not supported: ${activity.speak}`);
        }
        if (activity.suggestedActions !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.suggestedActions not supported: ${activity.suggestedActions}`);
        }
        if (activity.summary !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.summary not supported: ${activity.summary}`);
        }
        if (activity.textHighlights !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.textHighlights not supported: ${activity.textHighlights}`);
        }
        if (activity.topicName !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.topicName not supported: ${activity.topicName}`);
        }
        if (activity.type !== ActivityTypes.Message) {
            throw Error(`TyntecWhatsAppAdapter: Activity.type other than ${ActivityTypes.Message} not supported: ${activity.type}`);
        }
        if (activity.value !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.value not supported: ${activity.value}`);
        }
        if (activity.valueType !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.valueType not supported: ${activity.valueType}`);
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
            if (activity.textFormat !== TextFormatTypes.Plain) {
                throw Error(`TyntecWhatsAppAdapter: Activity.textFormat other than ${TextFormatTypes.Plain} not supported: ${activity.textFormat}`);
            }

            return {
                from: this.wabaNumber,
                to: activity.channelData.whatsApp,
                channel: "whatsapp",
                content: {
                    contentType: "text",
                    text: activity.text
                }
            };
        }
        if (activity.channelData.contentType === "audio" || activity.channelData.contentType === "document" || activity.channelData.contentType === "image" || activity.channelData.contentType === "video") {
            if (activity.attachments === undefined || activity.attachments.length !== 1) {
                throw Error(`TyntecWhatsAppAdapter: other than exactly one Activity.attachments not supported: ${activity.attachments?.length}`);
            }
            if (activity.attachments[0].content !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: Activity.attachments.content not supported: ${activity.attachments[0].content}`);
            }
            if (activity.attachments[0].contentUrl === undefined) {
                throw Error(`TyntecWhatsAppAdapter: Activity.attachments.contentUrl is required: ${activity.attachments[0].contentUrl}`);
            }
            if (activity.attachments[0].name !== undefined) {
                console.warn(`TyntecWhatsAppAdapter: Activity.attachments.name not supported: ${activity.attachments[0].name}`);
            }
            if (activity.attachments[0].thumbnailUrl !== undefined) {
                console.warn(`TyntecWhatsAppAdapter: Activity.attachments.thumbnailUrl not supported: ${activity.attachments[0].thumbnailUrl}`);
            }
            if (activity.channelData.template !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both Activity.text and Activity.channelData.template not supported: ${activity.text} and ${JSON.stringify(activity.channelData.template)}`);
            }
            if (activity.text !== undefined && activity.textFormat !== TextFormatTypes.Plain) {
                throw Error(`TyntecWhatsAppAdapter: Activity.textFormat other than ${TextFormatTypes.Plain} not supported: ${activity.textFormat}`);
            }

            if (activity.channelData.contentType === "audio") {
                return {
                    from: this.wabaNumber,
                    to: activity.channelData.whatsApp,
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
                    from: this.wabaNumber,
                    to: activity.channelData.whatsApp,
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
                    from: this.wabaNumber,
                    to: activity.channelData.whatsApp,
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
            if (activity.channelData.contentType === "video") {
                return {
                    from: this.wabaNumber,
                    to: activity.channelData.whatsApp,
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
            if (activity.textFormat !== undefined) {
                throw Error(`TyntecWhatsAppAdapter: both Activity.textFormat and template Activity.channelData.contentType not supported: ${activity.textFormat} and ${JSON.stringify(activity.channelData.template)}`);
            }

            return {
                from: this.wabaNumber,
                to: activity.channelData.whatsApp,
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
        if (event.content.contentType === "media" && (event.content.media.type !== "audio" && event.content.media.type !== "document" && event.content.media.type !== "image" && event.content.media.type !== "video")) {
            throw Error(`TyntecWhatsAppAdapter: ITyntecMoMessage.content.media.type other than audio, document, image and video not supported: ${event.content.media.type}`);
        }

        if (event.content.contentType === "text") {
            return {
                channelData: {
                    contentType: "text",
                    whatsApp: event.from
                },
                text: event.content.text,
                type: ActivityTypes.Message
            };
        }
        if (event.content.contentType === "media") {
            const mediaResponse = await this.tyntecClient.sendRequest("get", event.content.media.url, 200);
            return {
                attachments: [
                    {
                        contentType: mediaResponse.headers["content-type"],
                        contentUrl: event.content.media.url
                    }
                ],
                channelData: {
                    contentType: event.content.media.type,
                    whatsApp: event.from
                },
                text: event.content.media.caption,
                textFormat: event.content.media.caption !== undefined ? TextFormatTypes.Plain : undefined,
                type: ActivityTypes.Message
            };
        }
        throw Error(`TyntecWhatsAppAdapter: invalid input: ${JSON.stringify(event)}`);
    }
}
