import * as soap from "soap";
import { removeUndefinedKeys } from "./utils";
import type {
  IGetUnverifiedTransactionsReturn,
  IParams,
  IPaymentRequestParams,
  IPaymentRequestReturn,
  IPaymentRequestWithExtraParams,
  IPaymentRequestWithExtraReturn,
  IPaymentVerificationParams,
  IPaymentVerificationReturn,
  IPaymentVerificationWithExtraParams,
  IPaymentVerificationWithExtraReturn,
  IRefreshAuthorityParams,
  IRefreshAuthorityReturn,
} from "./types";

export async function makeZarinpalClient(params: IParams): Promise<ZarinpalClient> {
  const WSDL_URL = "https://www.zarinpal.com/pg/services/WebGate/wsdl";
  const client = await soap.createClientAsync(WSDL_URL);
  client.addHttpHeader("Connection", "keep-alive");
  return new ZarinpalClient(client, params);
}

export async function makeSandboxedZarinpalClient(params: IParams): Promise<ZarinpalClient> {
  const WSDL_URL = "https://sandbox.zarinpal.com/pg/services/WebGate/wsdl";
  const client = await soap.createClientAsync(WSDL_URL);
  client.addHttpHeader("Connection", "keep-alive");
  return new ZarinpalClient(client, params);
}

class ZarinpalClient {
  private readonly client: soap.Client;
  private readonly merchantId: string;
  private readonly callbackUrl: string;

  constructor(client: soap.Client, params: IParams) {
    this.client = client;
    this.callbackUrl = params.callbackUrl;
    this.merchantId = params.merchantId;
  }

  async PaymentRequest(params: IPaymentRequestParams): Promise<IPaymentRequestReturn> {
    const reshapedParams = removeUndefinedKeys({
      MerchantID: this.merchantId,
      Amount: params.amount,
      Description: params.description,
      Email: params.email,
      Mobile: params.mobile,
      CallbackURL: params.callbackUrl ?? this.callbackUrl,
    });

    const result: { Status: number; Authority: string } =
      await this.client.PaymentRequest(reshapedParams);

    return { status: result.Status, authority: result.Authority };
  }

  async PaymentRequestWithExtra(
    params: IPaymentRequestWithExtraParams,
  ): Promise<IPaymentRequestWithExtraReturn> {
    const reshapedParams = removeUndefinedKeys({
      MerchantID: this.merchantId,
      Amount: params.amount,
      Description: params.description,
      AdditionalData: JSON.stringify(params.additionalData),
      Email: params.email,
      Mobile: params.mobile,
      CallbackURL: params.callbackUrl ?? this.callbackUrl,
    });

    const result: { Status: number; Authority: string; ExtraDetail: string } =
      await this.client.PaymentRequestWithExtra(reshapedParams);

    return { status: result.Status, authority: result.Authority };
  }

  async PaymentVerification(
    params: IPaymentVerificationParams,
  ): Promise<IPaymentVerificationReturn> {
    const reshapedParams = {
      MerchantID: this.merchantId,
      Authority: params.authority,
      Amount: params.amount,
    };

    const result: { Status: number; RefID: number } =
      await this.client.PaymentVerification(reshapedParams);

    return { status: result.Status, refId: result.RefID };
  }

  async PaymentVerificationWithExtra(
    params: IPaymentVerificationWithExtraParams,
  ): Promise<IPaymentVerificationWithExtraReturn> {
    const reshapedParams = {
      MerchantID: this.merchantId,
      Authority: params.authority,
      Amount: params.amount,
    };

    const result: { Status: number; RefID: number; ExtraDetail: string } =
      await this.client.PaymentVerification(reshapedParams);

    return { status: result.Status, refId: result.RefID, extraDetail: result.ExtraDetail };
  }

  async RefreshAuthority(params: IRefreshAuthorityParams): Promise<IRefreshAuthorityReturn> {
    const reshapedParams = {
      MerchantID: this.merchantId,
      Authority: params.authority,
      ExpireIn: params.expireIn,
    };

    const result: { Status: number } = await this.client.RefreshAuthority(reshapedParams);

    return { status: result.Status };
  }

  async GetUnverifiedTransactions(): Promise<IGetUnverifiedTransactionsReturn> {
    const reshapedParams = { MerchantID: this.merchantId };

    const result: { Status: number; Authorities: string } =
      await this.client.GetUnverifiedTransactions(reshapedParams);

    return { status: result.Status, authorities: JSON.parse(result.Authorities) };
  }
}

export function webGateUrl(authority: string) {
  return `https://www.zarinpal.com/pg/StartPay/${authority}`;
}

export function zarinGateUrl(authority: string) {
  return `https://www.zarinpal.com/pg/StartPay/${authority}/ZarinGate`;
}

export function mobileGateUrl(authority: string) {
  return `https://www.zarinpal.com/pg/StartPay/${authority}/MobileGate`;
}
