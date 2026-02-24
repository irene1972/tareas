export function isAdmin() {
  const usuarioString = localStorage.getItem('usuarioTareas');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.role !== 'ROLE_ADMIN') return usuario;
    else return true;
  }
}

export function isLogged() {
  const usuarioString = localStorage.getItem('usuarioTareas');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.role === 'ROLE_ADMIN' || usuario.role==='ROLE_USER') return usuario;
    else return false;
  }
}