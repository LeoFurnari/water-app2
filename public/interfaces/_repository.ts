export interface IRepository {
    getData: () => string;
    getConfig: () => string;
    writeData: (data: string) => void;
}