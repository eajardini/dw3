document.addEventListener('DOMContentLoaded', async function() {
  if (!dw3IsLogged()) {
    return;
  }

  var form = document.getElementById('frmAlunos');

  if (!form) {
    return;
  }

  var parametros = new URLSearchParams(window.location.search);
  var oper = parametros.get('oper') || parametros.get('Oper');
  var servidorDw3 = form.dataset.servidorDw3;
  var btnInserir = document.getElementById('btnInserirAluno');
  var btnAtualizar = document.getElementById('btnAtualizarAluno');

  inicializarSelectCursos();

  if (oper === 'Cr') {
    btnInserir.classList.remove('d-none'); // Torna o Botão visível.
    carregarCursosToAlunos(servidorDw3);
  }

  if (oper === 'Re') {
    vwGetAlunoByID();
  }

  if (oper === 'Up') {
    btnAtualizar.classList.remove('d-none');
    btnAtualizar.disabled = !(await vwGetAlunoByID());
    btnAtualizar.addEventListener('click', function() {
      vwUpdateAluno();
    });
  }


  if (oper === 'De') {
    var btnRemover = document.getElementById('btnRemoverAluno');
    btnRemover.classList.remove('d-none');
    btnRemover.disabled = !(await vwGetAlunoByID());
    btnRemover.addEventListener('click', function() {
      vwDeleteAluno();
    });
  }

  if (btnInserir) {
    btnInserir.addEventListener('click', function() {
      vwInsertAluno();
    });
  }
});

// Aqui é inicializado o componente Select2.js em branco
function inicializarSelectCursos() {
  $('#cursoid').select2({
    theme: 'bootstrap-5',
    placeholder: 'Selecione um curso',
    width: '100%'
  });
}

// Aqui é preenchido o componente Select2 com os cursos disponíveis 
async function carregarCursosToAlunos(servidorDw3) {
  try {
    if (!servidorDw3) {
      throw new Error('Endereço do servidor backend nao configurado.');
    }

    var response = await fetch(servidorDw3 + '/getCursosToAlunos', {
      headers: dw3MontarHeadersAutenticacao()
    });

    if (!response.ok) {
      throw new Error('Não foi possivel carregar os cursos.');
    }

    var data = await response.json();

    if (data.auth === false) {
      throw new Error(data.message || 'Sessão expirada. Faca login novamente.');
    }

    if (data.status !== 'ok' || !Array.isArray(data.registro)) {
      throw new Error('Resposta invalida do servidor backend.');
    }

    preencherSelectCursos(data.registro);
    return true;
  } catch (error) {
    alert(error.message || 'Erro ao carregar cursos.');
    return false;
  }
}

function preencherSelectCursos(cursos) {
  var cursoSelect = document.getElementById('cursoid');

  if (!cursoSelect) {
    return;
  }

  cursoSelect.innerHTML = '<option value="">Selecione um curso</option>';

  cursos.forEach(function(curso) {
    var option = document.createElement('option');
    option.value = curso.cursoid;
    option.textContent = curso.descricao;
    cursoSelect.appendChild(option);
  });

  $('#cursoid').trigger('change');
}

