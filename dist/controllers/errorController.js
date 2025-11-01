import { StructError } from "superstruct";
import BadRequestError from "../lib/errors/BadRequestError";
import NotFoundError from "../lib/errors/NotFoundError";
export function defaultNotFoundHandler(req, res, next) {
    res.status(404).send({ message: "Not found" });
}
export function globalErrorHandler(err, req, res, next) {
    if (err instanceof StructError || err instanceof BadRequestError) {
        res.status(400).send({ message: err.message });
        return;
    }
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send({ message: "Invalid JSON" });
        return;
    }
    if (err.code) {
        console.error(err);
        res.status(500).send({ message: "Failed to process data" });
        return;
    }
    if (err instanceof NotFoundError) {
        res.status(404).send({ message: err.message });
        return;
    }
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
}
//# sourceMappingURL=errorController.js.map