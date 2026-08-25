document.addEventListener('DOMContentLoaded', function() {
  if (!dw3IsLogged()) {
    return;
  }

  var listagem = document.getElementById('alunosListagem');
  var alertBox = document.getElementById('alunosAlert');

  if (!listagem) {
    return;
  }

  var servidorDw3 = listagem.dataset.servidorDw3;

  configurarOperacoesAlunos(alertBox);
  carregarAlunos(servidorDw3, alertBox);
});

async function carregarAlunos(servidorDw3, alertBox) {
  try {
    if (!servidorDw3) {
      throw new Error('Endereco do servidor backend nao configurado.');
    }

    var response = await fetch(servidorDw3 + '/getAllAlunos');

    if (!response.ok) {
      throw new Error('Nao foi possivel carregar a lista de alunos.');
    }

    var data = await response.json();

    if (data.status !== 'ok' || !Array.isArray(data.registro)) {
      throw new Error('Resposta invalida do servidor backend.');
    }

    inicializarTabelaAlunos(data.registro);
  } catch (error) {
    exibirErro(alertBox, error.message || 'Erro ao carregar alunos.');
    inicializarTabelaAlunos([]);
  }
}

function inicializarTabelaAlunos(alunos) {
  new DataTable('#tblAlunos', {
    data: alunos,
    columns: [
      { data: 'alunoid', defaultContent: '' },
      { data: 'prontuario', defaultContent: '' },
      { data: 'nome', defaultContent: '' },
      { data: 'endereco', defaultContent: '' },
      {
        data: 'rendafamiliar',
        defaultContent: '',
        render: function(data) {
          if (data === null || data === undefined || data === '') {
            return '';
          }

          return Number(data).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });
        }
      },
      {
        data: 'datanascimento',
        defaultContent: '',
        render: function(data) {
          if (!data) {
            return '';
          }

          return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
        }
      },
      { data: 'descricao', defaultContent: '' },
      {
        data: null,
        orderable: false,
        searchable: false,
        render: function(data, type, row) {
          if (type !== 'display') {
            return '';
          }

          var alunoId = escaparHtml(row.alunoid || '');

          return [
            '<div class="btn-group btn-group-sm" role="group" aria-label="Operacoes do aluno">',
            '<button class="btn btn-outline-primary" type="button" data-action="visualizar" data-alunoid="' + alunoId + '" title="Visualizar" aria-label="Visualizar"><i class="bi bi-eye"></i></button>',
            '<button class="btn btn-outline-secondary" type="button" data-action="atualizar" data-alunoid="' + alunoId + '" title="Atualizar" aria-label="Atualizar"><i class="bi bi-pencil-square"></i></button>',
            '<button class="btn btn-outline-danger" type="button" data-action="remover" data-alunoid="' + alunoId + '" title="Remover" aria-label="Remover"><i class="bi bi-trash"></i></button>',
            '</div>'
          ].join('');
        }
      }
    ],
    language: {
      emptyTable: 'Nenhum aluno cadastrado.',
      info: 'Mostrando _START_ ate _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 ate 0 de 0 registros',
      infoFiltered: '(filtrado de _MAX_ registros no total)',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Carregando...',
      processing: 'Processando...',
      search: 'Pesquisar:',
      zeroRecords: 'Nenhum registro encontrado',
      paginate: {
        first: 'Primeiro',
        last: 'Ultimo',
        next: 'Proximo',
        previous: 'Anterior'
      }
    }
  });
}

function configurarOperacoesAlunos(alertBox) {
  var tabela = document.getElementById('tblAlunos');

  if (!tabela) {
    return;
  }

  tabela.addEventListener('click', function(event) {
    var botao = event.target.closest('button[data-action][data-alunoid]');

    if (!botao) {
      return;
    }

    var action = botao.dataset.action;
    var alunoId = botao.dataset.alunoid;

    if (action === 'visualizar') {
      exibirAviso(alertBox, 'Visualizar aluno ' + alunoId + '.');
      return;
    }

    if (action === 'atualizar') {
      exibirAviso(alertBox, 'Atualizar aluno ' + alunoId + '.');
      return;
    }

    if (action === 'remover') {
      if (confirm('Confirma a remocao do aluno ' + alunoId + '?')) {
        exibirAviso(alertBox, 'Remover aluno ' + alunoId + '.');
      }
    }
  });
}

function exibirAviso(alertBox, mensagem) {
  if (!alertBox) {
    return;
  }

  alertBox.textContent = mensagem;
  alertBox.classList.remove('alert-danger');
  alertBox.classList.add('alert-info');
  alertBox.classList.remove('d-none');
}

function escaparHtml(valor) {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function exibirErro(alertBox, mensagem) {
  if (!alertBox) {
    return;
  }

  alertBox.textContent = mensagem;
  alertBox.classList.remove('alert-info');
  alertBox.classList.add('alert-danger');
  alertBox.classList.remove('d-none');
}