async function vwInsertAluno() {
  var form = document.getElementById('frmAlunos');
  var btnInserir = document.getElementById('btnInserirAluno');

  try {
    if (!form.reportValidity()) {
      return;
    }

    var servidorDw3 = form.dataset.servidorDw3;

    if (!servidorDw3) {
      throw new Error('Endereco do servidor backend nao configurado.');
    }

    if (btnInserir) {
      btnInserir.disabled = true;
    }

    var response = await fetch(servidorDw3 + '/insertAluno', {
      method: 'POST',
      headers: dw3MontarHeadersAutenticacao({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(montarAlunoDoFormulario())
    });

    if (!response.ok) {
      throw new Error('Nao foi possivel inserir o aluno.');
    }

    var data = await response.json();

    if (data.auth === false) {
      throw new Error(data.message || 'Sessao expirada. Faca login novamente.');
    }

    if (data.status !== 'ok') {
      throw new Error(data.status || 'Nao foi possivel inserir o aluno.');
    }

    window.location.href = '/alunos';
  } catch (error) {
    alert(error.message || 'Erro ao inserir aluno.');
  } finally {
    if (btnInserir) {
      btnInserir.disabled = false;
    }
  }
}


async function vwGetAlunoByID() {
  var form = document.getElementById('frmAlunos');

  try {
    var parametros = new URLSearchParams(window.location.search);
    var alunoId = parametros.get('alunoId');
    var servidorDw3 = form.dataset.servidorDw3;

    if (!alunoId || !/^\d+$/.test(alunoId) || Number(alunoId) <= 0) {
      throw new Error('ID do aluno invalido.');
    }

    if (!servidorDw3) {
      throw new Error('Endereco do servidor backend nao configurado.');
    }

    var response = await fetch(servidorDw3 + '/getAlunoByID/' + encodeURIComponent(alunoId), {
      headers: dw3MontarHeadersAutenticacao({
        'content-type': 'application/json'
      })
    });

    if (!response.ok) {
      throw new Error('Nao foi possivel carregar o aluno.');
    }

    var data = await response.json();

    if (data.auth === false) {
      throw new Error(data.message || 'Sessao expirada. Faca login novamente.');
    }

    if (data.status !== 'ok' || !Array.isArray(data.registro)) {
      throw new Error('Resposta invalida do servidor backend.');
    }

    var aluno = data.registro[0];

    if (!aluno) {
      throw new Error('Aluno nao encontrado.');
    }

    document.getElementById('alunoid').value = aluno.alunoid;
    document.getElementById('prontuario').value = aluno.prontuario ?? '';
    document.getElementById('nome').value = aluno.nome ?? '';
    document.getElementById('endereco').value = aluno.endereco ?? '';
    document.getElementById('rendafamiliar').value = aluno.rendafamiliar ?? '';
    document.getElementById('datanascimento').value = aluno.datanascimento ? aluno.datanascimento.slice(0, 10) : '';
    document.getElementById('deleted').value = String(aluno.deleted === true);

    if (!(await carregarCursosToAlunos(servidorDw3))) {
      return false;
    }
    $('#cursoid').val(aluno.cursoid).trigger('change');
    return true;
  } catch (error) {
    alert(error.message || 'Erro ao carregar aluno.');
    return false;
  }
}




async function vwUpdateAluno() {
  var form = document.getElementById('frmAlunos');
  var btnAtualizar = document.getElementById('btnAtualizarAluno');

  if (btnAtualizar.disabled || !form.reportValidity()) {
    return;
  }

  try {
    var alunoId = new URLSearchParams(window.location.search).get('alunoId');
    var servidorDw3 = form.dataset.servidorDw3;

    if (!alunoId || !/^\d+$/.test(alunoId) || Number(alunoId) <= 0) {
      throw new Error('ID do aluno invalido.');
    }

    if (!servidorDw3) {
      throw new Error('Endereco do servidor backend nao configurado.');
    }

    btnAtualizar.disabled = true;

    var aluno = montarAlunoDoFormulario();
    aluno.rendafamiliar = Number(aluno.rendafamiliar);
    aluno.cursoid = Number(aluno.cursoid);

    var response = await fetch(servidorDw3 + '/updateAluno/' + encodeURIComponent(alunoId), {
      method: 'PUT',
      headers: dw3MontarHeadersAutenticacao({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(aluno)
    });

    if (!response.ok) {
      throw new Error('Nao foi possivel atualizar o aluno.');
    }

    var data = await response.json();

    if (data.auth === false) {
      throw new Error(data.message || 'Sessao expirada. Faca login novamente.');
    }

    if (data.status !== 'ok') {
      throw new Error(data.status || 'Nao foi possivel atualizar o aluno.');
    }

    if (data.linhasAfetadas !== 1) {
      throw new Error('Nenhum aluno foi atualizado.');
    }

    alert('Aluno atualizado com sucesso.');
  } catch (error) {
    alert(error.message || 'Erro ao atualizar aluno.');
  } finally {
    btnAtualizar.disabled = false;
  }
}


async function vwDeleteAluno() {
  var form = document.getElementById('frmAlunos');
  var btnRemover = document.getElementById('btnRemoverAluno');

  if (btnRemover.disabled) {
    return;
  }

  if (!window.confirm('Confirma a remoção deste aluno?')) {
    return;
  }

  try {
    var alunoId = document.getElementById('alunoid').value;
    var servidorDw3 = form.dataset.servidorDw3;

    if (!alunoId || !/^\d+$/.test(alunoId) || Number(alunoId) <= 0) {
      throw new Error('ID do aluno invalido.');
    }

    if (!servidorDw3) {
      throw new Error('Endereco do servidor backend nao configurado.');
    }

    btnRemover.disabled = true;

    var response = await fetch(servidorDw3 + '/deleteAluno/' + encodeURIComponent(alunoId), {
      method: 'DELETE',
      headers: dw3MontarHeadersAutenticacao()
    });

    if (!response.ok) {
      throw new Error('Nao foi possivel remover o aluno.');
    }

    var data = await response.json();

    if (data.auth === false) {
      throw new Error(data.message || 'Sessao expirada. Faca login novamente.');
    }

    if (data.status !== 'ok') {
      throw new Error(data.status || 'Nao foi possivel remover o aluno.');
    }

    if (data.linhasAfetadas !== 1) {
      throw new Error('Nenhum aluno foi removido.');
    }

    window.location.href = '/alunos';
  } catch (error) {
    alert(error.message || 'Erro ao remover aluno.');
  } finally {
    btnRemover.disabled = false;
  }
}




function montarAlunoDoFormulario() {
  return {
    prontuario: document.getElementById('prontuario').value,
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('endereco').value,
    rendafamiliar: document.getElementById('rendafamiliar').value,
    datanascimento: document.getElementById('datanascimento').value,
    cursoid: document.getElementById('cursoid').value,
    deleted: document.getElementById('deleted').value === 'true'
  };
}
