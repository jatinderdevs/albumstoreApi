const Album = require('../models/Album');
const fs = require('fs');
var mongoose = require('mongoose');

exports.index = async (req, res) => {
    const albums = await Album.find();
    res.send(albums);
}

exports.create = async (req, res) => {

    if (!req.file) return res.send("please select an iamge ");

    const { title, author, desc, stock, price } = req.body;
    const a = new Album({
        img: req.file.path,
        title: title,
        price: price,
        stock: stock,
        desc: desc,
        author: author,
        isAvaliable: true,
    });
    const save = await a.save();
    res.send("done");
}

exports.getedit = async (req, res) => {
    const id = req.params.id;
    const albums = await Album.findById(id).select("-__v -createdAt");
    res.send(albums);
}

exports.postedit = async (req, res) => {

    const { title, author, desc, stock, price, isAvaliable } = req.body;
    const id = req.params.id;
    const album = await Album.findById(id);
    album.title = title;
    album.author = author;
    album.price = price;
    album.desc = desc;
    album.stock = stock;
    if (req.file) {
        fs.unlink(album.img, err => {
            if (err) throw err;
        })
        album.img = req.file.path;
    }
    album.isAvaliable = isAvaliable;
    const update = await album.save();
    if (!update) return res.status(500).send("something went Wrong!");
    return res.send("album has been successfully updated");
}

exports.remove = async (req, res) => {
    const id = req.params.id;
    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).send("album has already been removed");
    return res.send(album);
}