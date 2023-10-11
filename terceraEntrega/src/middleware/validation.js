export function vali (req, res, next){
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    console.log(req.body)
    if (title == '' || description == '' || code == '' || price == '' || status == '' || stock == '' || category == '' || thumbnail == '') {
        return res.status(401).send('datos invalidos')
    }
    return next()
}