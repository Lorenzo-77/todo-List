function createCategoria(req, res) {
    res.render('tasks/createCategoria');
  }
  
  function storeCategoria(req, res) {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO categoria SET ?', [data], (err, rows) => {
        res.redirect('/tasks');
      });
    });
  }

  module.exports = {
    createCategoria: createCategoria,
    storeCategoria: storeCategoria,
  }