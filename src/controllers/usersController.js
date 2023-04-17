import { getAllFiles } from "get-all-files";
import base64Img from "base64-img";
import isEmpty from "../helpers/isEmpty.js";
import fs from "fs";
import axios from "axios";

class UsersController {
    static listUsers = async (req, res) => {
        let allPhotos = await getAllFiles(`photos`).toArray();
        var listBase64 = [];
        allPhotos.forEach((x) => {
            base64Img.base64(x, async function (err, data) {
                listBase64.push({
                    name: x.replace("photos/", "").replace(".png", ""),
                    photo: await data.replace("data:image/png;base64,", ""),
                    last: "Hoje as 14:00.",
                });
            });
        });
        setTimeout(() => {
            res.status(200).json(listBase64);
        }, 2000);
    };

    static addUser = async (req, res) => {
        if (isEmpty(req.body)) {
            return res.status(201).json({ message: "Não adicionado" });
        }
        try {
            let jsonData = JSON.parse(JSON.stringify(req.body));
            base64Img.imgSync(
                `data:image/png;base64,${jsonData.photo}`,
                "photos",
                jsonData.name
            );
            axios
                .get("http://python-api:5000/update-storage")
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
        res.status(201).json({ message: "Adicionado" });
    };

    static deleteUser = async (req, res) => {
        if (isEmpty(req.body)) {
            return res.status(201).json({ message: "Nenhum valor informado." });
        }
        try {
            let jsonData = JSON.parse(JSON.stringify(req.body));
            fs.unlinkSync(`photos/${jsonData.name}.png`);
        } catch (err) {
            console.error(err);
        }
        res.status(201).json({ message: "Removido!" });
    };
}

export default UsersController;
