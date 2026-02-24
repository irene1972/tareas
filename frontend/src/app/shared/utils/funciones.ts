export function isAdmin() {
  const usuarioString = localStorage.getItem('usuarioTareas');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.role !== 'ROLE_ADMIN') return false;
    else return true;
  }
}

export function isLogged() {
  const usuarioString = localStorage.getItem('usuarioTareas');
  console.log(usuarioString);
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.role === 'ROLE_ADMIN' || usuario.role==='ROLE_USER') return true;
    else return false;
  }
}