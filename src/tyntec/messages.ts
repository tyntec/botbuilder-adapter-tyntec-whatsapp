export interface ITyntecWhatsAppMessage {
    from: string;
    to: string;
    channel: "whatsapp";
    content: ITyntecWhatsAppTemplateContent;
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
