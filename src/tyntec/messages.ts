export interface ITyntecMediaMoContent {
    contentType: "media";
    media: ITyntecMoMedia;
}

export interface ITyntecMoMedia {
    caption?: string;
    mediaId?: string;
    type: "image";
    url: string;
}

export interface ITyntecMoMessage {
    channel: string;
    content: ITyntecMediaMoContent | ITyntecTextMoContent;
    event: "MoMessage";
    from: string;
}

export interface ITyntecTextMoContent {
    contentType: "text";
    text: string;
}

export interface ITyntecWhatsAppMessageRequest {
    from: string;
    to: string;
    channel: "whatsapp";
    content: ITyntecWhatsAppImageContent | ITyntecWhatsAppTemplateContent | ITyntecWhatsAppTextContent;
}

export interface ITyntecWhatsAppImage {
    caption?: string;
    url: string;
}

export interface ITyntecWhatsAppImageContent {
    contentType: "image";
    image: ITyntecWhatsAppImage;
}

export interface ITyntecWhatsAppTemplate {
    templateId: string;
    templateLanguage: string;
    components: ITyntecWhatsAppTemplateComponents;
}

export interface ITyntecWhatsAppTemplateContent {
    contentType: "template";
    template: ITyntecWhatsAppTemplate;
}

export interface ITyntecWhatsAppTemplateTextBodyComponent {
    type: "text";
    text: string;
}

export interface ITyntecWhatsAppTemplateComponents {
    body: ITyntecWhatsAppTemplateTextBodyComponent[];
}

export interface ITyntecWhatsAppTextContent {
    contentType: "text";
    text: string;
}
