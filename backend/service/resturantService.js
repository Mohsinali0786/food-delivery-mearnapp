module.exports = {
    async createResturant(req, user) {
        console.log(req.address,'ADDDDDDDDDdd')
        console.log(req.address,'ADDDDDDDDDdd')

        const { city, country, fullName, postalCode, state, streetAddress } = req.address
        try {
            const address = new address({
                city,
                country,
                fullName,
                postalCode,
                state,
                streetAddress
            })
            const savedAddress = await address.save()
            const resturant = new address({
                address: savedAddress,
                owner: user,
                name: req.name,
                description: req.description,
                contactInformation: req.contactInformation,
                openingHours: req.openingHours,
                registrationDate: req.registrationDate,
                images: req.images,
            })
            const savedResturant = await resturant.save()
            return savedResturant
        }
        catch (err) {
            throw new Error(err.message)
        }

    }
}