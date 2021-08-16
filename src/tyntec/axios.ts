import {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import { ITyntecWhatsAppMessageRequest } from "./messages";

export function composeTyntecSendWhatsAppMessageRequestConfig(apikey: string, data: ITyntecWhatsAppMessageRequest): AxiosRequestConfig {
    return composeTyntecRequestConfig(
        "post",
        "/conversations/v3/messages",
        apikey,
        "application/json",
        {
            contentType: "application/json",
            data
        }
    );
}

export function composeTyntecRequestConfig(method: Method, url: string, apikey: string, accept: string, opts?: {contentType?: string, data?: any}): AxiosRequestConfig {
    const headers: any = {
        accept,
        apikey
    };
    if (opts?.contentType !== undefined) {
        headers["content-type"] = opts.contentType;
    }
    return {
        method,
        url: new URL(url, "https://api.tyntec.com").toString(),
        headers,
        data: opts?.data
    };
}

export function parseTyntecSendWhatsAppMessageResponse(response: AxiosResponse): string {
    if (response.status !== 202) {
        throw new Error(`Failed to send a WhatsApp message: ${response.status}: ${JSON.stringify(response.data)}`);
    }
    return response.data.messageId;
}
