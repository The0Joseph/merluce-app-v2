let carrito = [];
const productos = [
    { id_producto: 1, nombre_producto: 'Gaseosa Coca Cola 500 ml', precio: 2.50, marca: 'coca cola', tipo: 'bebida', imagen: 'img/productos/gaseosa_coca_cola.png' },
    { id_producto: 2, nombre_producto: 'Gaseosa Fanta 500 ml', precio: 2.70, marca: 'fanta', tipo: 'bebida', imagen: 'img/productos/gaseosa_fanta.png' },
    { id_producto: 3, nombre_producto: 'Gaseosa Inka Kola 500 ml', precio: 2.50, marca: 'inka cola', tipo: 'bebida', imagen: 'img/productos/gaseosa_inca_kola.png' },
    { id_producto: 4, nombre_producto: 'Gaseosa Sprite Regular 500 ml', precio: 2.50, marca: 'sprite', tipo: 'bebida', imagen: 'img/productos/gaseosa_sprite.png' },
    { id_producto: 5, nombre_producto: 'Pack 1 (Keke Pinguino Marinela)', precio: 5.50, marca: 'bimbo', tipo: 'galleta', imagen: 'img/productos/pinguinos.png' },
    { id_producto: 6, nombre_producto: 'Pack (2 Inka Chips Queso y Cebolla)', precio: 12.50, marca: 'inka chips', tipo: 'snacks', imagen: 'img/productos/papas_inkas_chips_queso_cebolla.png' },
    { id_producto: 7, nombre_producto: 'Pack 2 (Papas Kona Select Queso 100 Gr)', precio: 10.90, marca: 'kona', tipo: 'snacks', imagen: 'img/productos/papas_kona.png' },
    { id_producto: 8, nombre_producto: 'Pack (2 Papas Jappy Snacks BBQ 200gr)', precio: 11.50, marca: 'jappy', tipo: 'snacks', imagen: 'img/productos/papas_jappy_snack.png' },
    // { id_producto: 9, nombre_producto: '', precio: '', marca: '', tipo: '', imagen: 'img/productos/' },
    // { id_producto: 10, nombre_producto: '', precio: '', marca: '', tipo: '', imagen: '' },
    // { id_producto: 11, nombre_producto: '', precio: '', marca: '', tipo: '', imagen: '' },
]

function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor_productos');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto');
        div.innerHTML = `
            <div class="tarjeta-producto-contenido">
                <div class="tarjeta-producto-imagen">
                    <img src="${producto.imagen}" alt="" loading="lazy" decoding="async">
                </div>
                <h5 class="tarjeta-producto-titulo roboto-regular">${producto.nombre_producto}</h5>
            </div>
            <div class="tarjeta-producto-footer roboto-regular">
                <p>S/ ${(producto.precio).toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id_producto})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id_producto) {
    const producto = productos.find(p => p.id_producto === id_producto);
    carrito.push(producto);

    actualizarCarrito();

}

function actualizarCarrito() {
    const carritoNumero = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('carrito-numero-produtos');
    div.classList.add('roboto-ligth');
    div.innerHTML = carrito.length;
    carritoNumero.appendChild(div);
}

function llenarFiltro() {
    const ulMarca = document.getElementById('contenedor-filtro-marca');
    const ulTipo = document.getElementById('contenedor-filtro-tipo');
    const priceRange = document.getElementById("filtro-precio");
    const precioValor = document.getElementById("precio-valor");
    const productosTotal = document.getElementById("produtosTotal");

    const lista_marca = [...new Set(productos.map(p => ({ id: p.id_producto, nombre: p.marca })))];
    const lista_tipo = [...new Set(productos.map(p => p.tipo))];
    lista_marca.forEach(marca => {
        const li = document.createElement('li');
        li.innerHTML = `
        <label for="${marca.id}">
            <input class="filtro-marca" type="checkbox" value="${marca.nombre}" id="${marca.id}">
            ${capitalizarPrimeraLetra(marca.nombre)}
        </label>
        `;
        ulMarca?.appendChild(li);
    });

    lista_tipo.forEach(tipo => {
        const li = document.createElement('li');
        li.innerHTML = `
        <label for="${tipo}">
            <input class="filtro-tipo" type="checkbox" value="${tipo}" id="${tipo}">
            ${capitalizarPrimeraLetra(tipo)}
        </label>
        `;
        ulTipo?.appendChild(li);
    });

    const maxPrice = Math.ceil(Math.max(...productos.map(p => p.precio)));
    if (precioValor) {
        precioValor.innerHTML = maxPrice;
    }
    if (priceRange || productosTotal) {
        priceRange.max = maxPrice;
        priceRange.value = maxPrice;
        priceRange.step = '1';

        productosTotal.innerText = `(${productos.length})`
    }

}

function filtrarProductos() {
    const marcasSeleccionadas = Array.from(document.querySelectorAll(".filtro-marca:checked")).map(cb => cb.value);
    const tiposSeleccionados = Array.from(document.querySelectorAll(".filtro-tipo:checked")).map(cb => cb.value);
    const precioMax = parseInt(document.getElementById("filtro-precio")?.value);

    const orden = document.getElementById("ordenar")?.value;

    let filtrados = productos.filter(p =>
        (marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(p.marca)) &&
        (tiposSeleccionados.length === 0 || tiposSeleccionados.includes(p.tipo)) &&
        p.precio <= precioMax
    );

    if (orden === "asc") {
        filtrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
        filtrados.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(filtrados);
}

llenarFiltro();
filtrarProductos();
document.querySelectorAll(".filtro-marca, .filtro-tipo").forEach(cb => cb.addEventListener("change", filtrarProductos));
document.getElementById("filtro-precio")?.addEventListener("input", () => {
    document.getElementById("precio-valor").textContent = document.getElementById("filtro-precio").value;
    filtrarProductos();
});
document.getElementById("ordenar")?.addEventListener("change", filtrarProductos);

mostrarProductos(productos);

