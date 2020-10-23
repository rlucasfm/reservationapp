if(process.env.NODE_ENV == "production"){
    // Senha Tll0xtEcWL7l88Gh
    // DB Cluster0
    module.exports = {mongoURI: "mongodb+srv://richard:Tll0xtEcWL7l88Gh@cluster0.unqwq.mongodb.net/Cluster0?retryWrites=true&w=majority"}
}else{
    // Substituir o <DBNAME> pelo nome do banco
    module.exports = {mongoURI: "mongodb://localhost/<DBNAME>"}
}