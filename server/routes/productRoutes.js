const express=require('express')
const router=express.Router()
const formidable=require('express-formidable');
const { createProductController,
     getProductController,
      deleteProductController,
    getOneProductController,
    getImageController,
     updateProductController,
     productFilterController,
     SearchController,
     RelatedProductControler,
     paymentTokenController,
     checkoutController,
   
 } = require('../controllers/productConroller');
const { authentication, isAdmin } = require('../middleware/jwtVerify');



router.post('/product',authentication,isAdmin,formidable(),createProductController)
router.post('/products/filter',productFilterController)

router.get('/product',getProductController)

router.get('/product-image/:pid',getImageController)

router.get('/product/search/:keyword',SearchController)
router.get('/related-product/:cid/:pid',RelatedProductControler)

router.get('/product-one/:id',getOneProductController)

router.patch('/product-update/:id',formidable(),updateProductController)

router.delete('/product/:id',deleteProductController)

router.get('/braintree/token',paymentTokenController)

router.post('/braintree/payment/:id',authentication,checkoutController)


module.exports=router