import { SHA256} from "crypto-js"

export const hashPassword = (s:string) => {
    return SHA256(process.env.USER_PASSWORD_SALT + s).toString()
}