function index2(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM lista WHERE idUser = ?',[req.user.id], (err, lista) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/all-lista', { lista });
      });
    });
  }

  function createLista(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM categoria', (err, categoria) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/createLista',{categoria});
      });
    });
    
  }
  
  function storeLista(req, res) {
    const {titleList,estado,idCategoria} = req.body;
    const data = {
      titleList,estado,idCategoria,
      idUser: req.user.id 
    };
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO lista SET ?', [data], (err, rows) => {
        res.redirect('/lists');
      });
    });
  }
  
  function destroyLista(req, res) {
    const id = req.body.id_lista;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM lista WHERE id_lista = ?', [id], (err, rows) => {
        res.redirect('/lists');
      });
    })
  }
///////////////////
function index3(req, res) { 
  const {id} = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM lista WHERE id_lista = ?', [id], (err, lista) => {
      conn.query('SELECT * FROM item WHERE id_lista = ?', [id], (err, item) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/list-items', { lista, item });
    });
  });
});
}
////////ORDENAMIENTO//////
function itemsFecha(req, res) {
  const {id} = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM lista WHERE id_lista = ?', [id], (err, lista) => {
      conn.query('SELECT * FROM item WHERE id_lista = ? ORDER BY `item`.`fechaCreacion` DESC', [id], (err, item) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/list-items', { lista, item });
    });
  });
});
}
function itemsFlimite(req, res) {
  const {id} = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM lista WHERE id_lista = ?', [id], (err, lista) => {
      conn.query('SELECT * FROM item WHERE id_lista = ? ORDER BY `item`.`fechaLimite` DESC', [id], (err, item) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/list-items', { lista, item });
    });
  });
});
}
function itemsPrioridad(req, res) {
  const {id} = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM lista WHERE id_lista = ?', [id], (err, lista) => {
      conn.query('SELECT * FROM item WHERE id_lista = ? ORDER BY `item`.`prioridad` ASC', [id], (err, item) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/list-items', { lista, item });
    });
  });
});
}
function updateexpel(req, res) {
  const {id} = req.params;
  req.getConnection((err, conn) => {
    conn.query('UPDATE item SET id_lista = null WHERE id = ?', [id], (err, rows) => {
      res.redirect('/lists');
    });
  })

}

module.exports = {
    index2:  index2,
    createLista: createLista,
    storeLista: storeLista,
    destroyLista: destroyLista,

    index3: index3,
    updateexpel: updateexpel,
    itemsFecha: itemsFecha,
    itemsFlimite: itemsFlimite,
    itemsPrioridad: itemsPrioridad,
  }