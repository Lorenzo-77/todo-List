////// ITEMS //////🦖🦖🦖
function index(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM item WHERE idUser = ?',[req.user.id], (err, item) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/todo', { item });
      });
    });
  }

  function create(req, res) {
    res.render('tasks/create');
  }
  
  function store(req, res) {
    const {titulo,descripcion,prioridad,fechaLimite,estado} = req.body;
    const data = {
      titulo,descripcion,prioridad,fechaLimite,estado, //hay q ver 🦖🦖🦖
      idUser: req.user.id 
    };

    req.getConnection((err, conn) => {
      conn.query('INSERT INTO item SET ?', [data], (err, rows) => {
        res.redirect('/tasks');
      });
    });
  }
  
  function destroy(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM item WHERE id = ?', [id], (err, rows) => {
        res.redirect('/tasks');
      });
    })
  }
  
  function edit(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM item WHERE id = ?', [id], (err, item) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/edit', { item });
      });
    });
  }
  
  function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const date = new Date();
    if(data.estado == "Resuelta"){  //validacion de fecha resolucion
       data.fechaResolucion = date;}
    
    req.getConnection((err, conn) => {
      conn.query('UPDATE item SET ? WHERE id = ?', [data, id], (err, rows) => {
        res.redirect('/tasks');
      });
    });
  }

  function editadd(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM item WHERE id = ? ', [id], (err, item) => {
        conn.query('SELECT * FROM lista WHERE idUser = ?',[req.user.id], (err, lista) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/edit-add', { item, lista });
      });
    });
  });
}
  
  function updateadd(req, res) {
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE item SET ? WHERE id = ?', [data, id], (err, rows) => {
        res.redirect('/tasks');
      });
    });
  }

  module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
    editadd: editadd,
    updateadd: updateadd,
  }