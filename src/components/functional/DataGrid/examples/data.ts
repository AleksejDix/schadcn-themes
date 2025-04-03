export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
};

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2023-03-14 09:15",
    role: "editor",
    status: "inactive",
    lastLogin: "2023-03-14 09:15",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
];

export const transfers = [
  {
    id: 1,
    amount: 100,
    status: "pending",
  },
];

// Enum definitions for fixed values
export enum TransmissionStatus {
  DONE = "DONE",
  PENDING = "PENDING",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum TransmissionType {
  SEND = "SEND",
  RECEIVE = "RECEIVE",
  FORWARD = "FORWARD",
  REPLY = "REPLY",
  ARCHIVE = "ARCHIVE",
}

export enum TransmissionMode {
  PRODUCTION = "PRODUCTION",
  TEST = "TEST",
  DEVELOPMENT = "DEVELOPMENT",
  SIMULATION = "SIMULATION",
  TRAINING = "TRAINING",
}

// Translations interface
export interface Translations {
  de: string;
  fr: string;
  it: string;
}

// Main type definition
export interface Transmission {
  id: number; // Required by DataGrid
  correlationReference: string;
  transmissionReference: string;
  documentReference: string;
  mimeType: string;
  documentDefinitionName: Translations;
  technicalProductName: string;
  productName: Translations;
  senderId: number;
  senderDisplayName: string;
  filesize: number;
  mode: TransmissionMode;
  createdDate: string;
  items: unknown[];
  status: TransmissionStatus;
  type: TransmissionType;
  [key: string]: unknown; // Allow string indexing
}

// Restructured mock data
export const transmissions: Transmission[] = [
  {
    id: 1003109754,
    correlationReference: "review_tp_5.0",
    transmissionReference: "377b6cdc-c4dd-496b-95cf-3a95da04c31b",
    documentReference: "review_tp_5.0",
    mimeType: "application/x-fd-geninv-req-v50+xml",
    documentDefinitionName: {
      de: "Generelle Rechnung 5.0",
      fr: "Facture standard 5.0",
      it: "Fattura generica 5.0",
    },
    technicalProductName: "ELA",
    productName: {
      de: "Leistungsabrechnung",
      fr: "Décompte des prestations",
      it: "Fatturazione delle prestazioni",
    },
    senderId: 12,
    senderDisplayName: "Org2003 DE",
    filesize: 22886,
    mode: TransmissionMode.PRODUCTION,
    createdDate: "2025-03-05T09:35:17.084",
    items: [],
    status: TransmissionStatus.DONE,
    type: TransmissionType.SEND,
  },
  {
    id: 1003109755,
    correlationReference: "review_tp_5.1",
    transmissionReference: "488c7ddc-e5dd-496b-95cf-4b95da04c31c",
    documentReference: "review_tp_5.1",
    mimeType: "application/x-fd-geninv-req-v50+xml",
    documentDefinitionName: {
      de: "Generelle Rechnung 5.0",
      fr: "Facture standard 5.0",
      it: "Fattura generica 5.0",
    },
    technicalProductName: "ELA",
    productName: {
      de: "Leistungsabrechnung",
      fr: "Décompte des prestations",
      it: "Fatturazione delle prestazioni",
    },
    senderId: 13,
    senderDisplayName: "Org2004 FR",
    filesize: 23456,
    mode: TransmissionMode.TEST,
    createdDate: "2024-12-15T10:15:22.142",
    items: [],
    status: TransmissionStatus.IN_PROGRESS,
    type: TransmissionType.RECEIVE,
  },
  {
    id: 1003109756,
    correlationReference: "review_tp_5.2",
    transmissionReference: "599d8edc-f6dd-496b-95cf-5c95da04c31d",
    documentReference: "review_tp_5.2",
    mimeType: "application/x-fd-geninv-req-v50+xml",
    documentDefinitionName: {
      de: "Generelle Rechnung 5.0",
      fr: "Facture standard 5.0",
      it: "Fattura generica 5.0",
    },
    technicalProductName: "ELA",
    productName: {
      de: "Leistungsabrechnung",
      fr: "Décompte des prestations",
      it: "Fatturazione delle prestazioni",
    },
    senderId: 14,
    senderDisplayName: "Org2005 IT",
    filesize: 21567,
    mode: TransmissionMode.DEVELOPMENT,
    createdDate: "2024-11-20T11:45:33.901",
    items: [],
    status: TransmissionStatus.FAILED,
    type: TransmissionType.FORWARD,
  },
  {
    id: 1003109757,
    correlationReference: "review_tp_5.3",
    transmissionReference: "699e9fdc-g7dd-496b-95cf-6d95da04c31e",
    documentReference: "review_tp_5.3",
    mimeType: "application/x-fd-geninv-req-v50+xml",
    documentDefinitionName: {
      de: "Generelle Rechnung 5.0",
      fr: "Facture standard 5.0",
      it: "Fattura generica 5.0",
    },
    technicalProductName: "ELA",
    productName: {
      de: "Leistungsabrechnung",
      fr: "Décompte des prestations",
      it: "Fatturazione delle prestazioni",
    },
    senderId: 15,
    senderDisplayName: "Org2006 CH",
    filesize: 19876,
    mode: TransmissionMode.SIMULATION,
    createdDate: "2025-01-25T14:22:45.333",
    items: [],
    status: TransmissionStatus.EXPIRED,
    type: TransmissionType.ARCHIVE,
  },
  {
    id: 123,
    correlationReference: "review_tp_5.4",
    transmissionReference: "799f0gdc-h8dd-496b-95cf-7e95da04c31f",
    documentReference: "review_tp_5.4",
    mimeType: "application/x-fd-geninv-req-v50+xml",
    documentDefinitionName: {
      de: "Generelle Rechnung 5.0",
      fr: "Facture standard 5.0",
      it: "Fattura generica 5.0",
    },
    technicalProductName: "ELA",
    productName: {
      de: "Leistungsabrechnung",
      fr: "Décompte des prestations",
      it: "Fatturazione delle prestazioni",
    },
    senderId: 16,
    senderDisplayName: "Org2007 AT",
    filesize: 25432,
    mode: TransmissionMode.TRAINING,
    createdDate: "2025-02-10T16:55:12.777",
    items: [],
    status: TransmissionStatus.REJECTED,
    type: TransmissionType.REPLY,
  },
];
