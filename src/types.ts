export interface IParams {
  /** Acceptor Unique MerchentID (36 Characters) */
  merchantId: string;
  /** Callback URL */
  callbackUrl: string;
}

export interface IPaymentRequestParams {
  /** Transaction Amount (in Toman) */
  amount: number;
  /** Description of Transaction */
  description: string;
  /** Buyer Email */
  email?: string | undefined;
  /** Buyer Mobile number */
  mobile?: string | undefined;
  /** Callback URL */
  callbackUrl?: string | undefined;
}

export interface IPaymentRequestReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
  /** Reference ID request successful in length to 36 characters and is otherwise empty. */
  authority: string;
}

export interface IPaymentRequestWithExtraParams {
  /** Transaction Amount (in Toman) */
  amount: number;
  /** Description of Transaction */
  description: string;
  /** JSON input data */
  additionalData: {
    /** */
    Wages: {
      [key: `zp.${number}.${number}`]: {
        /** Division Amount (in Toman) */
        Amount: number;
        /** Description of Division */
        Description: string;
      };
    };
    /** In seconds */
    expireIn: number;
  };
  /** Buyer Email */
  email?: string | undefined;
  /** Buyer Mobile number */
  mobile?: string | undefined;
  /** Callback URL */
  callbackUrl?: string | undefined;
}

export interface IPaymentRequestWithExtraReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
  /** Reference ID request successful in length to 36 characters and is otherwise empty. */
  authority: string;
}

export interface IPaymentVerificationParams {
  /** Unique Reference ID */
  authority: string;
  /** Transaction Amount (in Toman) */
  amount: number;
}

export interface IPaymentVerificationReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
  /** If the payment is successful, it returns the number of payment Reference ID */
  refId: number;
}

export interface IPaymentVerificationWithExtraParams {
  /** Unique Reference ID */
  authority: string;
  /** Transaction Amount (in Toman) */
  amount: number;
}

export interface IPaymentVerificationWithExtraReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
  /** If the payment is successful, it returns the number of payment Reference ID */
  refId: number;
  /** Transaction contains additional information, such as number of transactions; the commission includes a JSON Encode. */
  extraDetail: string;
}

export interface IRefreshAuthorityParams {
  /** Unique Reference ID */
  authority: string;
  /** Added Expiration Time (In Seconds) */
  expireIn: number;
}

export interface IRefreshAuthorityReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
}

export interface IGetUnverifiedTransactionsReturn {
  /** If status is successful returns 100 else its negative. */
  status: number;
  /** transaction data */
  authorities: Array<{ Authority: string; Amount: string; Channel: string; Date: string }>;
}
