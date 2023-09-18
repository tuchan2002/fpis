export const createManufactory = async (email, name) => {
    try {
        return await contract.methods
            .createManufactory(email, name)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}

export const createRetailer = async (email, name) => {
    try {
        return await contract.methods
            .createRetailer(email, name)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}

export const createCustomer = async (email, name, phone_number) => {
    try {
        return await contract.methods
            .createCustomer(email, name, phone_number)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}
