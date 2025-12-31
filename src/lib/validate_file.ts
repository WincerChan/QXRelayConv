import { readFile } from "jsonfile";
const required_fields = ["server", "server_port", "password", "method", "mode", "fast_open"]
const validate = async (path: string) => {
    return readFile(path)
        .then(x => {
            for (let index = 0; index < required_fields.length; index++) {
                const element = required_fields[index];
                if (!(element in x)) throw Error(`missing key: ${element}`)
            }
            return x
        })
        .catch(x => { return { err: x.toString() } })
}

export default validate