export class UpdateTodoDto {

    private constructor(
        public readonly text?: string,
        public readonly completedAt?: Date
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { text, completedAt } = props
        let newCompletedAt = completedAt
        let returnObj: {text?: string, completedAt?: Date} = {}

        if (!completedAt && !text) return ["CompletedAt and Text at least one must be send!"]

        if (text) {
            if (typeof text !== "string") return ["Text type must be a string"]
            returnObj.text = text
        }

        if (completedAt) {
            newCompletedAt = new Date(completedAt)
            if (newCompletedAt.toString() === "Invalid Date") return ["CompletedAt must be a valid date!"]
            returnObj.completedAt = newCompletedAt
        }

        const numProps = Object.keys(returnObj).length

        if (numProps === 0) return ["Ninguna propiedad fue válida"]

        return [undefined, new UpdateTodoDto(returnObj.text, returnObj.completedAt)];
    }

}