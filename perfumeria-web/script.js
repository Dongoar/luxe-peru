const CONFIG = {
    telefono: "51974238635", 
    moneda: "S/"
};

const perfumes = [
    { 
        id: 1, 
        marca: "AFNAN", 
        nombre: "9PM", 
        precio: 180, 
        familia: "Ámbar Vainilla (Manzana, Canela, Lavanda)", 
        img: "img/9pm.jpg", 
        masVendido: true 
    },
    { 
        id: 2, 
        marca: "LATTAFA", 
        nombre: "Asad Bourbon", 
        precio: 210, 
        familia: "Vainilla Salada (Pimienta Negra, Coco, Incienso)", 
        img: "img/asadburbon.jpg", 
        masVendido: false 
    },
    { 
        id: 3, 
        marca: "LATTAFA", 
        nombre: "Asad", 
        precio: 170, 
        familia: "Ámbar Especiado (Pimienta Negra, Piña, Pachulí)", 
        img: "img/asadlattafa.jpg", 
        masVendido: false 
    },
    { 
        id: 4, 
        marca: "ARMAF", 
        nombre: "Club de Nuit Intense", 
        precio: 200, 
        familia: "Amaderado Especiado (Limón, Grosellas Negras, Abedul)", 
        img: "img/intensenuit.jpg", 
        masVendido: true 
    },
    { 
        id: 5, 
        marca: "LATTAFA", 
        nombre: "Khamrah", 
        precio: 180, 
        familia: "Aromática Especiada (Canela, Dátiles, Praliné)", 
        img: "img/Khamrah-Lattafa.jpg", 
        masVendido: true 
    },
    { 
        id: 6, 
        marca: "LATTAFA", 
        nombre: "Yara", 
        precio: 160, 
        familia: "Ámbar Vainilla (Orquídea, Heliotropo, Malvavisco)", 
        img: "img/yaralattfa.jpeg", 
        masVendido: false 
    }
];

const grid = document.getElementById('grid-productos');

const renderizarProductos = (datos) => {
    grid.innerHTML = '';
    
    datos.forEach(p => {
        const item = document.createElement('div');
        item.className = "group relative opacity-0 translate-y-4 animate-in";
        
        const mensajeWhatsApp = `¡Hola LUXE! ✨ Deseo consultar el stock de:
*Perfume:* ${p.nombre}
*Marca:* ${p.marca}
*Precio:* ${CONFIG.moneda}${p.precio}.00`;

        const urlWhatsApp = `https://wa.me/${CONFIG.telefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        item.innerHTML = `
            <div class="relative overflow-hidden bg-white aspect-[4/5] mb-8 border border-stone-50 flex items-center justify-center p-8 transition-all duration-700 group-hover:border-stone-200">
                ${p.masVendido ? `<span class="absolute top-6 left-6 z-20 bg-amber-600 text-white text-[8px] px-3 py-1 uppercase font-bold tracking-[0.2em] shadow-sm">Top Seller</span>` : ''}
                
                <img src="${p.img}" alt="${p.nombre}" 
                     class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000">
                
                <div class="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-8">
                   <a href="${urlWhatsApp}" 
                      target="_blank"
                      class="w-full bg-slate-900 text-white py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-amber-800 transition-colors text-center shadow-2xl translate-y-2 group-hover:translate-y-0 duration-500">
                      Pedir por WhatsApp
                   </a>
                </div>
            </div>
            
            <div class="text-center px-4">
                <span class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-2 block font-medium">${p.marca}</span>
                <h4 class="text-xl font-['Cormorant_Garamond'] font-bold text-slate-800 mb-2 leading-tight">${p.nombre}</h4>
                
                <p class="text-[9px] uppercase tracking-wider text-amber-700/70 font-semibold mb-1">Notas Principales</p>
                <p class="text-[11px] text-stone-500 mb-4 font-light leading-relaxed px-4 italic">
                    ${p.familia}
                </p>

                <div class="h-[1px] w-8 bg-stone-200 mx-auto mb-4"></div>
                <span class="text-sm font-semibold tracking-wider text-slate-900">${CONFIG.moneda} ${p.precio}.00</span>
            </div>
        `;
        grid.appendChild(item);
    });
};

window.filtrarProductos = (criterio) => {
    let filtrados;
    if (criterio === 'todos') {
        filtrados = perfumes;
    } else if (criterio === 'masVendidos') {
        filtrados = perfumes.filter(p => p.masVendido);
    } else {
        filtrados = perfumes.filter(p => p.marca.toUpperCase() === criterio.toUpperCase());
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.innerText.toLowerCase();
        if ((criterio === 'todos' && btnText.includes('todos')) || 
            (criterio === 'masVendidos' && btnText.includes('destacados')) ||
            (btnText.includes(criterio.toLowerCase()))) {
            btn.classList.add('active');
        }
    });

    renderizarProductos(filtrados);
};

document.addEventListener('DOMContentLoaded', () => renderizarProductos(perfumes));