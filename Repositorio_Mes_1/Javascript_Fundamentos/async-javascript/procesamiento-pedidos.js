console.log("=== ADMINISTRACIÓN DE BLOG ===\n");

// Simulación de API asíncrona
const api = {
  // Simula obtener usuario
  obtenerUsuario: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarios = {
          1: { id: 1, nombre: "Ana García", email: "ana@email.com" },
          2: { id: 2, nombre: "Carlos López", email: "carlos@email.com" }
        };
        const usuario = usuarios[id];
        if (usuario) {
          console.log(`Usuario ${usuario.nombre} obtenido`);
          resolve(usuario);
        } else {
          reject(new Error(`Usuario ${id} no encontrado`));
        }
      }, 300);
    });
  },

  // Simula obtener posts del blog
  obtenerPosts: (usuarioId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = {
          1: ["Post sobre JavaScript", "Post sobre Node.js"],
          2: ["Post sobre CSS", "Post sobre Accesibilidad"]
        };
        if (posts[usuarioId]) {
          console.log(`Posts del usuario ${usuarioId} obtenidos`);
          resolve(posts[usuarioId]);
        } else {
          reject(new Error(`No se encontraron posts para el usuario ${usuarioId}`));
        }
      }, 400);
    });
  },

  // Simula envío de newsletter
  enviarNewsletter: (usuario) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = Math.random() > 0.2; // 80% éxito
        if (exito) {
          console.log(`Newsletter enviada a ${usuario.email}`);
          resolve(true);
        } else {
          reject(new Error("Error al enviar newsletter"));
        }
      }, 300);
    });
  }
};

// Función principal usando async/await
async function sincronizarBlog(usuarioId, reintento = 1) {
  console.log(`\n Iniciando sincronización para usuario ${usuarioId} (Intento ${reintento})`);

  try {
    // Paso 1: obtener usuario
    const usuario = await api.obtenerUsuario(usuarioId);

    // Paso 2: obtener posts
    const posts = await api.obtenerPosts(usuarioId);

    // Paso 3: enviar newsletter
    await api.enviarNewsletter(usuario);

    console.log(`Sincronización completada para ${usuario.nombre}`);
    return {
      exito: true,
      usuario: usuario.nombre,
      posts: posts.length
    };
  } catch (error) {
    console.error(`Error en sincronización: ${error.message}`);
    if (reintento < 2) {
      console.log("Reintentando...");
      return sincronizarBlog(usuarioId, reintento + 1);
    }
    return { exito: false, error: error.message };
  }
}

// Demostración general con varios escenarios
async function demostrarSincronizacion() {
  const usuarios = [1, 2, 3]; // 3 no existe → error 

  console.log("=== SINCRONIZANDO BLOGS ===\n");

  for (const id of usuarios) {
    const resultado = await sincronizarBlog(id);
    if (resultado.exito) {
      console.log(`Usuario ${resultado.usuario} sincronizado (${resultado.posts} posts)`);
    } else {
      console.log(`Falló sincronización: ${resultado.error}`);
    }
  }
}

// Ejecutar demostración
demostrarSincronizacion().then(() => {
  console.log("\n Demostración completada");
});


// ======== COMPARACIÓN: CALLBACKS vs PROMISES vs ASYNC/AWAIT ==========

// Callbacks
function sincronizarConCallbacks(id, callback) {
  console.log(`\n[CALLBACKS] Sincronizando usuario ${id}...`);

  api.obtenerUsuario(id)
    .then(usuario => {
      return api.obtenerPosts(usuario.id).then(posts => {
        callback(null, { usuario, posts });
      });
    })
    .catch(err => callback(err, null));
}

// Promises
function sincronizarConPromises(id) {
  console.log(`\n[PROMISES] Sincronizando usuario ${id}...`);

  return api.obtenerUsuario(id)
    .then(usuario => {
      return api.obtenerPosts(usuario.id).then(posts => ({ usuario, posts }));
    })
    .then(resultado => {
      console.log("[PROMISES] Sincronización completa");
      return resultado;
    })
    .catch(err => {
      console.error("[PROMISES] Error:", err.message);
      throw err;
    });
}

// Async/Await
async function sincronizarConAsync(id) {
  console.log(`\n[ASYNC/AWAIT] Sincronizando usuario ${id}...`);
  try {
    const usuario = await api.obtenerUsuario(id);
    const posts = await api.obtenerPosts(id);
    console.log("[ASYNC/AWAIT] Sincronización completa");
    return { usuario, posts };
  } catch (error) {
    console.error("[ASYNC/AWAIT] Error:", error.message);
    throw error;
  }
}

// Comparación final
setTimeout(async () => {
  console.log("\n=== COMPARACIÓN FINAL ===\n");

  // CALLBACKS
  sincronizarConCallbacks(1, (err, data) => {
    if (err) return console.error("[CALLBACKS] Error:", err.message);
    console.log("[CALLBACKS] Resultado:", data);
  });

  // PROMISES
  sincronizarConPromises(2).then(res => {
    console.log("[PROMISES] Resultado:", res);
  });

  // ASYNC/AWAIT
  const resultadoAsync = await sincronizarConAsync(1);
  console.log("[ASYNC/AWAIT] Resultado:", resultadoAsync);

}, 3000);
