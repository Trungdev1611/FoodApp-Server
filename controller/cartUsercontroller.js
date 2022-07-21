
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
    let totalprice = data.reduce((prev, current) => {
        return prev + parseInt(current.quatityproduct) * parseInt(current.price)
    }, 0)
    console.log('totalPrice::::', totalprice)
    res.status(200).json({
        message: "Lay du lieu gio hang tu server ve thanh cong",
        data: data,
        totalPrice: totalprice
    })
}

const getLengthCart = async (req, res) => {
    let CartData = await InfoCart.findAll(
        { where: { userId: req.userId } }
    )
    const lengthCart = CartData.length
    console.log(lengthCart)
    res.status(200).json({
        message: 'success',
        datalength: lengthCart
    })
}


const postproductCart = async (req, res) => {
    const cartdata = req.body
    console.log('cartData:::', cartdata)
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
        let quatitynew = +checkExitsUserProduct.quatityproduct + cartdata.quatityproduct
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

const addCounIteminCart = async (req, res) => {
    const idProductCartUser = req.body.idproduct
    const count = req.body.count

    if (idProductCartUser) {

        let productFindDb = await InfoCart.findOne({
            where: { id: idProductCartUser }
        })
        if (productFindDb) {
            let quatitynew = +productFindDb.quatityproduct + count
            console.log('quatitinew:::', quatitynew)
            productFindDb.update({ quatityproduct: quatitynew })
            await productFindDb.save()
            return res.status(201).json({
                message: 'Update success',
                data: productFindDb

            })
        }
        else {
            return res.status(400).json({
                message: 'Update failed'
            })
        }



    }
}

const deleteItemCart = async (req, res) => {
    const idProductCartUser = req.params.id
    console.log('deletecart')
    console.log('iDDDDDDDDDDDDDD::::', idProductCartUser)
    if (idProductCartUser) {
        let itemdelete = await InfoCart.findOne({ where: { id: idProductCartUser } })
        await InfoCart.destroy({
            where: { id: idProductCartUser }
        })
        return res.status(200).json({
            message: 'Delete Success',
            data: itemdelete
        })
    }
    else {
        res.status(404).json({
            message: 'khong co Id nhu vay ton tai hoac chua dang nhap'
        })
    }
}

const checkout = async (req, res) => {
    console.log('reqUserid:::::', req.userId)
    await InfoCart.destroy({ where: { userId: req.userId } })
    return res.status(200).json({
        message: "checkout success"
    })
}

module.exports = {
    getCartUser,
    postproductCart,
    getLengthCart,
    addCounIteminCart,
    deleteItemCart,
    checkout
}