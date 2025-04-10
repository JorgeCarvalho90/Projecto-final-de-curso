import {Products} from "../../models/index.js"
const productRoutes = [
    {
        method: "get",
        path: "/products",
        handler: async (req, res)=>{
            const products = await Products.find()
            res.status(200).json(products)
        }
    },{
        method: "get",
        path: "/products/:id",
        handler: async (req, res)=>{
            res.status(200).json([{name: "product by id"}])
        }
    }
]


export default productRoutes