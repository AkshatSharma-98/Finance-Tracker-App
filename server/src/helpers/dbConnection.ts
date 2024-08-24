import mongoose from "mongoose";

export const dbConnection = () => {
    const URI: string | undefined = process.env.MONGODB_URI || '';
    mongoose.connect(URI)
        .then(
            () => console.log('DB Connected!')
        )
        .catch(
            error => console.log(error)
        )
};