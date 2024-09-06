import Swal from 'sweetalert2'


export  function AlertBox(title,text,icon,confirmButtonText) {
    Swal.fire({
        title,
        text,
        icon : icon ? icon : null,
        confirmButtonText: confirmButtonText ? confirmButtonText  : null
    })
}