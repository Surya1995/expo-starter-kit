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

    const check = async () => {
        let imageUrl = "https://images.unsplash.com/5/unsplash-kitsune-4.jpg";
        getDataBlob(imageUrl);
    };

    async function getDataBlob(url) {
        var res = await fetch(url);
        console.log(res);
        var blob = await res.blob();
        console.log(blob);
        const file = new File([blob], "testfile.png", { type: blob.type });
        console.log({ file });
        var base64img = await parseURI(blob);
        console.log(base64img);
    }

    async function parseURI(d) {
        var reader = new FileReader();
        reader.readAsDataURL(d);
        return new Promise((res, rej) => {
            reader.onload = (e) => {
                res(e.target.result);
            };
        });
    }

    useEffect(() => {
        //fetchProducts();
        check();
    }, []);
}
