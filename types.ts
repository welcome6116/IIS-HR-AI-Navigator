
export interface HRContact {
  position: string;
  name: string;
  extension: string;
  email: string;
  responsibilities: string[];
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  contactCard?: HRContact;
}

export interface SearchResult {
  response: string;
  foundContact?: HRContact;
}
