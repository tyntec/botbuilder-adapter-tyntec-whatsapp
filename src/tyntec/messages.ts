export interface ITyntecWhatsAppMessage {
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

export interface ITyntecWhatsAppMessageEvent extends ITyntecWhatsAppMessage {
    event: "MoMessage"
}

export interface ITyntecWhatsAppTemplate {
    templateId: string;
    templateLanguage: string;
    components: ITyntecWhatsAppTemplateComponents;
}

export interface ITyntecWhatsAppTemplateComponents {
    body: ITyntecWhatsAppTemplateTextBodyComponent[];
}

export interface ITyntecWhatsAppTemplateContent {
    contentType: "template";
    template: ITyntecWhatsAppTemplate;
}

export interface ITyntecWhatsAppTemplateTextBodyComponent {
    type: "text";
    text: string;
}

export interface ITyntecWhatsAppTextContent {
    contentType: "text";
    text: string;
}
