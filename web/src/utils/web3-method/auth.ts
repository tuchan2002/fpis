export const createManufactory = async (email, name, location) => {
    try {
        return await contract.methods
            .createManufactory(email, name, location)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}

export const createRetailer = async (email, name, location) => {
    try {
        return await contract.methods
            .createRetailer(email, name, location)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}

export const createCustomer = async (email, name, location, phone_number) => {
    try {
        return await contract.methods
            .createCustomer(email, name, location, phone_number)
            .send({
                from: accountAddress
            })
    } catch (error) {
        console.error(error)
    }
}
