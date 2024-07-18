export interface FileReaderResponse {
    isError: boolean;
    errorMessage?: string;
    numberOfWords?: number;
    numberOfChars?: number;
    numberOfSpaces?: number;
    repeatedWordsObject?: Record<string, number>;
    [key: string]: any;
}