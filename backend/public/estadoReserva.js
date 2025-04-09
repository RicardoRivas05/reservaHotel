const API_URL = '/api/estadoreserva';

let editId = null;
const tbody = document.getElementById('states-tbody');
const stateForm = document.getElementById('state-form');
const stateNameInput = document.getElementById('state-name');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

async function fetchStates() {
  try {
    const response = await fetch(API_URL);
    const estados = await response.json();
    tbody.innerHTML = '';
    estados.forEach(est => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${est.idEstadoReserva}</td>
        <td>${est.estado}</td>
        <td>
          <button onclick="startEdit(${est.idEstadoReserva}, '${est.estado}')">Editar</button>
          <button onclick="deleteState(${est.idEstadoReserva})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert('Error al cargar estados.');
  }
}

function startEdit(id, estado) {
  editId = id;
  stateNameInput.value = estado;
  saveBtn.textContent = 'Guardar';
  cancelBtn.style.display = 'inline-block';
}

function cancelEdit() {
  editId = null;
  stateNameInput.value = '';
  saveBtn.textContent = 'Agregar';
  cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', cancelEdit);

stateForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const estado = stateNameInput.value.trim();
  if (!estado) return;

  try {
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });
    }
    cancelEdit();
    fetchStates();
  } catch (err) {
    console.error(err);
    alert('Error al guardar.');
  }
});

async function deleteState(id) {
  if (!confirm('¿Eliminar este estado?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStates();
  } catch (err) {
    console.error(err);
    alert('Error al eliminar.');
  }
}

fetchStates();