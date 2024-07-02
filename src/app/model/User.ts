export class User {
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email: string;
    activated?: boolean;
    langKey?: string;
    imageUrl?: string;
    activationKey?: string;
    activationDate?: Date;
    resetKey?: string;
    resetDate?: Date;
    idtMatag?: number;
    tel?: string;
    countryCode?: string;
    enableOtpMail?: boolean;
    authorities?: string[];
    createdBy?: string;
    lastModifiedBy?: string;
    util?: string;
    dateOp?: Date;
  }