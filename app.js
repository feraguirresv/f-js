const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')
const botonComprar = document.getElementById('comprar-carrito2')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
                                
    
    if (carrito.length >= 0 ) { Swal.fire({
        title: 'Estas seguro de eliminar todos los productos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, ELIMINAR!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminados!',
            'Ahora tu carrito esta vacio.',
            'success'

          )
          carrito.length = 0
          local.StorageClear(); 
        
          actualizarCarrito()
        }
      })} else{
        Swal.fire({                                             
            icon: 'error',
            title: 'El carrito esta vacio',                
            
            
          }) }
    
  
  
})



//SECCION FETCH 

const pedirhard = async () => {
    const resp = await
    fetch ("/stock.Json")
     datahard = await resp.json()

   
datahard.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img class="cardimg"  src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Marca: ${producto.marca}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
       
    })
})

}

pedirhard ()



const agregarAlCarrito = (prodId) => {
                                               
    Toastify({

        text: "Producto añadido",
        
        duration: 4000,
        gravity : "bottom",
        postion :"right"
        
        }).showToast();

  
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
           
        })
    } else { 
        const item = datahard.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
   
    actualizarCarrito() 
}




const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

                                           

    Swal.fire({                                             
        icon: 'error',
        title: 'Producto eliminado',                
        
        
      })

    actualizarCarrito()
    console.log(carrito)
}




const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <img class="cardimg2"  src=${prod.img} alt= "">
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   
    contadorCarrito.innerText = carrito.length
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
   
}

 botonComprar.addEventListener('click', () => {
        if (carrito.length >= 1) {
            Swal.fire({                                 
                
                title: 'Muchas gracias por tu compra!!',
                text: 'COFFE 503 TU TIENDA DE CONFIANZA.',
                imageUrl: '/img/fondocss.png',
                imageWidth: 600,
                imageHeight: 400,
                imageAlt: 'Custom image',
                icon:'success',
              })
              carrito.length =0
         actualizarCarrito()
         }else {

            Swal.fire({                                             
                icon: 'error',
                title: 'El carrito esta vacio',                
                
                
              })
         }   
         
 })