const { Product, TypeProduct, StatusProduct } = require("../utils/dbUtil")
const returnUtil = require("../utils/returnUtil")
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: 'AKIAIZ2JBQ6X53AVZ3OQ',
    secretAccessKey: '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',
});

var Busboy = require('busboy');

function uploadToS3(file, callback) {
    let s3bucket = new AWS.S3({
        accessKeyId: "AKIAIZ2JBQ6X53AVZ3OQ",
        secretAccessKey: "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",
    });
    var params = {
        Bucket: "ecv2019",
        Key: Date.now() + "" + Math.floor((Math.random() * 100000) + 1) + file.name,
        Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
        if (err) {
            console.log('error in callback');
            console.log(err);
        }
        console.log('success');
        console.log(data);
        callback(data.Location)
    });
}

const add_product = async (req, res) => {
    var busboy = new Busboy({ headers: req.headers });

    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const status = req.body.status;
    const file = req.files.file;
    console.log(file)
    busboy.on('finish', async function () {
        console.log(name)
        if (file.size < 5242880) {
            uploadToS3(file, async (data) => {
                console.log(data)

                var checkType = await TypeProduct.findOne({
                    where: {
                        id: type
                    }
                })
                var checkStatus = await StatusProduct.findOne({
                    where: {
                        id: status
                    }
                })
                if (checkStatus != null && checkType != null) {
                    try {
                        var product = await Product.create({
                            name: name,
                            price: price,
                            statusProductId: status,
                            typeProductId: type,
                            img: data
                        })
                        res.status(200).json(returnUtil.returnJson(product))
                    } catch (error) {
                        res.status(500).json(returnUtil.returnJson(error.message, false))
                    }
                }
                else {
                    res.status(400).json(returnUtil.returnJson("Foreign Key Error: Check your status or product", false))
                }
            })
        }
        else
            res.status(400).json(returnUtil.returnJson("Big File Error: Choose file less than 5MB", false))

    });
    req.pipe(busboy);

}
const get_all_product = async (req, res) => {
    var ret = await Product.findAll({
        attributes: {
            exclude: [
            "typeProductId",
            "statusProductId"]
        },
        include: [
            {
                model: TypeProduct,
                attributes: {
                    // include: [],
                    exclude: ["id"]
                }
            }, {
                model: StatusProduct,
                attributes: {
                    // include: [],
                    exclude: ["id"]
                }
            }]
    })
    res.status(200).json(returnUtil.returnJson(ret))
}
module.exports = {
    add_product,
    get_all_product
}