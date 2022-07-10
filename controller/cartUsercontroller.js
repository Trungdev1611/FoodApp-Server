
const InfoCart = require('./../models/InfoCart')
const getCartUser = async (req, res) => {
    let data = await InfoCart.findAll({
        where: {
            //req.userId la Id cua nguoi dung duoc gui trong token
            UserId: req.userId
        }
    })
    if (data && data.length === 0) {
        return res.status(422).json({
            message: "Ban chua co gi trong gio hang",
            data: data
        })
    }

    res.json({
        message: "Lay du lieu gio hang tu server ve thanh cong",
        data: data
    })
}

const postproductCart = async (req, res) => {
    const cartdata = req.body

    if (!cartdata) {
        return res.json({
            error: "khong co body"
        })
    }
    //neu ton tai cartdata
    cartdata.UserId = req.userId
    // tim trong db xem da co ton tai viec nguoi dung do  da mua san pham do chua. Neu 
    // co thi cap nhat so luong, neu chua thi them moi

    let checkExitsUserProduct = await InfoCart.findOne({
        where: {
            idproduct: req.body.idproduct,
            UserId: req.userId
        }
    })
    // neu da ton tai chay cau lenh update
    if (checkExitsUserProduct) {
        //tinh lai so luong san pham
        let quatitynew = +checkExitsUserProduct.quatityproduct + 1
        //update
        checkExitsUserProduct.update({ quatityproduct: quatitynew })
        //luu lai vao db
        await checkExitsUserProduct.save()
        return res.status(200).json({
            message: "Update product success",
            data: cartdata
        })
    }
    //neu khong ton tai id san pham va nguoi dung mua truoc do thi tao moi
    console.log('cart::::', cartdata)
    await InfoCart.create(cartdata)
    res.status(200).json({
        message: "Create product success",
        data: cartdata
    })

}

module.exports = {
    getCartUser,
    postproductCart
}