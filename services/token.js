import jwt from "jsonwebtoken";

const generateJWTToken = userId => {
    const accesTocen = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10d' })

    return accesTocen
}

export { generateJWTToken }

