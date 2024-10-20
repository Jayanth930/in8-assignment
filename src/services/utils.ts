import bcrypt from "bcrypt"

export async function gethashedPassword(password : string) {
    const saltrounds = 10
    return await bcrypt.hash(password , saltrounds)
}
