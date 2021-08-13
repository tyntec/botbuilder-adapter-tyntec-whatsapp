export interface ITyntecBaseMedia {
    url: string;
}

export interface ITyntecMediaMoContent {
    contentType: "media";
    media: ITyntecMoMedia;
}

export interface ITyntecMoMedia {
    caption?: string;
    mediaId?: string;
    type: "document" | "image" | "video";
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

export interface ITyntecWhatsAppDocument extends ITyntecBaseMedia {
    caption?: string;
    filename?: string;
}

export interface ITyntecWhatsAppDocumentContent {
    contentType: "document";
    document: ITyntecWhatsAppDocument;
}

export interface ITyntecWhatsAppMessageRequest {
    from: string;
    to: string;
    channel: "whatsapp";
    content: ITyntecWhatsAppDocumentContent | ITyntecWhatsAppImageContent | ITyntecWhatsAppTemplateContent | ITyntecWhatsAppTextContent | ITyntecWhatsAppVideoContent;
}

export interface ITyntecWhatsAppImage extends ITyntecBaseMedia {
    caption?: string;
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

export interface ITyntecWhatsAppVideo extends ITyntecBaseMedia {
    caption?: string;
}

export interface ITyntecWhatsAppVideoContent {
    contentType: "video";
    video: ITyntecWhatsAppVideo;
}