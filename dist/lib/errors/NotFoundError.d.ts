declare class NotFoundError extends Error {
    constructor(modelName: string, id: string | number);
}
export default NotFoundError;
