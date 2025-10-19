export const adminLogincontroller =  (request, response) => {
    const { adminId, password } = request.body
    if (adminId === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '1h' })
        response
            .status(200)
            .send({
                message: "login successful",
                success: true,
                token
            })
    }
}