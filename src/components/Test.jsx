import { useEffect } from "react";
import UserResource from "../api/UserResource";

export default function Test() {
    const fetchProducts = async () => {
        try {
            await UserResource.getAllProducts()
                .then((response) => {
                    //console.log(response);
                })
                .catch((e) => {
                    console.error(e);
                });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
}
