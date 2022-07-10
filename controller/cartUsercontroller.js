const getCartUser = (req, res) => {
    res.json({
        data: 'getCartUser success'
    })
}

const postproductCart = (req, res) => {
    res.json({
        data: 'postproductCart success'
    })
}

module.exports = {
    getCartUser,
    postproductCart
}