import axios, {AxiosInstance} from "axios";
import { ITyntecWhatsAppMessage } from "./messages";

export class TyntecClient {
    axiosClient: AxiosInstance;

    constructor(apikey: string) {
        this.axiosClient = axios.create({
            baseURL: "https://api.tyntec.com",
            headers: {
                "accept": "application/json",
                "apikey": apikey,
                "content-type": "application/json"
            },
        });
    }

    async sendWhatsAppMessage(message: ITyntecWhatsAppMessage): Promise<string> {
        try {
            const response = await this.axiosClient.request<{ messageId: string }>({
                method: "post",
                url: "/conversations/v3/messages",
                data: message,
                validateStatus: status => status === 202
            })
            return response.data.messageId;
        } catch (e) {
            throw new Error(`Failed to send a WhatsApp message: ${e.response.status}: ${JSON.stringify(e.response.data)}`);
        }
    }
}
