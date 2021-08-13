import axios, {AxiosInstance, AxiosResponse, Method} from "axios";
import { ITyntecWhatsAppMessageRequest } from "./messages";

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

    async sendWhatsAppMessage(data: ITyntecWhatsAppMessageRequest): Promise<string> {
        try {
            const response = await this.sendRequest<{ messageId: string }>(
                "post",
                "/conversations/v3/messages",
                202,
                {
                    data
                }
            );
            return response.data.messageId;
        } catch (e) {
            throw new Error(`Failed to send a WhatsApp message: ${e.response.status}: ${JSON.stringify(e.response.data)}`);
        }
    }

    async sendRequest<T = any>(method: Method, url: string, expectedStatus: number, opts?: {data?: any}): Promise<AxiosResponse<T>> {
        return this.axiosClient.request<T>({
            method,
            url,
            data: opts?.data,
            validateStatus: status => status === expectedStatus
        })
    }
}
