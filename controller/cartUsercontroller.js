const InfoCart = require('./../models/InfoCart')
const getCartUser = (req, res) => {
    res.json({
        data: 'getCartUser success'
    })
}

const postproductCart = async (req, res) => {
    const cartdata = req.body
    if (!cartdata) {
        return res.json({
            error: "khong co body"
        })
    }
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