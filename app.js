const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const db = require("./config/db")
    const Amadeus = require('amadeus')

// Configurações
    // Configuração da sessão
        app.use(session({
            secret: "codigobacanaedificil",
            resave: true,
            saveUninitialized: true
        }))

        app.use(flash())
    // Middleware para as sessões
    app.use((req,res,next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        next()
    })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect(db.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conectado ao MongoDB.")
        }).catch((err) => {
            console.log("Houve um erro ao conectar: "+err)
        })
    // Arquivos estáticos
        app.use(express.static(path.join(__dirname,"public")))

    // API Amadeus
        const amadeus = new Amadeus({
            clientId: 'AkLrxl0iSkaF8tfK79JjgaC7WxL2fdHf',
            clientSecret: '9vshl41niljU9uqv',
            logLevel: 'debug'
        });

// Rotas
        app.get("/", (req,res) => {
            amadeus.shopping.hotelOffers.get({
                cityCode : 'MAD'
              }).then((response) => {                 
                res.render("index", {hotels: response.data});
              }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno")
                res.send("Deu ruim "+err)
              })

            
        })

// Abertura do LISTEN
    const PORT = process.env.PORT || 8081
    app.listen(PORT, () => {
        console.log("Servidor aberto com sucesso.")
    })