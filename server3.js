var express=require('express')
var app=express();
var data=require('./products.json')
var path=require('path')

app.get("/products",(req,res)=>{
    res.sendFile(path.join(__dirname,"/www/productsearch.html"))
})

app.get("/api/products",(req,res)=>{
    res.send(data.response.products);
})

// /api/products/computer

app.get('/api/products/:keyword',(req,res)=>{
    var keyword=req.params.keyword;

    var newProducts=data.response.products.filter((product)=>{
        return product.product_short_description.includes(keyword)==true;
    })

    res.send(newProducts)
})

app.listen(8000,()=>{
    console.log("Products server is started")
});
