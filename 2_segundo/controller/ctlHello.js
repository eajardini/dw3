const hello = (req, res) => (async () => {
    res.json({ status: "ok", "mensagem": "Olá segundo!" });
})();

const helloUserGet = (request, res) => (async () =>{
  const  username  = request.params.nome
  res.json({ status: "ok", "nomeusuario": username });
})();

const helloUserPost = (request, res) => (async () =>{
  const { username } = request.body
  res.json({ status: "ok", "nomeusuario": username });
})();

module.exports = {
hello,
helloUserGet,
helloUserPost,
}
